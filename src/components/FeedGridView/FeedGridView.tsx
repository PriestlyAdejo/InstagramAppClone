import { FlatList } from 'react-native';
import { Post } from '../../API';
import FeedGridItem from './FeedGridItem';

interface IFeedGridView {
  data: (Post | null)[];
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
  refetch: () => void;
  loading: boolean;
}

const FeedGridView = ({
  data,
  ListHeaderComponent,
  refetch,
  loading,
}: IFeedGridView) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => item && <FeedGridItem post={item} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      style={{ marginHorizontal: -1 }}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default FeedGridView;
