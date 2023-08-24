import { useMutation, useQuery } from '@apollo/client';
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../API';
import { useAuthContext } from '../../Context/AuthContext';
import { ActivityIndicator, Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from 'aws-amplify';
import { useState } from 'react';
import contentComponent, { IContent } from './contentComponent';
import { createPost, updateUser } from './mutations';
import { getUser } from './queries';

interface IPostService {
  routeParams: IContent;
}

const usePostService = ({ routeParams }: IPostService) => {
  const { userId } = useAuthContext();
  const [progress, setProgress] = useState(0);

  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);

  const { data, loading, error } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, { variables: { id: userId } });
  const user = data?.getUser;
  const lengthAllPostsNotDeleted: number =
    user?.Posts?.items.filter((post) => post?._deleted !== true).length ?? 0;

  const [doUpdateUser, { loading: updateLoading, error: updateError }] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

  const content = contentComponent(routeParams);

  const uriToBlob = (uri: string) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  };

  const incrementNofPostsForUser = (
    userID: string | undefined,
    amount: 1 | -1
  ) => {
    if (!userID) {
      Alert.alert(`Failed to find user with userID: ${userID}`);
      return;
    }

    console.log('LENGTH_ALL_POSTS: ', lengthAllPostsNotDeleted + amount);
    console.log('USER_CREATE_POST: ', user);

    return doUpdateUser({
      variables: {
        input: {
          id: userID,
          _version: user?._version,
          nofPosts: lengthAllPostsNotDeleted + amount,
        },
      },
    });
  };

  const uploadMedia = async (uri: string) => {
    try {
      // Get blob file of the uri
      const blob = await uriToBlob(uri);
      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];

      // Upload the blob file to S3 using AWS Amplify's Storage
      const filename = `${uuidv4()}.${extension}`;
      const s3Response = await Storage.put(filename, blob, {
        progressCallback(newProgress) {
          setProgress(newProgress.loaded / newProgress.total);
        },
      });
      console.log('S3_RESPONSE', s3Response);

      // Incrementing Posts
      const incrementResponse = incrementNofPostsForUser(userId, 1);
      console.log('LENGTH_ALL_POSTS_INCREMENT: ', lengthAllPostsNotDeleted + 1);
      console.log('USER_CREATE_POST_INCREMENT: ', user);
      console.log('RESPONSE: ', incrementResponse);

      return s3Response.key;
    } catch (error) {
      Alert.alert('Error uploading the file.', (error as Error).message);
    }
  };

  return {
    uploadMedia,
    doCreatePost,
    content,
    progress,
  };
};

export default usePostService;
