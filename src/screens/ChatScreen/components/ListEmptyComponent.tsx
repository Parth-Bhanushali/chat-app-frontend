import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const ListEmptyComponent = ({
  loading,
  error,
  empty,
}: {
  loading: boolean;
  error: string;
  empty: boolean;
}) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={35} color={'black'} />
      ) : error ? (
        <Text style={styles.infoText}>{error}</Text>
      ) : empty ? (
        <Text style={styles.infoText}>No message history</Text>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
  },
});

export default React.memo(ListEmptyComponent);
