/* eslint-disable react/react-in-jsx-scope */
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import AuthContextProvider from './src/Context/AuthContext';

Amplify.configure(awsExports);

const App = () => {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AuthContextProvider>
  );
};

export default App;
