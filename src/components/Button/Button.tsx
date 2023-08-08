import { Pressable, Text, View } from 'react-native';
import styles from './styles';

interface IButton {
  text?: string;
  onPress?: () => void;
}

const Button = ({ text = '', onPress = () => {} }: IButton) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;
