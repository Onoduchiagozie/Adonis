import React from 'react';
import { View } from 'react-native';
import WelcomeBanner from './Components/WelcomeBanner';
import ExerciseCategory from './Components/ExerciseCategory';
import BodyPartsWorkout from './Components/BodyPartsWorkout';
import { ScrollView } from 'react-native-virtualized-view';
import LinearGradient from 'react-native-linear-gradient';

function HomeScreen(props) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1">
        <WelcomeBanner />
        <ExerciseCategory />
        <BodyPartsWorkout />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
