import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import io, { Socket } from 'socket.io-client';
import {useAuth} from '../context/AuthContext';
import api from '../api/api';
import {SERVER_URL} from '@env';
import { useNavigation } from '@react-navigation/native';
import { Contact } from './ChatOverviewScreen';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { timeAgo } from '../lib/utils';
import HeaderLeft from '../components/HeaderLeft';
import HeaderTitle from '../components/HeaderTitle';

const subscribeToUserStatus = (socket: Socket<DefaultEventsMap, DefaultEventsMap>, targetUserId: string) => {
  socket.emit('subscribeToUserStatus', targetUserId);
};

const unsubscribeToUserStatus = (socket: Socket<DefaultEventsMap, DefaultEventsMap>, targetUserId: string) => {
  socket.emit('unsubscribeToUserStatus', targetUserId);
};

const ChatScreen: React.FC<{route: {params: {chatWith: Contact}}}> = ({
  route,
}) => {
  const {chatWith} = route.params;
  const {user} = useAuth();
  const navigation = useNavigation();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientStatus, setRecipientStatus] = useState<'loading'|'online'|string>('loading');
  const flatlistRef = useRef<FlatList | null>(null);

  const socket = useMemo(() => io(SERVER_URL), []);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('registerUser', user.id);
      subscribeToUserStatus(socket, chatWith._id);
    });

    socket.on('userStatusChanged', (iStatus) => {
      const { isOnline, lastSeen } = iStatus;
      const newStatus = isOnline ? 'online' : timeAgo(lastSeen);
      setRecipientStatus(newStatus);
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
      unsubscribeToUserStatus(socket, chatWith._id);
      socket.off('userStatusChanged');
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    const messageData = {
      receiver: chatWith._id,
      content: newMessage,
    };

    try {
      await api.post('/chat/messages', messageData, {
        headers: {
          Authorization: user.accessToken,
        },
      });
      setNewMessage('');
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  const fetchMessages = React.useCallback(async () => {
    try {
      const response = await api.get('/chat/messages/' + chatWith._id, {
        headers: {
          Authorization: user.accessToken,
        },
      });
      setMessages(response.data.reverse());
    } catch (error) {
      console.log('Error fetching messages:', error);
    }
  }, [user.accessToken, chatWith._id]);

  const pollUserStatus = React.useCallback(async () => {
    try {
      const response = await api.get(`/users/${chatWith._id}/status`, {
        headers: {
          Authorization: user.accessToken,
        },
      });

      const { isOnline, lastSeen } = response.data;
      const newStatus = isOnline ? 'online' : timeAgo(lastSeen);
      setRecipientStatus(newStatus);
    } catch (error) {
      console.log('Error polling user status:', error);
    }
  }, []);

  const headerLeft = React.useCallback(() => HeaderLeft(navigation), [navigation]);
  const headerTitle = React.useCallback(() =>
  <HeaderTitle
    title={chatWith.fullName}
    subtitle={recipientStatus}
    profileImageChar={chatWith.fullName[0].toUpperCase()} />
    , [recipientStatus, chatWith.fullName]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: headerLeft,
      headerTitle: headerTitle,
    });
  }, [recipientStatus]);

  useEffect(() => {
    fetchMessages();
    pollUserStatus();
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
