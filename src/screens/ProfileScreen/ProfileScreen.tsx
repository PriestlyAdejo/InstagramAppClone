import { FlatList, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import user from '../../assets/data/user.json';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView/FeedGridView';

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const userId = route.params?.userId;
  // Query the user with userID, dont send full objects only use identifiers
  navigation.setOptions({ title: user.username });

  return <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />;
};

export default ProfileScreen;
