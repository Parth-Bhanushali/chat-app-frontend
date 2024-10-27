import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatOverviewScreen from '../screens/ChatOverviewScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function MainStack() {
	const { user } = useAuth();
	if (!user) {
		return;
	}

	return (
		<Stack.Navigator initialRouteName="chatOverview">
			<Stack.Screen
				name="chatOverview"
				component={ChatOverviewScreen}
				options={{ headerShown: true, headerTitle: 'Chat Overview' }}
			/>

			<Stack.Screen
				name="chat"
				component={ChatScreen}
				options={{ headerShown: true, headerBackVisible: false }}
			/>

			<Stack.Screen
				name="profile"
				component={ProfileScreen}
				options={{ headerShown: true, headerTitle: 'Profile' }}
			/>
		</Stack.Navigator>
	);
}
