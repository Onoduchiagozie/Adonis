import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BodyPartsImages = ({ givenImage }) => {
  const navigation = useNavigation();

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('BodyPartExerciseList', {
            workout: givenImage,
          })
        }
      >
        <Image
          source={givenImage.imagePath}
          className=" h-52 w-44"
          style={{
            resizeMode: 'stretch',
            backgroundColor: 'transparent',
            borderWidth: 5,
            borderRadius: 5,
            marginTop: 20,
            marginHorizontal: 25,
          }}
        />

        <Text
          style={{
            fontFamily: 'MouseMemoir',
            fontSize: 24,
          }}
          className="text-center "
        >
          {givenImage.name
            .split(' ') // Split into words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' ')}{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BodyPartsImages;
