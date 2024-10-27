import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator initialRouteName="login" screenOptions={{
			headerTitle: 'Mini Chat App',
		}}>
			<Stack.Screen
				name="login"
				component={LoginScreen}
			/>

			<Stack.Screen
				name="register"
				component={RegisterScreen}
			/>
		</Stack.Navigator>
	);
}
