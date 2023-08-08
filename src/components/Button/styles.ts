import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  text: {
    fontWeight: fonts.weight.semi,
    color: colors.black,
  },
});

export default styles;
