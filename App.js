import { Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import './global.css';
import HomeScreen from './src/HomeScreen';

import ExerciseDetails from './src/Screens/ExerciseDetails';
import TimerScreen from './src/Screens/TimerScreen';
import ProfileScreen from './src/Screens/ProfileScreen'; // Create this screen
import { Ionicons } from '@expo/vector-icons'; // For tab icons
import AuthScreen from './src/Screens/AuthScreen';
import { UserProvider } from './src/UserContext';
import { BodyPartExerciseList } from './src/Screens/BodyPartExerciseList';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // Stack Navigator for the Home Tab
  function HomeStack() {
    return (
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerShown: false,
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
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <UserProvider>
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
          <Tab.Screen name="Favourites" component={AuthScreen} />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              // tabBarBadge: user.count > 0 ? user.count : null, // Show badge if count > 0
              tabBarBadgeStyle: { backgroundColor: 'red', color: 'white' }, // Customize badge
            }}
          />
        </Tab.Navigator>
      </UserProvider>
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
