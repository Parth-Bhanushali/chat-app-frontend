import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator initialRouteName="login">
			<Stack.Screen
				name="login"
				component={LoginScreen}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="register"
				component={RegisterScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
