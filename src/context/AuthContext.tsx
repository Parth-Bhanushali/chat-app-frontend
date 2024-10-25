import React, {createContext, useContext} from 'react';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_USER_KEY } from '../lib/const';

interface AuthContextType {
  user: any;
  login: (session: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = React.useState<any>(null);
  const { getItem: getUserFromStorage, setItem: setUserToStorage } = useAsyncStorage(ASYNC_STORAGE_USER_KEY);

  const login = (session: any) => {
    setUserToStorage(JSON.stringify(session));
    setUser(session);
  };

  const logout = () => {
    AsyncStorage.clear();
    setUser(null);
  };

  React.useEffect(() => {
    (async function () {
      let userFromStorage = await getUserFromStorage();
      if (userFromStorage) {
        userFromStorage = JSON.parse(userFromStorage);
      }
      setUser(userFromStorage);
    })();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
