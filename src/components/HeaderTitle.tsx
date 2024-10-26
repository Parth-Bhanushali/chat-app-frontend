import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HeaderTitle = ({profileImageChar, title, subtitle}: {profileImageChar: string, title: string, subtitle: string}) => (
	<View style={styles.container}>
		<View style={styles.profileLogoContainer}>
			<Text style={styles.profileLogoChar}>{profileImageChar}</Text>
		</View>
		<View style={styles.titlesContainer}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', alignItems: 'center', gap: 16,
	},
	profileLogoContainer: {
		backgroundColor: 'pink', borderRadius: 40, width: 40, height: 40, justifyContent: 'center', alignItems: 'center',
	},
	profileLogoChar: {
		fontSize: 20, includeFontPadding: false, color: 'black',
	},
	titlesContainer: {

	},
	title: {
		color: 'black', fontWeight: '500', fontSize: 18,
	},
	subtitle: {
		color: 'gray', fontSize: 13,
	},
});

export default HeaderTitle;
