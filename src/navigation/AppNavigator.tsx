import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import AuthStack from '../navigation/AuthStack';
import MainStack from '../navigation/MainStack';
import storageService from '../services/storageService';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRouteName, setInitialRouteName] = React.useState<string|null>(null);

  React.useEffect(() => {
    async function checkAuthStatus() {
      const isLoggedIn = await storageService.isUserLoggedIn();
      setInitialRouteName(isLoggedIn ? 'main' : 'auth');
    }

    checkAuthStatus();
  }, []);

  if (!initialRouteName) {
    return;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={'rgba(1,1,1,0.1)'} barStyle={'dark-content'} />

        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen name="auth" component={AuthStack}options={{ headerShown: false }} />
          <Stack.Screen name="main" component={MainStack} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
