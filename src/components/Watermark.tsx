import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { DEVELOPER } from '../lib/const';

const Watermark = () => {
  return (
    <View style={styles.container}>
			<Text style={styles.sentenceText}>Developed and engineered{'\n'}by
				<Text style={styles.developerText}> {DEVELOPER}</Text>
			</Text>
    </View>
  );
};

export default Watermark;

const styles = StyleSheet.create({
	container: {

	},
	sentenceText: {
		textAlign: 'center',
		fontSize: 14,
		lineHeight: 20,
	},
	developerText: {
		fontWeight: '500',
	},
});
