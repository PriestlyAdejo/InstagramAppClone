import { useMutation, useQuery } from '@apollo/client';
import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import { createLike, updatePost } from './mutations';
import { LikesForPostByUser, deleteLike } from './queries';
import { useAuthContext } from '../../Context/AuthContext';

const useLikeService = (post: Post) => {
  const { userId } = useAuthContext();

  const { data: usersLikeData } = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(LikesForPostByUser, {
    variables: { postID: post.id, userID: { eq: userId } },
  });

  const [doCreateLike] = useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(createLike, {
    variables: { input: { userID: userId, postID: post.id } },
    refetchQueries: ['LikesForPostByUser'],
  });

  const [doDeleteLike] = useMutation<
    DeleteLikeMutation,
    DeleteLikeMutationVariables
  >(deleteLike);

  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const postLikes = (usersLikeData?.LikesForPostByUser?.items || []).filter(
    (like) => !like?._deleted
  );
  const userLike = postLikes?.[0]; // Should be the owner of the like

  const incrementNofLikes = (amount: 1 | -1) => {
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          nofLikes: post.nofLikes + amount,
        },
      },
    });
  };

  const onDeleteLike = () => {
    if (!userLike) {
      return;
    }
    doDeleteLike({
      variables: { input: { id: userLike?.id, _version: userLike?._version } },
    });
    incrementNofLikes(-1);
  };

  const onAddLike = () => {
    doCreateLike();
    incrementNofLikes(1);
  };

  const toggleLiked = () => {
    if (userLike) {
      onDeleteLike();
    } else {
      onAddLike();
    }
  };

  return {
    toggleLiked,
    userLike,
    isLiked: !!userLike,
    postLikes,
  };
};

export default useLikeService;
