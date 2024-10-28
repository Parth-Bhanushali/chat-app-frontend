import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { pendingImplementationAlert } from '../../../lib/utils';

const HeaderTitle = ({
  profileImageChar,
  title,
  subtitle,
}: {
  profileImageChar: string;
  title: string;
  subtitle: string;
}) => {

	function handleHeaderTitlePress() {
		pendingImplementationAlert('User details has been request by user');
	}

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleHeaderTitlePress} style={styles.container}>
      <View style={styles.profileLogoContainer}>
        <Text style={styles.profileLogoChar}>{profileImageChar}</Text>
      </View>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileLogoContainer: {
    backgroundColor: 'pink',
    borderRadius: 40,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileLogoChar: {
    fontSize: 20,
    includeFontPadding: false,
    color: 'black',
  },
  titlesContainer: {},
  title: {
    color: 'black',
    fontWeight: '500',
    fontSize: 17,
  },
  subtitle: {
    color: 'gray',
    fontSize: 13,
  },
});

export default React.memo(HeaderTitle);
