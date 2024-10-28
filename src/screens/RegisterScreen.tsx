import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert, Text} from 'react-native';
import api from '../api/api';
import Snackbar from 'react-native-snackbar';

const RegisterScreen = ({navigation}: any) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', {username, fullName, password});
      navigation.navigate('login');
      Snackbar.show({
        text: 'Account registered! Please sign in.',
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (error: any) {
      Alert.alert('Error', error?.message ?? 'Registration failed!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headingsContainer}>
          <Text style={styles.headingText}>Create an account</Text>
          <Text style={styles.subHeadingText}>
            Please keep your credentials safe!
          </Text>
        </View>

        <TextInput
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />

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
          <Button title="Register" onPress={handleRegister} />
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

export default RegisterScreen;
