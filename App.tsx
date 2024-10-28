import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { logsSafeToIgnore } from './src/lib/const';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(logsSafeToIgnore);

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;
