import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { UserContext } from './../UserContext';
import { Button, Divider, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { restaurants } from '../Constants';
const ProfileScreen = ({ route }) => {
  const { myCurrentUserObject, setUser, token } = useContext(UserContext);
  // const { loginToken } = route.params;

  // useEffect(() => {
  //   const initializeUser = async () => {
  //     const key = 'my_Super_Secret_Key_Here_Must_Not_Be_123, Or, Else';

  //     if (token) {
  //       try {
  //         console.log('profile useEffect token', token);

  //         //for storing token
  //         await AsyncStorage.setItem('auth_token', token);

  //         //DECODE CONVERT TOEKN TO USER OBJECT
  //         try {
  //           console.log(token);
  //           const decoded = JWT.decode(token, key);
  //           setUser(decoded);
  //           console.log('decoded-payload', decoded);
  //         } catch (error) {

  //           console.log('error decoding token', error);
  //         }
  //       } catch (error) {
  //         console.error('Error storing token:', error);
  //       }
  //     }
  //   };
  //   initializeUser();
  // }, [token]);

  useEffect(() => {
    const initializeUser = async () => {
      const key = 'my_Super_Secret_Key_Here_Must_Not_Be_123, Or, Else';

      if (token && token.length > 10) {
        // Ensure token exists and is not an empty string
        try {
          console.log('Profile useEffect token:', token);

          await AsyncStorage.setItem('auth_token', token);

          try {
            const decoded = JWT.decode(token, key);

            // Ensure decoded token contains required user data
            if (decoded && decoded.exp) {
              console.log('decoded ', token);
              try {
                setUser({
                  username: decoded.unique_name || 'Unknown',
                  email: decoded.email || 'No email provided',
                  goal: decoded.gender || 'No goal specified',
                  count: 22,
                });
                console.log('Decoded payload:', decoded);
              } catch (error) {
                console.error('Error setuser to its state ', error);
              }
            } else {
              console.log('Decoded token is invalid');
            }
          } catch (error) {
            console.log('Error decoding token:', error);
          }
        } catch (error) {
          console.error('Error storing token:', error);
        }
      } else {
        //write code to tell em that you havent registered yet
        console.log('No valid token found yet.');
        navigator.navigate('Favourites');
      }
    };
    console.log('eneding useeffects');

    initializeUser();
  }, [token]);

  console.log('User obj ', myCurrentUserObject);

  if (!myCurrentUserObject) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handlePress = (touchedWorkout) => {
    Vibration.vibrate(10);
    console.log(touchedWorkout);
    // navigation.navigate('ExerciseDetails', { exercise: touchedWorkout });
  };

  const FavoriteItem = ({ item }) => (
    <View
      style={{ width: '47.5%', margin: 1, borderRadius: 8, overflow: 'hidden' }}
    >
      <TouchableRipple
        onPress={() => handlePress(item)}
        rippleColor="rgba(0, 0, 0, .32)"
        style={{ marginBottom: 5, backgroundColor: '#FFF5E1', borderRadius: 8 }}
      >
        <View>
          <Image
            source={{ uri: item.image_url }}
            style={{ width: '100%', height: 160 }}
          />
          <View style={{ padding: 12, backgroundColor: '#19313E' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 14, color: '#ccc' }}>{item.phone}</Text>
            <Text style={{ fontSize: 12, color: '#aaa' }}>{item.rating}</Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#19313E' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '25%',
        }}
      >
        <View
          style={{
            width: 144,
            height: 144,
            borderRadius: 72,
            backgroundColor: '#1E90FF',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 16,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 48 }}>
            {myCurrentUserObject?.username?.[0]}
          </Text>
        </View>
        <View style={{ flex: 1, marginRight: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
            {myCurrentUserObject.username}
          </Text>
          <Text style={{ color: '#fff' }}>{myCurrentUserObject.email}</Text>
          <Text style={{ color: '#fff' }}>{myCurrentUserObject.goal}</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 8,
              marginLeft: 8,
              color: '#fff',
            }}
          >
            {myCurrentUserObject.count} Likes
          </Text>
          <Divider />
        </View>
      </View>
      <FlatList
        data={restaurants} // Ensure 'restaurants' is defined and imported appropriately
        renderItem={FavoriteItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 5 }}
        numColumns={2}
        ListHeaderComponent={() => (
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 16,
                marginLeft: 8,
                color: '#fff',
              }}
            >
              {myCurrentUserObject.count} Saved
            </Text>
            <Divider style={{ marginBottom: 16 }} />
          </View>
        )}
      />
    </View>
  );
};

export default ProfileScreen;
