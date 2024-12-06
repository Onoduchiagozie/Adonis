import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

const WelcomeBanner = () => {
  // Load the font using `useFonts`
  const [fontsLoaded] = useFonts({
    DancingScript: require('../../assets/DancingScript-VariableFont_wght.ttf'),
  });

  return (
    <View style={{}}>
      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 20,
          flexDirection: 'row',
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 60,
            fontFamily: 'DancingScript',
            color: 'red',
            marginRight: 130,
            marginTop: 10,
          }}
        >
          Welcome
        </Text>

        <TouchableOpacity style={{ marginTop: 20 }}>
          <Ionicons name="people" size={42} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ marginLeft: 20 }}>
        <TextInput
          placeholder="Search Workout by target muscles"
          style={{
            backgroundColor: 'transparent',
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
