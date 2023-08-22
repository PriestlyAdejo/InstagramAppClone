/* eslint-disable react/react-in-jsx-scope */
import {
  ActivityIndicator,
  FlatList,
  ViewToken,
  ViewabilityConfig,
} from 'react-native';
import FeedPost from '../../components/FeedPost';
import { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { postsByDate } from './queries';
import {
  ListPostsQuery,
  ListPostsQueryVariables,
  ModelSortDirection,
  PostsByDateQuery,
  PostsByDateQueryVariables,
} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { SortDirection } from 'aws-amplify';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const { data, loading, error, refetch } = useQuery<
    PostsByDateQuery,
    PostsByDateQueryVariables
  >(postsByDate, {
    variables: { type: 'POST', sortDirection: ModelSortDirection.DESC },
  });

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    }
  );

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage title="Error fetching posts" message={error.message} />
    );
  }

  const posts = (data?.postsByDate?.items || []).filter(
    (post) => !post?._deleted
  );

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) =>
        item && <FeedPost post={item} isVisible={activePostId === item.id} />
      }
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
      onRefresh={() => refetch()}
      refreshing={loading}
    />
  );
};

export default HomeScreen;
