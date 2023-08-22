import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import comments from '../../assets/data/comments.json';
import styles from './styles';
import Comment from '../../components/Comment/Comment';
import Input from './Input';
import { useRoute } from '@react-navigation/native';
import { CommentsRouteProp } from '../../types/navigation';
import { useQuery } from '@apollo/client';
import { commentsByPost } from './queries';
import {
  CommentsByPostQuery,
  CommentsByPostQueryVariables,
  ModelSortDirection,
} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { useState } from 'react';

const CommentScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const { postId } = route.params;
  const [isFetchingMore, setIsfetchingMore] = useState(false);

  const { data, loading, error, fetchMore } = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {
    variables: {
      postID: postId,
      sortDirection: ModelSortDirection.DESC,
      limit: 3,
    },
  });

  const comments = data?.commentsByPost?.items.filter(
    (comment) => !comment?._deleted
  );
  const nextToken = data?.commentsByPost?.nextToken;

  const loadMore = async () => {
    if (!nextToken || isFetchingMore) {
      return;
    }
    setIsfetchingMore(true);
    await fetchMore({ variables: { nextToken } });
    setIsfetchingMore(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage title="Error getting comments" message={error.message} />
    );
  }

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
        inverted
        ListFooterComponent={() => (
          <Text onPress={loadMore} style={{ padding: 10 }}>
            Load More...
          </Text>
        )}
      />
      <Input postId={postId} />
    </View>
  );
};

export default CommentScreen;
