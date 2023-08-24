import { Alert, Text } from 'react-native';
import styles from './styles';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import { useMutation } from '@apollo/client';
import { deletePost } from './mutations';
import {
  DeletePostMutation,
  DeletePostMutationVariables,
  Post,
} from '../../API';
import { useAuthContext } from '../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { FeedNavigationProp } from '../../types/navigation';
import { Storage } from 'aws-amplify';

interface IPostMenu {
  post: Post;
}

const PostMenu = ({ post }: IPostMenu) => {
  const [doDeletePost] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(deletePost, {
    variables: { input: { id: post.id, _version: post._version } },
  });

  const { userId } = useAuthContext();
  const isMyPost = userId === post.userID;
  const navigation = useNavigation<FeedNavigationProp>();

  const startDeletingPost = async () => {
    if (post.image) {
      await Storage.remove(post.image);
    }
    if (post.video) {
      await Storage.remove(post.video);
    }
    if (post.images) {
      await Promise.all(post.images.map((image) => Storage.remove(image)));
    }

    try {
      const response = await doDeletePost();
      console.log(response);
    } catch (error) {
      Alert.alert('Failed to delete posts', (error as Error).message);
    }
  };

  const onDeleteOptionPressed = () => {
    Alert.alert('Are you sure?', 'Deleting a post is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete post',
        style: 'destructive',
        onPress: startDeletingPost,
      },
    ]);
  };

  const onEditOptionPressed = () => {
    navigation.navigate('UpdatePost', { id: post.id });
  };

  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert(`Reporting`)}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>
        {isMyPost && (
          <>
            <MenuOption onSelect={onDeleteOptionPressed}>
              <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={onEditOptionPressed}>
              <Text style={styles.optionText}>Edit</Text>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

export default PostMenu;
