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

const PostMenu = () => {
  const onDeleteOptionPressed = () => {};
  const onEditOptionPressed = () => {};

  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert(`Reporting`)}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>
        <MenuOption onSelect={onDeleteOptionPressed}>
          <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={onEditOptionPressed}>
          <Text style={styles.optionText}>Edit</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default PostMenu;
