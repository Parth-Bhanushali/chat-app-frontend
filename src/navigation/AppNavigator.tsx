import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatOverviewScreen from '../screens/ChatOverviewScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'rgba(1,1,1,0.1)'} barStyle={'dark-content'} />
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen}options={{ headerTitle: 'Login' }} />
        <Stack.Screen name="register" component={RegisterScreen} options={{ headerTitle: 'Register' }} />
        <Stack.Screen name="chat" component={ChatScreen} options={{ headerTitle: 'Chat' }} />
        <Stack.Screen name="chatOverview" component={ChatOverviewScreen} options={{ headerTitle: 'Chat Overview' }} />
        <Stack.Screen name="profile" component={ProfileScreen} options={{ headerTitle: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
