import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import { ExcerciseDB_API_KEY } from '../Constants';
import { LinearGradient } from 'expo-linear-gradient';

const BodyPartExerciseList = ({ route }) => {
  const navigation = useNavigation();
  const { workout } = route.params;

  // State to store exercises fetched from the API
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchExercises = async () => {
      const options = {
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/${encodeURIComponent(workout.selection)}/${encodeURIComponent(workout.name)}`,
        headers: {
          'x-rapidapi-key': ExcerciseDB_API_KEY,
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setExercises(response.data); // Store fetched data in state
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false); // Hide loader once request completes
      }
    };

    fetchExercises();
  }, [workout.name]); // Dependency array ensures the API is called when `workout.name` changes

  return (
    <LinearGradient
      colors={['#d7d2cc', '#304352']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ marginRight: 1 }}>
        <View style={{ marginTop: 60, flex: 1 }} className="mt-6">
          <Image
            source={workout.imagePath}
            style={{
              margin: 10,
              width: '95%',
              height: '15%',
              borderRadius: 10,
              borderColor: 'ash',
              borderWidth: 5,
            }}
          />
          <Text style={{ fontSize: 30, marginTop: 20, marginLeft: 20 }}>
            {exercises.length}{' '}
            <Text style={{ color: 'indigo' }}>
              {workout.name
                .split(' ') // Split into words
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                .join(' ')}{' '}
            </Text>
            Workouts
          </Text>

          {loading ? (
            <ActivityIndicator color={'white'} size={'large'} />
          ) : (
            <FlatList
              data={exercises}
              className=""
              keyExtractor={(item) => item.id || item.name || `${item.gifUrl}`}
              numColumns={2}
              style={{ marginHorizontal: 20 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',

                    justifyContent: 'space-around',
                  }}
                  onPress={() => {
                    console.log(item);
                    // {"bodyPart": "back", "equipment": "barbell", "gifUrl": "https://v2.exercisedb.io/image/Ma-WDKWCNm45ed", "id": "0022", "instruc
                    //   tions": ["Lie flat on a bench with your head at one end and your feet on the ground.", "Hold the barbell with a pronated grip (palms facing awa
                    //   y from you) and extend your arms straight above your chest.", "Keeping your arms straight, lower the barbell behind your head in an arc-like mo
                    //   tion until you feel a stretch in your lats.", "Pause for a moment, then reverse the motion and press the barbell back to the starting position
                    //   above your chest.", "Repeat for the desired number of repetitions."], "name": "barbell pullover to press", "secondaryMuscles": ["triceps", "chest", "shoulders"], "target": "lats"}
                    navigation.navigate('ExerciseDetails', { exercise: item });
                  }}
                >
                  <Image
                    source={{ uri: item.gifUrl }} // Use image from the API response
                    resizeMode="stretch"
                    style={{
                      borderWidth: 2,
                      borderColor: '#000435',
                      height: 300,
                      width: 170,
                      borderRadius: 10,
                      marginTop: 20,
                      borderBottomWidth: 15,
                      marginLeft: 10,
                    }}
                  />

                  <Text
                    className="text-center"
                    style={{
                      marginHorizontal: 30,
                      fontFamily: 'MouseMemoir',
                    }}
                  >
                    {item.name.length > 15
                      ? `${item.name
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')
                          .slice(0, 15)}...`
                      : item.name
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default BodyPartExerciseList;
