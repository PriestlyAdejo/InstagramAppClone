import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CommentScreen from '../screens/CommentScreen/CommentScreen';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import colors from '../theme/colors';
import { SearchTabNavigatorParamList } from './types';
import UserSearchScreen from '../screens/UserSearchScreen/UserSearchScreen';

const Tab = createMaterialTopTabNavigator<SearchTabNavigatorParamList>();

const SearchTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { paddingTop: insets.top },
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
      }}
    >
      <Tab.Screen name="Users" component={UserSearchScreen} />
      <Tab.Screen name="Posts" component={CommentScreen} />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
