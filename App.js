import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import HomeScreen from './src/HomeScreen';
import BodyPartExerciseList from './src/Screens/BodyPartExerciseList';
import ExerciseDetails from './src/Screens/ExerciseDetails';
import TimerScreen from './src/Screens/TimerScreen';
import FavouritesScreen from './src/Screens/FavouritesScreen'; // Create this screen
import ProfileScreen from './src/Screens/ProfileScreen'; // Create this screen
import { myUseFonts } from './src/useFonts';
import { Ionicons } from '@expo/vector-icons'; // For tab icons

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        onError={(x) => {
          console.error(x);
        }}
      />
    );
  }

  // Stack Navigator for the Home Tab
  function HomeStack() {
    return (
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerShown: false,
          // headerTransparent: true, // Makes the header background transparent
          // headerTitleStyle: {
          //   color: 'purple',
          // },
          // headerTintColor: 'red', // Color for back button and icons in the header
        }}
      >
        <Stack.Screen name="HomePage" component={HomeScreen} />
        <Stack.Screen
          name="BodyPartExerciseList"
          component={BodyPartExerciseList}
          options={{
            headerShown: true,
            title: ' ',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="ExerciseDetails"
          component={ExerciseDetails}
          options={{
            headerShown: true,
            title: '',
            headerTransparent: true,
            headerRight: (props) => (
              <Pressable
                style={{ marginRight: 190 }}
                android_ripple={{
                  color: '#666666',
                  foreground: true,
                  borderless: true,
                }}
                onPress={() => {
                  console.log('added to favourite');
                }}
              >
                <Ionicons name="heart" size={35} color="indigo" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen name="TimerScreen" component={TimerScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Favourites') {
              iconName = 'heart';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute', // Keeps the tab bar floating
            borderTopWidth: 0, // Removes border
            elevation: 0, // Removes shadow on Android
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Favourites" component={FavouritesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import { StyleSheet } from 'react-native';
// import HomeScreen from './src/HomeScreen';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import BodyPartExerciseList from './src/Screens/BodyPartExerciseList';
// import './global.css';
// import ExerciseDetails from './src/Screens/ExerciseDetails';
// import TimerScreen from './src/Screens/TimerScreen';
// import { myUseFonts } from './src/useFonts';
// import { useState } from 'react';
// import AppLoading from 'expo-app-loading';
//
// const Stack = createStackNavigator();
//
// export default function App() {
//   const [IsReady, SetIsReady] = useState(false);
//
//   const LoadFonts = async () => {
//     await myUseFonts();
//   };
//
//   if (!IsReady) {
//     return (
//       <AppLoading
//         startAsync={LoadFonts}
//         onFinish={() => SetIsReady(true)}
//         onError={(x) => {
//           console.error(x);
//         }}
//       />
//     );
//   }
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Home"
//         component={HomeScreen}
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen
//           name="BodyPartExerciseList"
//           component={BodyPartExerciseList}
//         />
//         <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
//         <Stack.Screen name="testscreen" component={TimerScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'green',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
