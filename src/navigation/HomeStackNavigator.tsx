import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { Image } from 'react-native';
import logo from '../assets/images/logo.png';
import { HomeStackNavigatorParamList } from '../types/navigation';
import UpdatePostScreen from '../screens/UpdatePostScreen/UpdatePostScreen';
import PostLikesScreen from '../screens/PostLikesScreen/PostLikesScreen';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{ headerTitle: HeaderTitle, headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="UpdatePost"
        component={UpdatePostScreen}
        options={{
          title: 'Update Post',
        }}
      />
      <Stack.Screen
        name="PostLikes"
        component={PostLikesScreen}
        options={{
          title: 'Post Likes',
        }}
      />
    </Stack.Navigator>
  );
};

const HeaderTitle = () => {
  return (
    <Image
      source={logo}
      resizeMode="contain"
      style={{ width: 150, height: 40 }}
    />
  );
};

export default HomeStackNavigator;
