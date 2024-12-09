import { StyleSheet } from 'react-native';
import HomeScreen from './src/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BodyPartExerciseList from './src/Screens/BodyPartExerciseList';
import './global.css';
import ExerciseDetails from './src/Screens/ExerciseDetails';
import TimerScreen from './src/Screens/TimerScreen';
import { myUseFonts } from './src/useFonts';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await myUseFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        component={HomeScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="BodyPartExerciseList"
          component={BodyPartExerciseList}
        />
        <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
        <Stack.Screen name="testscreen" component={TimerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //
    //   <HomeScreen/>
    //
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
