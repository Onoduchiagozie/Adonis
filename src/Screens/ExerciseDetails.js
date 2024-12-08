import React from 'react';
import { View, Text, Image } from 'react-native';

const ExerciseDetails = ({ route }) => {
  const { exercise } = route.params;
  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', margin: 50 }}
    >
      <Text>{exercise.name}</Text>
      <Image
        source={{ uri: exercise.gifUrl }}
        style={{ height: 400, width: 250 }}
        resizeMode="stretch"
      />
    </View>
  );
};

export default ExerciseDetails;

// {"bodyPart": "back", "equipment": "barbell", "gifUrl": "https://v2.exercisedb.io/image/Ma-WDKWCNm45ed", "id": "0022", "instruc
//   tions": ["Lie flat on a bench with your head at one end and your feet on the ground.", "Hold the barbell with a pronated grip (palms facing awa
//   y from you) and extend your arms straight above your chest.", "Keeping your arms straight, lower the barbell behind your head in an arc-like mo
//   tion until you feel a stretch in your lats.", "Pause for a moment, then reverse the motion and press the barbell back to the starting position
//   above your chest.", "Repeat for the desired number of repetitions."], "name": "barbell pullover to press", "secondaryMuscles": ["triceps", "chest", "shoulders"], "target": "lats"}
