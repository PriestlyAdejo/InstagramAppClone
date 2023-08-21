import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useQuery } from '@apollo/client';
import {
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
} from '../../API';
import { LikesForPostByUser } from './queries';
import { useRoute } from '@react-navigation/native';
import { PostLikesRouteProp } from '../../types/navigation';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import UserListItem from '../../components/UserListItem/UserListItem';

const PostLikesScreen = () => {
  const route = useRoute<PostLikesRouteProp>();
  const { id } = route.params;
  const { data, loading, error, refetch } = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(LikesForPostByUser, { variables: { postID: id } });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching likes for post."
        message={error.message}
      />
    );
  }

  const likes =
    data?.LikesForPostByUser?.items.filter((like) => !like?._deleted) || [];

  return (
    <FlatList
      data={likes}
      renderItem={({ item }) => <UserListItem user={item?.User} />}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};

export default PostLikesScreen;
