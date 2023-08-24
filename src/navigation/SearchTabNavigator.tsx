import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import UserSearchScreen from '../screens/UserSearchScreen';
import colors from '../theme/colors';
import { SearchTabNavigatorParamList } from '../types/navigation';

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
      <Tab.Screen name="Posts" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
