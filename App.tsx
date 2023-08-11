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

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Full Name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string',
      placeholder: 'Full Name',
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string',
      placeholder: 'Email',
    },
    {
      label: 'Username',
      key: 'username',
      required: true,
      displayOrder: 3,
      type: 'string',
      placeholder: 'Username/handle',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 4,
      type: 'string',
      placeholder: 'Password',
    },
  ],
};

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: colors.primary,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    color: '#5c78ff',
    borderRadius: 100,
  },
};

export default withAuthenticator(App, { signUpConfig });
