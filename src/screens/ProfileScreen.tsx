import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { formatJoinedDate } from '../lib/utils';
import Watermark from '../components/Watermark';

const ProfileScreen = () => {
	const { logout, user } = useAuth();
	const navigation = useNavigation();

	if (!user) {
		return;
	}

	function handleLogout() {
		logout();
		// @ts-ignore
		navigation.replace('auth');
	}

	return (
		<View style={styles.container}>
			<View style={styles.profileDetailsContainer}>
				<Text>User ID: {user.id}</Text>
				<Text>Username: {user.username}</Text>
				<Text>Full Name: {user.fullName}</Text>
				<Text>Joined on: {formatJoinedDate(user.createdAt)}</Text>
			</View>

			<Watermark />
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
		padding: 20,
	},
	profileDetailsContainer: {
		flex: 1,
		gap: 8,
	},
});
