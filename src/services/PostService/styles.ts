import colors from '../../theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1, // Ensure the screen takes the full available space
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically and horizontally
    backgroundColor: colors.white,
  },
  image: {
    width: '100%', // Set a relative width
    aspectRatio: 1, // Maintain aspect ratio of 1
    marginBottom: 10, // Add some spacing
  },
  input: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  content: {
    width: '80%', // Set a relative width
    aspectRatio: 1, // Maintain aspect ratio of 1
  },
  progressContainer: {
    backgroundColor: colors.lightgrey,
    width: '100%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 10,
  },
  progress: {
    backgroundColor: colors.primary,
    position: 'absolute',
    height: '100%',
    alignSelf: 'flex-start',
    borderRadius: 25,
  },
});

export default styles;
