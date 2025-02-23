import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { UserContext } from './../UserContext';
import { Button, Divider, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { secretKey, secretkey } from '../Constants';
import axios from 'axios';
import { ImageBackground } from 'expo-image';
const ProfileScreen = ({ route }) => {
  const [savedWorkout, setSaved] = useState([]);
  const tempToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlB1b0BnbWFpbC5jb20iLCJuYW1laWQiOiJjYTM0M2YwMC0zZmVjLTRmYTEtYWRkZC00ZGU2NjI3OTJlODIiLCJ1bmlxdWVfbmFtZSI6IlB1byIsImdlbmRlciI6IlNocmVkIiwibmJmIjoxNzQwMjQ4MDgwLCJleHAiOjE3NDAyNzMyODAsImlhdCI6MTc0MDI0MDg4MH0.lrZai_Wq2VEbVRDTgyrbpAJVEOzwMVsomh3KBJsmehc';
  const { myCurrentUserObject, setUser, token } = useContext(UserContext);
  const [profileUser, setProfileUser] = useState({});
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          'http://192.168.100.67:5151/api/Favourites/GetUserFavourites',
          {
            headers: { Authorization: `Bearer ${tempToken}` },
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
        console.log('P Token set:', token);

        await AsyncStorage.setItem('auth_token', tempToken);
        //noooooooooooooooooooote T at time sit decodes without proper data  that is ehen the unkown is assign to it
        try {
          const decoded = JWT.decode(tempToken, secretKey);
          setProfileUser({
            username: decoded.unique_name || 'Unknown',
            email: decoded.email || 'No email  provided',
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

  console.log('User object ', profileUser, 'Savd workouts', savedWorkout);

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
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
      onPress={() => {
        console.log(item);
        navigation.navigate('ExerciseDetails', { exercise: item });
      }}
    >
      <View style={{ padding: 10, backgroundColor: 'grey' }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            overflow: 'hidden',
            width: 200, // Adjust width as needed
            margin: 10,
            elevation: 5, // Adds shadow (Android)
            shadowColor: '#000', // Adds shadow (iOS)
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          {/* Image Section */}
          <ImageBackground
            source={{ uri: item.localImagePath }}
            resizeMode="cover"
            style={{
              height: 150, // Adjust height as needed
              width: '100%',
            }}
          />

          {/* Text/Details Section */}
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000435',
                textAlign: 'center',
              }}
            >
              {item.name.length > 20
                ? item.name.slice(0, 20) + '...'
                : item.name}
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: '#555',
                marginTop: 5,
                textAlign: 'center',
              }}
            >
              {item.target} | {item.equipment}
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 10, color: '#fff' }}>
          {item.name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            .slice(0, 15)}
          ...
        </Text>
        <Text style={{ fontSize: 14, color: 'purple' }}>{item.bodyPart}</Text>
        <Text style={{ fontSize: 12, color: 'blue' }}>{item.equipment}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#19313E' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '25%',
          backgroundColor: 'red',
          padding: 16,
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
          <TouchableOpacity
            contentContainerStyle={{ backgroundColor: 'green' }}
            onPress={handlePress}
          >
            <Text style={{ color: '#fff', fontSize: 48 }}>
              {myCurrentUserObject?.username?.[0]}
            </Text>
          </TouchableOpacity>
        </View>
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
              {profileUser.count} Saved workouts
            </Text>
            <Divider style={{ marginBottom: 16 }} />
          </View>
        )}
      />
    </View>
  );
};

export default ProfileScreen;
