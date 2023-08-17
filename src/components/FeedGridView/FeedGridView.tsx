import { FlatList, Image } from 'react-native';
import React from 'react';
import FeedGridItem from './FeedGridItem';
import { Post } from '../../API';

type IFeedGridView = {
  data: (Post | null)[];
  ListHeaderComponent:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
};

const FeedGridView = ({ data, ListHeaderComponent }: IFeedGridView) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => item && <FeedGridItem post={item} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default FeedGridView;
