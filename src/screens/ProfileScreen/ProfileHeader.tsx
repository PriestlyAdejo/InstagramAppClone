import { Text, View, FlatList, Image } from 'react-native';
import styles from './styles';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { ProfileNavigationProp } from '../../types/navigation';
import { Auth, Storage } from 'aws-amplify';
import { User } from '../../API';
import { DEFAULT_USER_IMAGE } from '../../config';
import { useAuthContext } from '../../Context/AuthContext';
import { useEffect, useState } from 'react';
import UserImage from '../../components/UserImage/UserImage';

interface IProfileHeader {
  user: User;
}

const ProfileHeader = ({ user }: IProfileHeader) => {
  const { userId } = useAuthContext();
  const navigation = useNavigation<ProfileNavigationProp>();

  useEffect(() => {
    navigation.setOptions({ title: user?.username || 'Profile' });
  }, [user?.username]);

  return (
    <View style={styles.root}>
      {/* Header with profile and metrics */}
      <View style={styles.headerRow}>
        {/* Profile Image */}
        <UserImage imageKey={user.image || undefined} width={100} />

        {/* Posts, followers, following */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofPosts}</Text>
          <Text>Posts</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowings}</Text>
          <Text>Following</Text>
        </View>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>

      {/* Buttons */}
      {userId === user.id && (
        <View style={{ flexDirection: 'row' }}>
          <Button
            text="Edit Profile"
            onPress={() => navigation.navigate('Edit Profile')}
            inline
          />
          <Button text="Sign out" onPress={() => Auth.signOut()} inline />
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;
