import { useMutation, useQuery } from '@apollo/client';
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  GetPostQuery,
  GetPostQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import { createComment, updatePost } from './mutations';
import { useAuthContext } from '../../Context/AuthContext';
import { Alert } from 'react-native';
import { getPost } from './queries';

const useCommentService = (postId: string) => {
  const { userId } = useAuthContext();

  const { data: postData } = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    { variables: { id: postId } }
  );
  const post = postData?.getPost;

  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const [doCreateComment] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(createComment);

  const incrementNofComments = (amount: 1 | -1) => {
    if (!post) {
      Alert.alert('Failed to load post. Try again later');
      return;
    }
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          nofComments: post.nofComments + amount,
        },
      },
    });
  };

  const onCreateComment = async (newComment: string) => {
    try {
      if (!post) {
        Alert.alert('Failed to load post. Try again later');
        return;
      }
      await doCreateComment({
        variables: {
          input: {
            postID: post.id,
            userID: userId,
            comment: newComment,
          },
        },
      });
      incrementNofComments(1);
    } catch (error) {
      console.log('Error creating comment', error);
      Alert.alert('Error creating comment'), (error as Error).message;
    }
  };

  return {
    onCreateComment,
  };
};

export default useCommentService;
