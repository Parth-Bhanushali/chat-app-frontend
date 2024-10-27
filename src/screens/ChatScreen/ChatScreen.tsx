import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import io, { Socket } from 'socket.io-client';
import {useAuth} from '../../context/AuthContext';
import api from '../../api/api';
import {SERVER_URL} from '@env';
import { useNavigation } from '@react-navigation/native';
import { Contact } from '../ChatOverviewScreen';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { formatOnlineStatus } from '../../lib/utils';
import HeaderLeft from './components/HeaderLeft';
import HeaderTitle from './components/HeaderTitle';
import HeaderRight from './components/HeaderRight';
import MessageItem from '../../components/MessageItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { IRecipientActiveStatus } from '../../types/custom';
import { FlashList } from '@shopify/flash-list';

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
  const [recipientStatus, setRecipientStatus] = useState<IRecipientActiveStatus>('loading');
  const flatlistRef = useRef<FlashList<any> | null>(null);
  const enableSendButton = newMessage.trim().length > 0;

  const socket = useMemo(() => io(SERVER_URL), []);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('registerUser', user.id);
      subscribeToUserStatus(socket, chatWith._id);
    });

    socket.on('userStatusChanged', (iStatus) => {
      const { isOnline, lastSeen } = iStatus;
      setRecipientStatus(formatOnlineStatus(isOnline, lastSeen));
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
      content: newMessage.toString(),
    };
    setNewMessage('');

    try {
      await api.post('/chat/messages', messageData, {
        headers: {
          Authorization: user.accessToken,
        },
      });
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
      setRecipientStatus(formatOnlineStatus(isOnline, lastSeen));
    } catch (error) {
      console.log('Error polling user status:', error);
    }
  }, []);

  const headerLeft = React.useCallback(() => <HeaderLeft navigation={navigation} />, []);
  const headerTitle = React.useCallback(() =>
  <HeaderTitle
    title={chatWith.fullName}
    subtitle={recipientStatus}
    profileImageChar={chatWith.fullName[0].toUpperCase()} />
    , [recipientStatus, chatWith.fullName]);
  const headerRight = React.useCallback(() => <HeaderRight />, []);


  useEffect(() => {
    navigation.setOptions({
      headerLeft: headerLeft,
      headerTitle: headerTitle,
      headerRight: headerRight,
    });
  }, [recipientStatus]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchMessages();
      pollUserStatus();
    }, 200);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  const renderMessageItem = React.useCallback(
    ({item, index}: {item: any; index: number}) => {
      const userIsSender = item.sender === user.id;
      return <MessageItem item={item} index={index} userIsSender={userIsSender} />;
    },
    [user.id],
  );

  const renderItemSeparator = React.useCallback((props: any) => {
    const { leadingItem, trailingItem } = props;
    const variableSeparatorStyle = {
      height: trailingItem.sender !== leadingItem.sender ? 24 : 8,
    };
    return <View style={variableSeparatorStyle} />;
  }, []);

  return (
    <ImageBackground style={styles.BG} source={require('../../assets/pattern.png')}>
      <View style={styles.container}>
        <FlashList
          data={messages}
          ref={flatlistRef}
          inverted
          renderItem={renderMessageItem}
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderItemSeparator}
          contentContainerStyle={styles.contentContainer}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            style={styles.messageInput}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.sendMessageButton, enableSendButton ? styles.sendMessageButtonEnabled : styles.sendMessageButtonDisabled]}
            onPress={sendMessage}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tintOverBG} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  BG: {
    flex: 1,
  },
  tintOverBG: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    opacity: 0.075,
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    zIndex: 2,
  },
  contentContainer: {
    padding: 16,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  messageInput: {
    flex: 1,
  },
  sendMessageButton: {
    paddingLeft: 2,
    overflow: 'hidden',
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendMessageButtonEnabled: {
    backgroundColor: '#2d9147',
  },
  sendMessageButtonDisabled: {
    backgroundColor: '#c3c7c4',
  },
});

export default ChatScreen;
