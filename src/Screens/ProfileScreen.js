import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { UserContext } from './../UserContext';
import { Button, Divider, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { BaseURL, secretKey, secretkey, tokenGlobal } from '../Constants';
import axios from 'axios';
import { ImageBackground } from 'expo-image';
const ProfileScreen = ({ route }) => {
  const [savedWorkout, setSaved] = useState([]);
  const { myCurrentUserObject, setUser, token } = useContext(UserContext);
  const [profileUser, setProfileUser] = useState({});
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}Favourites/GetUserFavourites`,
          {
            headers: { Authorization: `Bearer ${tokenGlobal}` },
          }
        );
        console.log('Saved exercises are ', response.data);
        setSaved(response.data);
      } catch (error) {
        console.error('Error fetching favourites:', error);
      }
    };

    const initializeUser = async () => {
      try {
        console.log('P Token set:', tokenGlobal);

        await AsyncStorage.setItem('auth_token', tokenGlobal);
        try {
          const decoded = JWT.decode(tokenGlobal, secretKey);
          setProfileUser({
            username: decoded.unique_name || 'Unknown',
            email: decoded.email || 'No email provided',
            goal: decoded.gender || 'No goal specified',
            count: 22,
          });

          if (decoded && decoded.unique_name) {
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
    };

    fetchFavourites();
    initializeUser();
  }, [token]);

  console.log(
    'User object ',
    profileUser,
    'another user ',
    myCurrentUserObject,
    'Savd workouts',
    savedWorkout
  );

  if (!profileUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handlePress = (touchedWorkout) => {
    fetchFavourites();
    console.log(touchedWorkout);
    // navigation.navigate('ExerciseDetails', { exercise: touchedWorkout });
  };

  const FavoriteItem = ({ item }) => (
    //an indivual row of flatist
    <View style={{ padding: 10 }}>
      <View
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          width: 160, // Adjust width as needed
          margin: 10,
          height: 300,
          backgroundColor: '#fff',
        }}
      >
        {/* Image Section */}
        <TouchableOpacity
          style={{}}
          onPress={() => {
            console.log(item);
            navigation.navigate('ExerciseDetails', { exercise: item });
          }}
        >
          <ImageBackground
            source={{ uri: item.localImagePath }}
            resizeMode="stretch"
            style={{
              height: 250,
              width: '100%',
            }}
          />

          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontSize: 14,
                marginTop: 5,
                textAlign: 'center',
                color: 'blue',
              }}
            >
              <Text style={{ color: 'indigo' }}>
                {item.target
                  .slice(0, 10)
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))}
              </Text>{' '}
              |{' '}
              {item.equipment
                .slice(0, 10)
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
          padding: 16,
        }}
      >
        //USERNAME ICON
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
          <TouchableOpacity
            contentContainerStyle={{ backgroundColor: 'green' }}
            onPress={handlePress}
          >
            <Text style={{ color: '#fff', fontSize: 48 }}>
              {myCurrentUserObject?.username?.[0]}
            </Text>
          </TouchableOpacity>
        </View>
        //USER DETAIL SSECTIONS
        <View
          style={{ flex: 1, marginRight: 20, justifyContent: 'space-between' }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
            {profileUser.username}
          </Text>
          <Text style={{ color: '#fff' }}>{profileUser.email}</Text>
          <Text style={{ color: '#fff' }}>{profileUser.goal}</Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 8,
              marginLeft: 8,
              color: '#fff',
            }}
          >
            {profileUser.count}-Likes
          </Text>
          <Divider />
        </View>
      </View>

      <FlatList
        data={savedWorkout} // Ensure 'restaurants' is defined and imported appropriately
        renderItem={FavoriteItem}
        keyExtractor={(item) => item.name || `${item.gifUrl}`}
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
              {savedWorkout.length} Saved workouts
            </Text>
            <Divider style={{ marginBottom: 16 }} />
          </View>
        )}
      />
    </View>
  );
};

export default ProfileScreen;
