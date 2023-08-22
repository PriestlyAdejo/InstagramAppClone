import { useQuery, useSubscription } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import {
  Comment as CommentType,
  CommentsByPostQuery,
  CommentsByPostQueryVariables,
  ModelSortDirection,
  OnCreateCommentByPostIdSubscription,
  OnCreateCommentByPostIdSubscriptionVariables,
  OnCreateCommentSubscription,
} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import Comment from '../../components/Comment';
import { CommentsRouteProp } from '../../types/navigation';
import Input from './Input';
import { commentsByPost } from './queries';
import { onCreateCommentByPostId } from './subscriptions';

const CommentScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const { postId } = route.params;
  const [isFetchingMore, setIsfetchingMore] = useState(false);
  const [newComments, setNewComments] = useState<CommentType[]>([]);

  const { data, loading, error, fetchMore } = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {
    variables: {
      postID: postId,
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
    },
  });
  const { data: newCommentsData } = useSubscription<
    OnCreateCommentByPostIdSubscription,
    OnCreateCommentByPostIdSubscriptionVariables
  >(onCreateCommentByPostId, { variables: { postID: postId } });

  const comments =
    data?.commentsByPost?.items.filter((comment) => !comment?._deleted) || [];
  const nextToken = data?.commentsByPost?.nextToken;

  useEffect(() => {
    if (newCommentsData?.onCreateCommentByPostId) {
      setNewComments((existingNewComments) => [
        newCommentsData.onCreateCommentByPostId as CommentType,
        ...existingNewComments,
      ]);
    }
  }, [newCommentsData]);

  const loadMore = async () => {
    if (!nextToken || isFetchingMore) {
      return;
    }
    setIsfetchingMore(true);
    await fetchMore({ variables: { nextToken } });
    setIsfetchingMore(false);
  };

  const isNewComment = (comment: CommentType) => {
    return newComments.some((c) => c.id === comment.id);
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
        renderItem={({ item }) =>
          item && (
            <Comment comment={item} includeDetails isNew={isNewComment(item)} />
          )
        }
        style={{ padding: 10 }}
        ListEmptyComponent={() => (
          <Text>
            This post has no comments at the moment. Be the first one to
            comment!
          </Text>
        )}
        inverted
        onEndReached={() => loadMore}
      />
      <Input postId={postId} />
    </View>
  );
};

export default CommentScreen;
