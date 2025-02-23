import { React, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-virtualized-view';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { BaseURL, tokenGlobal } from '../Constants';
import { Icon } from 'react-native-paper';
const ExerciseDetails = ({ route }) => {
  const { exercise } = route.params;
  console.log('here we go ', exercise, token);
  const { token } = useContext(UserContext);

  async function addExercise() {
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
        'Your exercise has been added to your favourites.'
      );
console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error adding exercise:', error.response);
    }
  }

  return (
    <LinearGradient
      colors={['#d7d2cc', '#304352']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 50,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'transparent',
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <View style={{}}>
              <View>
                <TouchableOpacity onPress={addExercise}>
                  <Text
                    className="text-center uppercase underline"
                    style={{ fontSize: 18 }}
                  >
                    {exercise.name} for{' '}
                    <Text
                      style={{
                        color: 'indigo',
                        fontWeight: 'bold',
                        fontFamily: 'Oswald',
                      }}
                    >
                      {exercise.bodyPart}
                      <Icon name="heart" size={35} color="indigo" />
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/*<TouchableOpacity style={{ marginTop: 1, marginLeft: 10 }}>*/}
            {/*  <Ionicons name="heart" size={35} color="indigo" />*/}
            {/*</TouchableOpacity>*/}
          </View>

          <ImageBackground
            source={{ uri: exercise.gifUrl }}
            style={{
              marginTop: 25,
              height: 400,
              width: 250,
              borderWidth: 5,
              borderBottomWidth: 15,
              borderBottomColor: 'indigo',
              borderRadius: 10,
              marginLeft: 30,
            }}
            resizeMode="stretch"
          />
        </View>

        <View style={{ marginTop: 20, paddingBottom: 100 }}>
          <Text
            className="text-center uppercase underline font-semibold"
            style={{
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Instructions
          </Text>
          {exercise.instructions.map((instruction, index) => (
            <Text
              key={index}
              style={{
                fontSize: 24,
                marginBottom: 20,
                fontFamily: 'MouseMemoir',
              }}
            >
              <Text style={{ color: 'indigo', fontSize: 20 }} className="">
                {index + 1}
              </Text>{' '}
              . {instruction}
            </Text>
          ))}
          <Text style={{ fontSize: 20 }}>
            Secondary muscles
            {exercise.secondaryMuscles.map((muscle, index) => (
              <Text
                key={index}
                style={{
                  fontSize: 14,
                  marginBottom: 20,
                  fontFamily: 'Oswald',
                  color: 'indigo',
                }}
              >
                {' '}
                {muscle},
              </Text>
            ))}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ExerciseDetails;

// {"bodyPart": "back", "equipment": "barbell", "gifUrl": "https://v2.exercisedb.io/image/Ma-WDKWCNm45ed", "id": "0022", "instruc
//   tions": ["Lie flat on a bench with your head at one end and your feet on the ground.", "Hold the barbell with a pronated grip (palms facing awa
//   y from you) and extend your arms straight above your chest.", "Keeping your arms straight, lower the barbell behind your head in an arc-like mo
//   tion until you feel a stretch in your lats.", "Pause for a moment, then reverse the motion and press the barbell back to the starting position
//   above your chest.", "Repeat for the desired number of repetitions."], "name": "barbell pullover to press", "secondaryMuscles": ["triceps", "chest", "shoulders"], "target": "lats"}
