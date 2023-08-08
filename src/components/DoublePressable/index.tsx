import { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

interface IDoublePressabe {
  onDoublePress?: () => void;
  children: ReactNode;
}

const DoublePressable = ({
  onDoublePress = () => {},
  children,
}: IDoublePressabe) => {
  let lastTap = 0;
  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastTap < 400) {
      onDoublePress();
    }
    lastTap = now;
  };

  return <Pressable onPress={handleDoublePress}>{children}</Pressable>;
};

export default DoublePressable;
