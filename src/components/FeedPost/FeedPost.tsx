/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Pressable } from 'react-native';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import Comment from '../Comment/Comment';
import { useEffect, useState } from 'react';
import DoublePressable from '../DoublePressable';
import { useNavigation } from '@react-navigation/native';
import { FeedNavigationProp } from '../../types/navigation';
import { Post } from '../../API';
import PostMenu from './PostMenu';
import { useAuthContext } from '../../Context/AuthContext';
import useLikeService from '../../services/LikeService/LikeService';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Content from './Content';
import { Storage } from 'aws-amplify';
import UserImage from '../UserImage/UserImage';

dayjs.extend(relativeTime);

interface IFeedPost {
  post: Post;
  isVisible?: boolean;
}

const FeedPost = ({ post, isVisible }: IFeedPost) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const { userId } = useAuthContext();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { toggleLiked, isLiked, postLikes } = useLikeService(post);

  const navigation = useNavigation<FeedNavigationProp>();

  useEffect(() => {
    if (post.User?.image) {
      Storage.get(post.User?.image).then(setImageUri);
    }
  }, [post]);

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

  let lastTap = 0;
  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastTap < 400) {
      toggleLiked();
    }
    lastTap = now;
  };

  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <UserImage imageKey={post?.User?.image || undefined} />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.User?.username}
        </Text>
        <PostMenu post={post} />
      </View>

      {/* Content */}
      <DoublePressable onDoublePress={toggleLiked}>
        <Content post={post} isVisible />
      </DoublePressable>

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
        <Text onPress={navigateToComments}>
          View all {post.nofComments} comments
        </Text>
        {(post.Comments?.items || []).map(
          (comment) => comment && <Comment key={comment.id} comment={comment} />
        )}

        {/* Posted date */}
        <Text>{dayjs(post.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
