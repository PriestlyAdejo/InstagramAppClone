/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Image, Pressable, Alert } from 'react-native';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import Comment from '../Comment/Comment';
import { useState } from 'react';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel/Carousel';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useNavigation } from '@react-navigation/native';
import { FeedNavigationProp } from '../../types/navigation';
import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  LikesByUserIDQuery,
  LikesByUserIDQueryVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables,
} from '../../API';
import { DEFAULT_USER_IMAGE } from '../../config';
import PostMenu from './PostMenu';
import { useMutation, useQuery } from '@apollo/client';
import { createLike, updatePost } from './mutations';
import { useAuthContext } from '../../Context/AuthContext';
import { LikesForPostByUser, deleteLike, getUser } from './queries';

interface IFeedPost {
  post: Post;
  isVisible?: boolean;
}

const FeedPost = ({ post, isVisible }: IFeedPost) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const { userId } = useAuthContext();
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

  const { data: usersLikeData } = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(LikesForPostByUser, {
    variables: { postID: post.id, userID: { eq: userId } },
  });

  const postLikes = (usersLikeData?.LikesForPostByUser?.items || []).filter(
    (like) => !like?._deleted
  );
  const userLike = postLikes?.[0]; // Should be the owner of the like

  const navigation = useNavigation<FeedNavigationProp>();

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

  const navigateToUser = () => {
    if (post.User) {
      navigation.navigate('UserProfile', { userId: post.User?.id });
    }
  };

  const navigateToLikes = () => {
    navigation.navigate('PostLikes', { id: post.id });
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', { postId: post.id });
  };

  const toggleDescExpanded = () => {
    setIsDescExpanded((v) => !v);
  };

  const toggleLiked = () => {
    if (userLike) {
      doDeleteLike({
        variables: { input: { id: userLike.id, _version: userLike._version } },
      });
      incrementNofLikes(-1);
    } else {
      doCreateLike();
      incrementNofLikes(1);
    }
  };

  let lastTap = 0;
  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastTap < 400) {
      toggleLiked();
    }
    lastTap = now;
  };

  let content = null;
  if (post.image) {
    content = (
      <Image
        source={{
          uri: post.image,
        }}
        style={styles.image}
      />
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={toggleLiked} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={toggleLiked}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }

  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <DoublePressable onDoublePress={toggleLiked}>
          <Image
            source={{
              uri: post.User?.image || DEFAULT_USER_IMAGE,
            }}
            style={styles.userAvatar}
          />
        </DoublePressable>
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.User?.username}
        </Text>

        <PostMenu post={post} />
      </View>

      {/* Content */}
      {content}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleLiked}>
            <AntDesign
              name={userLike ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={userLike ? colors.accent : colors.black}
            />
          </Pressable>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="bookmark"
            size={24}
            style={{ marginLeft: 'auto' }}
            color={colors.black}
          />
        </View>

        {postLikes.length === 0 ? (
          <Text>Be the first to like the post</Text>
        ) : (
          <Text style={styles.text} onPress={navigateToLikes}>
            Liked by{' '}
            <Text style={styles.bold}>{postLikes[0]?.User?.username}</Text>
            {postLikes.length > 1 && (
              <>
                {' '}
                and{' '}
                <Text style={styles.bold}>{postLikes.length - 1} others</Text>
              </>
            )}
          </Text>
        )}

        {/* Post Content */}
        <Text style={styles.text} numberOfLines={isDescExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.User?.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={toggleDescExpanded}>
          {isDescExpanded ? 'less' : 'more'}
        </Text>

        {/* Comments */}
        {post.Comments[0] ? (
          <Text onPress={navigateToComments}>
            View all {post.nofComments} comments
          </Text>
        ) : (
          <Text onPress={navigateToComments}>No comments yet</Text>
        )}
        {(post.Comments?.items || []).map(
          (commentObject) =>
            commentObject && (
              <Comment comment={commentObject} key={commentObject.id} />
            )
        )}
        {/* Posted Date */}
        {/* post.createdAt */}
        <Text>19th December, 2023</Text>
      </View>
    </View>
  );
};

export default FeedPost;
