import React from 'react';
import { View } from 'react-native';
import WelcomeBanner from './Components/WelcomeBanner';
import ExerciseCategory from './Components/ExerciseCategory';
import BodyPartsWorkout from './Components/BodyPartsWorkout';
import { ScrollView } from 'react-native-virtualized-view';

function HomeScreen(props) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="" style={{ backgroundColor: 'transparent' }}>
        <WelcomeBanner />
        <ExerciseCategory />

        <BodyPartsWorkout />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
