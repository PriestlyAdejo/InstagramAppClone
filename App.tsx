/* eslint-disable react/react-in-jsx-scope */
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import colors from './src/theme/colors';

Amplify.configure(awsExports);

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
