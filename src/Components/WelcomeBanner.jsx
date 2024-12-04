import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

const WelcomeBanner = () => {
  // Load the font using `useFonts`
  const [fontsLoaded] = useFonts({
    DancingScript: require('../../assets/DancingScript-VariableFont_wght.ttf'), // Match the font name with the alias
  });

  return (
    <View>
      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 20,
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            fontSize: 60,
            fontFamily: 'DancingScript',
            color: 'red',
            marginRight: 70,
            marginTop: 10,

            // Use the loaded font
          }}
        >
          Welcome
        </Text>

        <TouchableOpacity style={{ marginTop: 20 }}>
          <Ionicons name="people" size={42} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          placeholder="Search Workout by target musclessssss"
          style={{
            backgroundColor: 'red',
            height: 50,
            width: 300,
            borderWidth: 5,
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );
};

export default WelcomeBanner;
