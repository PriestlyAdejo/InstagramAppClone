import { View, Text, Image, StyleSheet, TextInput, Alert } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useCommentService from '../../services/CommentService/CommentService';

interface IInput {
  postId: string;
}

const Input = ({ postId }: IInput) => {
  const [newComment, setNewComment] = useState('');
  const insets = useSafeAreaInsets();

  const { onCreateComment } = useCommentService(postId);

  const onPost = async () => {
    onCreateComment(newComment);
    setNewComment('');
  };

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
        }}
        style={styles.image}
      />
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Write your comment..."
        style={styles.input}
        multiline
      />
      <Text
        onPress={onPost}
        style={[styles.button, { bottom: insets.bottom + 15 }]}
      >
        POST
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-end',
  },
  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    paddingRight: 50,
  },
  button: {
    position: 'absolute',
    right: '5%',
    bottom: '42.5%',
    fontSize: fonts.size.s,
    fontWeight: fonts.weight.full,
    color: colors.primary,
  },
});

export default Input;
