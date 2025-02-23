import axios from 'axios';
import { BaseURL, secretKey, tokenGlobal } from './Constants';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { useState } from 'react';
const [profileUser, setProfileUser] = useState({});

export async function addExercise(exercise) {
  const ExerciseDTO = {
    ...exercise,
    ExerciseId: exercise.id,
    instructions: exercise.instructions.join(' | '), // Convert array to single string with separator
    secondaryMuscles: exercise.secondaryMuscles.join(', '), // Convert array to comma-separated string
  };
  try {
    const response = await axios.post(
      `${BaseURL}Favourites/AddFavourite`,
      JSON.stringify(ExerciseDTO),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenGlobal}`,
        },
      }
    );
    //add response to message body
    Alert.alert(
      'Exercise added!',
      `${ExerciseDTO.name} has been added to your favourites.`
    );
    //console.log('response from portal', response.data);
    const result = response.data.message;
  } catch (error) {
    Alert.alert(
      'Error Adding Workout!',
      `we will be with you just try again later .`
    );
    console.error('Error adding exercise:', error);
  }
}

export const fetchFavourites = async () => {
  try {
    const response = await axios.get(`${BaseURL}Favourites/GetUserFavourites`, {
      headers: { Authorization: `Bearer ${tokenGlobal}` },
    });
    console.log('Saved exercises are ', response.data);
    setSaved(response.data);
  } catch (error) {
    console.error('Error fetching favourites:', error);
  }
};

export const initializeUser = async () => {
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

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Replace with your actual RapidAPI key for ExerciseDB
// const EXERCISE_DB_API_KEY = 'your_api_key_here';

// class ApiService {
//   constructor() {
//     // Create an axios instance for your secured (backend) API calls
//     this.client = axios.create({
//       baseURL: 'http://192.168.100.67:5151/api/',
//       timeout: 10000,
//     });

//     // Add a request interceptor that attaches the JWT token (if available)
//     this.client.interceptors.request.use(
//       async (config) => {
//         const token = await AsyncStorage.getItem('userToken');
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     // Create an axios instance for external API calls (e.g., ExerciseDB)
//     this.externalClient = axios.create({
//       baseURL: 'https://exercisedb.p.rapidapi.com',
//       timeout: 10000,
//       headers: {
//         'x-rapidapi-key': EXERCISE_DB_API_KEY,
//         'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
//       },
//     });
//   }

//   // Secured API call: adds an exercise to favourites
//   async addExercise(exerciseData) {
//     return this.client.post('', exerciseData);
//   }
//    // Secured API call: retrieves user's favourited exercises

//   async getUserExercise() {
//     console.log('Requesting for user favourited exercises');
//     return this.client.get('Favourites/GetUserFavourites');
//   }
//   // External API call: fetches exercises based on selection and name
//   async fetchExercises(selection, name) {
//     const url = `/exercises/${encodeURIComponent(selection)}/${encodeURIComponent(name)}`;
//     return this.externalClient.get(url);
//   }
// }

// export default new ApiService();
