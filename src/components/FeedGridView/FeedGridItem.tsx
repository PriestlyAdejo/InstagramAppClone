import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import { Post } from '../../API';

const FeedGridItem = ({ post }: { post: Post }) => {
  return (
    <View
      style={{
        flex: 1,
        aspectRatio: 1,
        padding: 1,
        maxWidth: '33.33333333333333%',
      }}
    >
      <Image
        source={{ uri: post.image || post.images?.[0] }}
        style={{ flex: 1 }}
      />
      {post.images && (
        <MaterialIcons
          name="collections"
          size={16}
          color={colors.white}
          style={{ position: 'absolute', top: 5, right: 5 }}
        />
      )}
    </View>
  );
};

export default FeedGridItem;
