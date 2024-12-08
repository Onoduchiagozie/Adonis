import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { BodyParts } from '../Constants';
import { useNavigation } from '@react-navigation/native';

import BodyPartsImages from './BodyPartsImages';

const BodyPartsWorkout = ({}) => {
  const navigation = useNavigation();
  return (
    <View className="" style={{}}>
      <Text className=" text-center font-thin" style={{ fontSize: 30 }}>
        Body Workout
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <FlatList
          data={BodyParts}
          keyExtractor={(item) => item.id || item.name}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{}}
          renderItem={({ item }) => {
            return <BodyPartsImages givenImage={item} />;
          }}
        />
      </View>
    </View>
  );
};

export default BodyPartsWorkout;
