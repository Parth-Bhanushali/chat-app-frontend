import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../api/api';
import ContactListHeader from '../components/ContactListHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export interface Contact {
  _id: string;
  username: string;
  fullName: string;
}

const ChatOverviewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/chat/contacts');
      setContacts(response.data);
    } catch (error: any) {
      Alert.alert('Error', error?.message ?? 'Couldn\'t fetch users');
    }
  };

  const headerRight = React.useCallback(() => (
    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
      <FontAwesome name="user-circle-o" size={30} color="rgba(1,1,1,0.75)" />
    </TouchableOpacity>
  ), []);

	useEffect(() => {
		navigation.setOptions({
      headerRight: headerRight,
    });
	}, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleContactPress = (contact: Contact) => {
    navigation.navigate('chat', { chatWith: contact });
  };

  const renderContact = React.useCallback(({ item }: { item: Contact }) => (
    <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress(item)}>
      <View style={styles.profileLogoContainer}>
        <Text style={styles.profileLogoChar}>{item.fullName[0].toUpperCase()}</Text>
      </View>

      <Text style={styles.contactText}>{item.fullName}</Text>
    </TouchableOpacity>
  ), []);

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        ListHeaderComponent={<ContactListHeader />}
        renderItem={renderContact}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  contentContainer: {
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  contactText: {
    fontSize: 16,
    padding: 10,
  },
});

export default ChatOverviewScreen;
