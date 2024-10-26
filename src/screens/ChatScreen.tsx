import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import io from 'socket.io-client';
import {useAuth} from '../context/AuthContext';
import api from '../api/api';
import {SERVER_URL} from '@env';
import { useNavigation } from '@react-navigation/native';
import { Contact } from './ChatOverviewScreen';

const ChatScreen: React.FC<{route: {params: {chatWith: Contact}}}> = ({
  route,
}) => {
  const {chatWith} = route.params;
  const {user} = useAuth();
  const navigation = useNavigation();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const flatlistRef = useRef<FlatList | null>(null);

  const socket = useMemo(() => io(SERVER_URL), []);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('registerUser', user.id);
    });

    socket.on('receiveMessage', message => {
      const userIsSender = message.sender === user.id;
      let isCorrectChatOpen = false;

      if (userIsSender && message.receiver === chatWith._id) {
        isCorrectChatOpen = true;
      } else if (!userIsSender && message.sender === chatWith._id) {
        isCorrectChatOpen = true;
      }

      if (isCorrectChatOpen) {
        setMessages(prev => [message, ...prev]);
        setTimeout(() => flatlistRef.current?.scrollToIndex({ index: 0, animated: true, viewOffset: 50 }), 200);
      }
    });

    return () => {
      socket.off('receiveMessage');
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async () => {
    const messageData = {
      receiver: chatWith._id,
      content: newMessage,
    };

    try {
      await api.post('/chat/messages', messageData, {
        headers: {
          Authorization: user.token,
        },
      });
      setNewMessage('');
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  const fetchMessages = React.useCallback(async () => {
    console.log('Fetching messages with token: ', user.token);

    try {
      const response = await api.get('/chat/messages/' + chatWith._id, {
        headers: {
          Authorization: user.token,
        },
      });
      setMessages(response.data.reverse());
    } catch (error) {
      console.log('Error fetching messages:', error);
      console.log(JSON.stringify(error, null, 3));
    }
  }, [user.token, chatWith._id]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: chatWith.username[0].toUpperCase() + chatWith.username.slice(1).toLocaleLowerCase(),
    });
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMessageItem = React.useCallback(
    ({item, index}: {item: any; index: number}) => {
      const userIsSender = item.sender === user.id;

      return (
        <Text
          key={item + '' + index}
          style={[userIsSender ? styles.userMessage : styles.anonMessage]}>
          {item.content}
        </Text>
      );
    },
    [user.id],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        ref={flatlistRef}
        inverted
        renderItem={renderMessageItem}
        contentContainerStyle={styles.contentContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    gap: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  anonMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  inputContainer: {
    padding: 16,
    paddingTop: 0,
  },
});

export default ChatScreen;
