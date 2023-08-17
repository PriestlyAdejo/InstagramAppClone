import { Pressable, Text, View } from 'react-native';
import styles from './styles';

interface IButton {
  text?: string;
  onPress?: () => void;
  inline?: boolean;
}

const Button = ({ text = '', onPress = () => {}, inline = false }: IButton) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, inline ? { flex: 1 } : {}]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;
