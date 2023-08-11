/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Image, Pressable } from 'react-native';
import colors from '../../theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import Comment from '../Comment/Comment';
import { IPost } from '../../types/models';
import { useState } from 'react';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel/Carousel';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useNavigation } from '@react-navigation/native';
import { FeedNavigationProp } from '../../types/navigation';

interface IFeedPost {
  post: IPost;
  isVisible: boolean;
}

const FeedPost = ({ post, isVisible }: IFeedPost) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(true);

  const navigation = useNavigation<FeedNavigationProp>();

  const navigateToUser = () => {
    navigation.navigate('UserProfile', { userId: post.user.id });
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
              uri: post.user.image,
            }}
            style={styles.userAvatar}
          />
        </DoublePressable>

        <Text onPress={navigateToUser} style={styles.userName}>
          {post.user.username}
        </Text>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
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

        <Text style={styles.text}>
          Liked by{' '}
          <Text style={styles.bold}>{post.comments[0].user.username}</Text> and{' '}
          <Text style={styles.bold}>{post.nofLikes} others</Text>
        </Text>

        {/* Post Content */}
        <Text style={styles.text} numberOfLines={isDescExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.user.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={toggleDescExpanded}>
          {isDescExpanded ? 'less' : 'more'}
        </Text>

        {/* Comments */}
        <Text onPress={navigateToComments}>
          View all {post.nofComments} comments
        </Text>
        {post.comments.map((commentObject) => (
          <Comment comment={commentObject} key={commentObject.id} />
        ))}
        {/* Posted Date */}
        {/* post.createdAt */}
        <Text>19th December, 2023</Text>
      </View>
    </View>
  );
};

export default FeedPost;
