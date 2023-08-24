import { ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import FeedGridView from '../../components/FeedGridView';
import ProfileHeader from './ProfileHeader';
import {
  UserProfileNavigationProp,
  UserProfileRouteProp,
  MyProfileNavigationProp,
  MyProfileRouteProp,
} from '../../types/navigation';
import { useQuery } from '@apollo/client';
import { getUser } from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';
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
  >(getUser, { variables: { id: userId } });
  const user = data?.getUser;

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !user) {
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error?.message || 'User not found'}
        onRetry={() => refetch()}
      />
    );
  }
  return (
    <FeedGridView
      data={user.Posts?.items || []}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
      refetch={refetch}
      loading={loading}
    />
  );
};

export default ProfileScreen;
