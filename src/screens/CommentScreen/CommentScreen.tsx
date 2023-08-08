import { Text, View, FlatList } from 'react-native';
import comments from '../../assets/data/comments.json';
import styles from './styles';
import Comment from '../../components/Comment/Comment';

const CommentScreen = () => {
  return (
    <View>
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} includeDetails />}
        style={{ padding: 10 }}
      />
    </View>
  );
};

export default CommentScreen;
