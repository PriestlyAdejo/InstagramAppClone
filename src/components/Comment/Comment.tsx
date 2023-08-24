/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';
import { Comment as CommentType } from '../../API';
import { DEFAULT_USER_IMAGE } from '../../config';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import UserImage from '../UserImage/UserImage';

interface ICommentProps {
  comment: CommentType;
  includeDetails?: boolean;
  isNew?: boolean;
}

const Comment = ({
  comment,
  includeDetails = false,
  isNew = false,
}: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((v) => !v);
  };
  return (
    <View style={styles.comment}>
      {includeDetails && (
        <UserImage imageKey={comment?.User?.image || undefined} width={40} />
      )}
      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>
            {comment.User?.username || comment.User?.name}
          </Text>{' '}
          {comment.comment}
        </Text>
        {includeDetails && (
          <View style={styles.footer}>
            {isNew && <Text style={styles.new}>New</Text>}
            <Text style={styles.footerText}>
              {dayjs(comment.createdAt).fromNow()}
            </Text>
            <Text style={styles.footerText}>5 Likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>

      <Pressable onPress={toggleLike} hitSlop={5}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          size={14}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};

export default Comment;
