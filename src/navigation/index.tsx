import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CommentScreen from '../screens/CommentScreen/CommentScreen';
import { RootNavigatorParamList } from '../types/navigation';
import AuthStackNavigator from './AuthStackNavigator';
import { useAuthContext } from '../Context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { getUser } from './queries';
import { GetUserQuery, GetUserQueryVariables } from '../API';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const linking: LinkingOptions<RootNavigatorParamList> = {
  prefixes: ['instapriestly://', 'https://instapriestly.com'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Comments: 'comments',
      Home: {
        screens: {
          HomeStack: {
            initialRouteName: 'Feed',
            screens: {
              UserProfile: 'user/:userId',
            },
          },
        },
      },
    },
  },
};

const Navigation = () => {
  const { user, userId } = useAuthContext();
  const { data, loading, error } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: { id: userId },
  });

  const userData = data?.getUser;

  // Loading Screen
  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  let stackScreens = null;
  if (!user) {
    stackScreens = (
      <Stack.Screen
        name="Auth"
        component={AuthStackNavigator}
        options={{ headerShown: false }}
      />
    );
  } else if (!userData?.username) {
    stackScreens = (
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Setup Profile' }}
      />
    );
  } else {
    stackScreens = (
      <>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Comments" component={CommentScreen} />
      </>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {stackScreens}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
