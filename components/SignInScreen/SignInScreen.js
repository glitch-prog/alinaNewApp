import React from 'react';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInUser = () => {
    const navigateToMainPage = () => navigation.navigate('controlsScreen');

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        navigateToMainPage();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleOnChangeEmail = text => setEmail(text);

  const handleOnChangePassword = text => setPassword(text);

  const handleOnPressNavigate = () => navigation.navigate('signUpScreen');
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
          <Text style={styles.textBtn}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleOnPressNavigate}>
        <Text>Not registered? Sign Up</Text>
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
    borderRadius: 10,
  },

  btnSign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFBB00',
    width: 320,
    padding: 13,
    marginBottom: 24,
    borderRadius: 10,
  },
  textBtn: {
    color: '#ffffff',
  },
});

export default SignInScreen;
