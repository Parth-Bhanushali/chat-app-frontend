import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert, Text} from 'react-native';
import api from '../api/api';
import {useAuth} from '../context/AuthContext';

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {username, password});
      if (response?.data) {
        login(response.data);
        navigation.replace('main');
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      Alert.alert('Error', error?.message ?? 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headingsContainer}>
          <Text style={styles.headingText}>Log in</Text>
          <Text style={styles.subHeadingText}>Enter your credentials to securely sign in!</Text>
        </View>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <View style={styles.buttonsContainer}>
          <Button title="Login" onPress={handleLogin} />
          <Button
            title="Register"
            onPress={() => navigation.navigate('register')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  formContainer: {

  },
  headingsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  headingText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(1,1,1,0.85)',
  },
  subHeadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 0.75,
    borderBottomColor: 'lightgray',
  },
  buttonsContainer: {
    marginTop: 36,
    gap: 8,
  },
});

export default LoginScreen;
