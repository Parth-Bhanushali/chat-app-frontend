import React from 'react';
import { NavigationProp, PartialState } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderLeft = ({navigation}: {navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & { getState(): Readonly<{ key: string; index: number; routeNames: string[]; history?: unknown[] | undefined; routes: (Readonly<{ key: string; name: string; path?: string | undefined; }> & Readonly<{ params?: Readonly<object | undefined>; }> & { state?: Readonly<any> | PartialState<Readonly<any>> | undefined; })[]; type: string; stale: false; }> | undefined; }}) => {
	const goBack = () => navigation.goBack();
	return (
		<TouchableOpacity onPress={goBack} style={styles.button}>
			<Ionicons name="arrow-back" size={20} color="black" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingRight: 8,
		height: 40,
		justifyContent: 'center',
	},
});

export default React.memo(HeaderLeft);
