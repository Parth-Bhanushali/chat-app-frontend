import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { username, password });
      login(response.data);
      navigation.replace('main');
    } catch (error) {
      console.log('Login failed:', JSON.stringify(error, null, 3));
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={() => navigation.navigate('register')} />
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
    gap: 8,
  },
});

export default LoginScreen;
