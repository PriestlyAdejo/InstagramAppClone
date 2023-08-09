/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, FlatList, View } from 'react-native';
// import FeedPost from './src/components/FeedPost';
// import posts from './src/assets/data/posts.json';
// import { IPost } from './src/types/models';
// import HomeScreen from './src/screens/HomeScreen';
// import CommentScreen from './src/screens/CommentScreen/CommentScreen';
// import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
// import EditProfileScreen from './src/screens/EditProfileScreen/EditProfileScreen';
// import PostUploadScreen from './src/screens/PostUploadScreen/PostUploadScreen';

import Navigation from './src/navigation';

const styles = StyleSheet.create({
  app: {
    height: 1000,
    width: '100%',
    flex: 1,
  },
});

const App = () => {
  return <Navigation />;
};

export default App;
