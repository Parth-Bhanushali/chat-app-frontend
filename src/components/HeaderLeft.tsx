import { NavigationProp, PartialState } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const HeaderLeft = (navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & { getState(): Readonly<{ key: string; index: number; routeNames: string[]; history?: unknown[] | undefined; routes: (Readonly<{ key: string; name: string; path?: string | undefined; }> & Readonly<{ params?: Readonly<object | undefined>; }> & { state?: Readonly<any> | PartialState<Readonly<any>> | undefined; })[]; type: string; stale: false; }> | undefined; }) => {
	const goBack = () => navigation.goBack();
	return (
		<Text
			onPress={goBack}
			style={styles.backText}>
				Back
		</Text>
	);
};

const styles = StyleSheet.create({
	backText: {
		paddingRight: 8, fontSize: 12, color: 'gray',
	},
});

export default HeaderLeft;
