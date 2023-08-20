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
import { Post } from '../../API';
import { DEFAULT_USER_IMAGE } from '../../config';
import PostMenu from './PostMenu';

interface IFeedPost {
  post: Post;
  isVisible?: boolean;
}

const FeedPost = ({ post, isVisible }: IFeedPost) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(true);

  const navigation = useNavigation<FeedNavigationProp>();

  const navigateToUser = () => {
    if (post.User) {
      navigation.navigate('UserProfile', { userId: post.User?.id });
    }
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', { postId: post.id });
  };

  const toggleDescExpanded = () => {
    setIsDescExpanded((v) => !v);
  };

  const toggleLiked = () => {
    setIsLiked((v) => !v);
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
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black}
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

        {post.Comments[0] && (
          <Text style={styles.text}>
            Liked by
            <Text style={styles.bold}>
              {post.Comments[0].user.username}
            </Text>{' '}
            and <Text style={styles.bold}>{post.nofLikes} others</Text>
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
