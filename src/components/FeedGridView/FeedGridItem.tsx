import { View, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import { Post } from '../../API';
import { S3Image } from 'aws-amplify-react-native';

const FeedGridItem = ({ post }: { post: Post }) => {
  return (
    <View style={{ flex: 1, padding: 1, aspectRatio: 1, maxWidth: '33.33%' }}>
      {post.image?.includes('http') ||
      post.images?.includes('http') ||
      post.video?.includes('http') ? (
        <Image
          source={{ uri: post.image || post.images?.[0] }}
          style={{ flex: 1, width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      ) : (
        <S3Image imgKey={post.image || post.images?.[0]} style={{ flex: 1 }} />
      )}
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
