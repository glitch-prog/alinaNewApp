import React from 'react';

import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ControlsScreen from '../ControlsScreen/ControlsScreen';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const signInUser = () => {
    const navigateToMainPage = () => navigation.navigate('controlsScreen');
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigateToMainPage();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const handleOnChangeName = text => setName(text);

  const handleOnChangeEmail = text => setEmail(text);

  const handleOnChangePassword = text => setPassword(text);

  const handleOnPressNavigate = () => navigation.navigate('signInScreen');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera App Alina</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleOnChangeEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handleOnChangePassword}
        />
        <TouchableOpacity style={styles.btnSign} onPress={signInUser}>
          <Text style={styles.textBtn}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleOnPressNavigate}>
        <Text>Already registered? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    // alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
  },

  input: {
    backgroundColor: '#ffffff',
    // width: '80%',
    padding: 13,
    marginBottom: 24,
    borderRadius: 15,
  },

  btnSign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3FC6EF',
    width: 320,
    padding: 13,
    marginBottom: 24,
    borderRadius: 15,
  },
  textBtn: {
    color: '#ffffff',
  },
});

export default SignUpScreen;
