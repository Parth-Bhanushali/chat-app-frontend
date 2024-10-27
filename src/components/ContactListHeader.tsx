import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ContactListHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Joined Users</Text>
      <Text style={styles.subHeaderText}>Let's start connecting with each other!</Text>
    </View>
  );
};

export default ContactListHeader;

const styles = StyleSheet.create({
	container: {
		gap: 6,
		paddingBottom: 8,
	},
	headerText: {
		fontSize: 24,
		color: 'black',
		fontWeight: '600',
	},
	subHeaderText: {
		fontSize: 16,
		color: 'gray',
		fontWeight: '600',
	},
});
