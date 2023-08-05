/* eslint-disable react/react-in-jsx-scope */
import {View, StyleSheet} from 'react-native';
import FeedPost from './src/components/FeedPost';
import {ScrollView} from 'react-native';

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

const App = () => {
  return (
    <ScrollView style={styles.app}>
      <FeedPost />
      <FeedPost />
    </ScrollView>
  );
};

export default App;
