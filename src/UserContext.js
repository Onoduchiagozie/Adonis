import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';

export const UserContext = createContext();

export const UserProvider = ({ children, navigation }) => {
  const [myCurrentUserObject, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const key = 'my_Super_Secret_Key_Here_Must_Not_Be_123, Or, Else';

      try {
        const storedToken = await AsyncStorage.getItem('auth_token');
       // setToken(storedToken);
        console.log('C MEMORY-TOKEN=', storedToken);
        if (storedToken) {
          const decoded = JWT.decode(storedToken, key);
          console.log('C DECODED USER = ', decoded);

          //TOKEN SHOULD ONLY BE SET IN AUTHSCREEN STATE

          setUser({
            username: decoded.unique_name || 'Unknown',
            email: decoded.email || 'No email  provided',
            goal: decoded.gender || 'No goal specified',
            count: 22,
          });
          console.log('C user has just Been set');
        } else {
          console.log('C no stored tokens ');
          navigation.navigate('AuthScreen');
        }
      } catch (error) {
        console.log('C Error checking authentication:', error);
        await AsyncStorage.removeItem('auth_token');
        console.log('C deleting tokens');
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
