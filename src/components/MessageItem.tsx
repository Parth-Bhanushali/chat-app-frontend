import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { formatTime } from '../lib/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleProp } from 'react-native';

interface MessageItemProps {
	item: any;
	index: number;
	userIsSender: boolean;
}

const MessageItem = ({item, index, userIsSender}: MessageItemProps) => {
  const variableContainerStyle: StyleProp<ViewStyle> = {
    alignSelf: userIsSender ? 'flex-end' : 'flex-start',
    backgroundColor: userIsSender ? '#d2f7d2' : '#f1f1f1',
  };

  return (
    <View
      style={[
        styles.container,
        variableContainerStyle,
      ]}
    >
      <Text
        key={item + '' + index}
        style={styles.messageText}>
        {item.content}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.timestamp}>{formatTime(item.createdAt)}</Text>

        {
          userIsSender ?
            item.status === 'sent' ?
            <Ionicons name="checkmark" size={16} color="gray" />
            :
            item.status === 'delivered' ?
            <Ionicons name="checkmark-done" size={16} color="blue" />
            :
            null
          :
          null
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    elevation: 1,
    shadowColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
	messageText: {
    fontSize: 14,
    paddingBottom: 2,
    paddingRight: 8,
    color: 'black',
	},
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  timestamp: {
    fontSize: 11,
    color: 'gray',
  },
});

export default React.memo(MessageItem);
