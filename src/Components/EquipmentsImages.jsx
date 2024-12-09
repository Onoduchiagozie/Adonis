import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// const API_KEY = 'FPSX3091bc0cffc149c394a54a3c76414e7d'; // davalchi api key
const API_KEY = 'FPSX24ae06e2383d474d8e618b836b8563c7'; // chiagozie api key
const BASE_URL = 'https://api.freepik.com/v1/ai/text-to-image';

const EquipmentsImages = ({ equip }) => {
  const navigation = useNavigation();
  return (
    <View style={{}} className="rounded-3xl mx-6 h-64 ">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('BodyPartExerciseList', {
            workout: equip,
          })
        }
      >
        <Image
          source={equip.imagePath}
          className="h-44 w-80"
          style={{
            marginTop: 10,
            borderWidth: 5,
            borderRadius: 5,
            resizeMode: 'stretch',
          }}
        />

        <Text
          className="text-center"
          style={{
            marginLeft: 10,
            marginTop: 15,
            fontSize: 24,
            fontFamily: 'MouseMemoir',
          }}
        >
          {equip.name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EquipmentsImages;
