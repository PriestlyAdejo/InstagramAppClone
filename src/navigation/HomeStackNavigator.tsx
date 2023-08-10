import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import { Image } from 'react-native';
import logo from '../assets/images/logo.png';

const Stack = createNativeStackNavigator();

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