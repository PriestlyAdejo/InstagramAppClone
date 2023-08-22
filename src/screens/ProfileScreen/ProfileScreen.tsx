import { ActivityIndicator, FlatList, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView/FeedGridView';
import {
  UserProfileNavigationProp,
  UserProfileRouteProp,
  MyProfileNavigationProp,
  MyProfileRouteProp,
} from '../../types/navigation';

import { useQuery } from '@apollo/client';
import { getUser } from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { GetUserQuery, GetUserQueryVariables } from '../../API';
import { useAuthContext } from '../../Context/AuthContext';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileNavigationProp
  >();
  const { userId: authUserId } = useAuthContext();

  const userId = route.params?.userId || authUserId;

  const { data, loading, error, refetch } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: { id: userId },
  });

  const user = data?.getUser;

  if (error || !user) {
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error?.message || 'User not found'}
        onRetry={refetch}
      />
    );
  }

  navigation.setOptions({ title: `${user.name}'s Profile` });

  if (loading == true) {
    return <ActivityIndicator />;
  }

  return (
    <FeedGridView
      data={user.Posts?.items || []}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
      refetch={refetch}
      loading
    />
  );
};

export default ProfileScreen;
