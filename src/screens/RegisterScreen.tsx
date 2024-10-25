import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../api/api';

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { username, password });
      navigation.navigate('login');
    } catch (error) {
      console.log('Registration failed:', error);
      Alert.alert('Error', 'Failed to register');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <View style={styles.buttonsContainer}>
        <Button title="Register" onPress={handleRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonsContainer: {
    marginTop: 8,
  }
});

export default RegisterScreen;
