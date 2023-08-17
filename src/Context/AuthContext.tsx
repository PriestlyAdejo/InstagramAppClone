import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth, Hub } from 'aws-amplify';
import { HubCallback } from '@aws-amplify/core';

type UserType = CognitoUser | null | undefined;
type AuthContextType = {
  user: UserType;
  userId: string;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  userId: '',
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener: HubCallback = (data) => {
      const { event } = data.payload;
      if (event === 'signOut') {
        setUser(null);
      }
      if (event === 'signIn') {
        checkUser();
      }
    };
    const listenResult = Hub.listen('auth', listener);
    return () => listenResult();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userId: user?.attributes?.sub }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
