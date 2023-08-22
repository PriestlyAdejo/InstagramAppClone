import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import comments from '../../assets/data/comments.json';
import styles from './styles';
import Comment from '../../components/Comment/Comment';
import Input from './Input';
import { useRoute } from '@react-navigation/native';
import { CommentsRouteProp } from '../../types/navigation';
import { useQuery } from '@apollo/client';
import { commentsByPost } from './queries';
import { CommentsByPostQuery, CommentsByPostQueryVariables } from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';

const CommentScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const { postId } = route.params;

  const { data, loading, error } = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, { variables: { postID: postId } });

  const comments = data?.commentsByPost?.items.filter(
    (comment) => !comment?._deleted
  );

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage title="Error getting comments" message={error.message} />
    );
  }

  console.log('COMMENT_SCREEN_POSTID', postId, comments);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} includeDetails />}
        style={{ padding: 10 }}
        ListEmptyComponent={() => (
          <Text>
            This post has no comments at the moment. Be the first one to
            comment!
          </Text>
        )}
      />
      <Input postId={postId} />
    </View>
  );
};

export default CommentScreen;
