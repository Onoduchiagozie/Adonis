import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';

export const UserContext = createContext();

export const UserProvider = ({ children, navigation }) => {
  const [myCurrentUserObject, setUser] = useState(null);
  const [token, setToken] = useState('');

  // useEffect(() => {
  //   const checkAuth = async ({}) => {
  //     const key = 'my_Super_Secret_Key_Here_Must_Not_Be_123, Or, Else';
  //     console.log('token and superkey', token, key);
  //     try {
  //       // const token = await AsyncStorage.getItem('auth_token');
  //       if (token) {
  //         const decoded = JWT.decode(token, key);
  //         const currentTime = Date.now() / 1000;

  //         if (decoded.exp > currentTime) {
  //           setUser({
  //             username: decoded.unique_name || 'Unknown',
  //             email: decoded.email || 'No email provided',
  //             goal: decoded.goal || 'No goal specified',
  //             count: 22,
  //           });
  //         } else {
  //           await AsyncStorage.removeItem('auth_token');
  //           navigation.replace('LoginScreen');
  //         }
  //       } else {
  //         navigation.replace('LoginScreen');
  //       }
  //     } catch (error) {
  //       console.error('Error checking authentication:', error);
  //       navigation.navigate('LoginScreen', { token });
  //     }
  //   };
  //   checkAuth();
  // }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const key = 'my_Super_Secret_Key_Here_Must_Not_Be_123, Or, Else';

      try {
        const storedToken = await AsyncStorage.getItem('auth_token'); // Retrieve token from storage
        console.log('token already in phone memory', storedToken);
        if (storedToken) {
          const decoded = JWT.decode(storedToken, key);
          const currentTime = Date.now() / 1000;
          console.log('token gotten and decoded from phon memory', decoded);

          if (decoded.exp > currentTime) {
            setToken(storedToken); // Ensure token is set before decoding
            setUser({
              username: decoded.unique_name || 'Unknown',
              email: decoded.email || 'No email provided',
              goal: decoded.goal || 'No goal specified',
              count: 22,
            });
            console.log
            ('user has just bgeen set')
          } else {
            navigation.navigate('AuthScreen');
          }
        } else {
          console.log('no stored tokens ');
          navigation.navigate('AuthScreen');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        await AsyncStorage.removeItem('auth_token');
        console.log('deleting tokens');

        navigation.navigate('AuthScreen');
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{ myCurrentUserObject, setUser, setToken, token }}
    >
      {children}
    </UserContext.Provider>
  );
};
