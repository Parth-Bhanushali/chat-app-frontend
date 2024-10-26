import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

export interface Contact {
  _id: string;
  username: string;
  fullName: string;
}

const ChatOverviewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/chat/contacts', {
        headers: {
          'Authorization': user.accessToken,
        },
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

	useEffect(() => {
		navigation.setOptions({
      headerRight: (() => <TouchableOpacity onPress={() => navigation.navigate('profile')}>
      <Text>Profile</Text>
    </TouchableOpacity>),
    });
	}, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleContactPress = (contact: Contact) => {
    navigation.navigate('chat', { chatWith: contact });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContactPress(item)}>
            <Text style={styles.contactText}>{item.username}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactText: {
    fontSize: 18,
    padding: 10,
  },
});

export default ChatOverviewScreen;
