import { View, Text, Image, Pressable } from 'react-native';
import { IUser } from '../../types/models';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface IUserListItem {
  user: IUser;
}

const UserListItem = ({ user }: IUserListItem) => {
  const navigation = useNavigation();

  const goToUserScreen = () => {
    navigation.navigate('UserProfile', { userId: user.id });
  };

  return (
    <Pressable onPress={goToUserScreen} style={styles.root}>
      <Image source={{ uri: user.image }} style={styles.image} />
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;
