import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Snackbar, Portal } from 'react-native-paper';
import axios from 'axios';
import JWT from 'expo-jwt';
import { UserContext } from '../UserContext';

const AuthScreen = ({ navigation }) => {
  const [isSignIn, setIsSignIn] = useState(false);

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [goal, setGoal] = useState('');

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // const [loginToken, setCurrentUser] = useState('');

  const { setToken, token } = useContext(UserContext);

  const toggleAuth = () => setIsSignIn(!isSignIn);

  // Function to handle API call
  const handleAuth = async () => {
    if (!userName || !password || (!isSignIn && password !== confirmPassword)) {
      setMessage('Please fill all fields correctly.');
      setVisible(true);
      return;
    }
    const endpoint = isSignIn ? 'Login' : 'Register';
    setLoading(true);
    try {
      const response = await axios.post(
        `http://192.168.100.67:5151/api/Auth/${endpoint}`,
        {
          userName,
          password,
          ...(isSignIn ? {} : { confirmPassword }),
          ...(isSignIn ? {} : { email }),
          ...(isSignIn ? {} : { goal }),
        }
      );
      const result = response.data;
      if (response.status === 200) {
        setIsSignIn(true);
        // setCurrentUser(result);
        //saves token  in context for gen access
        setToken(result);
        await AsyncStorage.setItem('auth_token', result); // Store the token
      }
    } catch (error) {
      if (error.response) {
        //following asp.net core identitySignin class return type
        const errorResponse = error.response.data;
        setMessage(errorResponse);
        // statuscode falls out of the range of 2xx
        console.log('Error data:', errorResponse);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('Error request:', error.request);
        setMessage('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
        setMessage('Error in setting up the request');
      }
    } finally {
      setLoading(false);
      setVisible(true);
    }
  };
  useEffect(() => {
    console.log('Authscreen render token is : ', token, 'sign in', isSignIn);
    if (token && isSignIn) {
      try {
        navigation.navigate('Profile');
        console.log('navigatin to profile');
      } catch (error) {
        console.log('Error naviagting', error);
      }
    }
  }, [token, isSignIn, navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#19313E',
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
          color: '#fff',
        }}
      >
        {isSignIn ? 'Login' : 'Join-Us'}
      </Text>

      <TextInput
        label="Username"
        value={userName}
        onChangeText={setUserName}
        style={{ marginBottom: 10 }}
      />

      {!isSignIn && (
        <TextInput
          label="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          style={{ marginBottom: 10 }}
        />
      )}
      {!isSignIn && (
        <TextInput
          label="Goal"
          value={goal}
          onChangeText={setGoal}
          style={{ marginBottom: 10 }}
        />
      )}
      <TextInput
        label="Password"
        value={password}
        // secureTextEntry
        onChangeText={setPassword}
        style={{ marginBottom: 10 }}
      />

      {!isSignIn && (
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ marginBottom: 10 }}
        />
      )}

      <Button
        mode="contained"
        onPress={handleAuth}
        loading={loading}
        disabled={loading}
        style={{ marginBottom: 10 }}
      >
        {isSignIn ? 'Sign In' : 'Register'}
      </Button>

      <Button onPress={toggleAuth} mode="text">
        {isSignIn
          ? "Don't have an account? Register"
          : 'Already have an account? Sign In'}
      </Button>

      <Snackbar
        color={'green'}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        {message}
      </Snackbar>
    </View>
  );
};

export default AuthScreen;
