import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

type Props = {}

const ProfileScreen = (props: Props) => {
	const { logout, user } = useAuth();
	const navigation = useNavigation();

	if (!user) {
		return;
	}

	function handleLogout() {
		logout();
		// @ts-ignore
		navigation.navigate('login');
	}

	return (
		<View style={styles.container}>
			<View style={styles.profileDetailsContainer}>
				<Text>id: {user.id}</Text>
				<Text>username: {user.username}</Text>
				<Text>fullname: {user.fullName}</Text>
				<Text>accessToken: {user.accessToken}</Text>
				<Text>refreshToken: {user.refreshToken}</Text>
			</View>

			<Button title="Logout" onPress={handleLogout} />
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		gap: 16,
		padding: 16,
	},
	profileDetailsContainer: {
		flex: 1,
		gap: 8
	},
});
