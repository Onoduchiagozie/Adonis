import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import WelcomeBanner from './Components/WelcomeBanner';
import ExerciseCategory from './Components/ExerciseCategory';
import BodyPartsWorkout from './Components/BodyPartsWorkout';
import { ScrollView } from 'react-native-virtualized-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

function HomeScreen(props) {
  // const [fontsLoaded] = useFonts({
  //   DancingScript: require('../assets/DancingScript-VariableFont_wght.ttf'),
  //   MouseMemoir: require('../assets/MouseMemoirs-Regular.ttf'),
  //   Oswald: require('../assets/Oswald-VariableFont_wght.ttf'),
  // });
  //
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <LinearGradient
      colors={['#d7d2cc', '#04121e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          <StatusBar />
          <WelcomeBanner />
          <ExerciseCategory />
          <BodyPartsWorkout />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default HomeScreen;
