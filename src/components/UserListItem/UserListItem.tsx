import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../API';
import UserImage from '../UserImage/UserImage';

interface IUserListItem {
  user: User;
}

const UserListItem = ({ user }: IUserListItem) => {
  const navigation = useNavigation();

  const goToUserScreen = () => {
    navigation.navigate('UserProfile', { userId: user.id });
  };

  return (
    <Pressable onPress={goToUserScreen} style={styles.root}>
      <UserImage imageKey={user.image || undefined} width={40} />
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;
