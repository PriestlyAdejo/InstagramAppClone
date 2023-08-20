import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from '../screens/CameraScreen/CameraScreen';
import CreatePostScreen from '../screens/CreatePostScreen/CreatePostScreen';
import { UploadStackNavigatorParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<UploadStackNavigatorParamList>();

const UploadStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Create" component={CreatePostScreen} />
    </Stack.Navigator>
  );
};

export default UploadStackNavigator;
