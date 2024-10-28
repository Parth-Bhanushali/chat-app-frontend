import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { pendingImplementationAlert } from '../../../lib/utils';

const HeaderRight = () => {
  function onVideoCallRequested () {
		pendingImplementationAlert('Video call has been requested by user');
	}

	function onMenuExpandRequested () {
		pendingImplementationAlert('Menu expansion has been requested by user');
	}

	return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onVideoCallRequested}>
        <Ionicons name="videocam-outline" size={26} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onMenuExpandRequested}>
        <Ionicons name="ellipsis-vertical" size={22} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
});

export default React.memo(HeaderRight);
