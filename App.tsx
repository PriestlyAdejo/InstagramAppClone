/* eslint-disable react/react-in-jsx-scope */
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import AuthContextProvider from './src/Context/AuthContext';
import { Button, Linking, Text, View } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Client from './src/apollo/Client';
import { MenuProvider } from 'react-native-popup-menu';

const urlOpener = async (url: string, redirectUrl: string): Promise<void> => {
  await InAppBrowser.isAvailable();
  const authSessionResult = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (authSessionResult.type === 'success') {
    Linking.openURL(authSessionResult.url);
  }
};

const updatedConfig = {
  ...awsExports,
  oauth: {
    ...awsExports.oauth,
    urlOpener,
  },
};

Amplify.configure(updatedConfig);

const App = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AuthContextProvider>
          <Client>
            <Navigation />
          </Client>
        </AuthContextProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;
