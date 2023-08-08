import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 1,
  },
  muteButton: {
    backgroundColor: colors.black,
    padding: 5,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 25,
  },
});

export default styles;
