/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { IComment } from '../../types/models';
import { useState } from 'react';

interface ICommentProps {
  comment: IComment;
  includeDetails: boolean;
}

const Comment = ({ comment, includeDetails = false }: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((v) => !v);
  };

  return (
    <View style={styles.comment}>
      {includeDetails && (
        <Image source={{ uri: comment.user.image }} style={styles.avatar} />
      )}
      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.user.username}</Text>{' '}
          {comment.comment}
        </Text>
        {includeDetails && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>2d</Text>
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
