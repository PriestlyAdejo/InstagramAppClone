import { Text, View, FlatList } from 'react-native';
import comments from '../../assets/data/comments.json';
import styles from './styles';
import Comment from '../../components/Comment/Comment';
import Input from './Input';

const CommentScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} includeDetails />}
        style={{ padding: 10 }}
      />
      <Input />
    </View>
  );
};

export default CommentScreen;
