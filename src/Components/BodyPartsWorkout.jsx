import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { BodyParts } from '../Constants';
import { useNavigation } from '@react-navigation/native';

import BodyPartsImages from './BodyPartsImages';

const BodyPartsWorkout = ({}) => {
  const navigation = useNavigation();
  return (
    <View className="" style={{}}>
      <Text
        className=" text-center  italic"
        style={{ fontSize: 30, fontWeight: 'bold' }}
      >
        Body
        <Text style={{ color: 'red' }}> Workout </Text>
      </Text>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          paddingBottom: 100,
        }}
      >
        <FlatList
          data={BodyParts}
          keyExtractor={(item) => item.id || item.name}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{}}
          style={{ marginBottom: 50 }}
          renderItem={({ item }) => {
            return <BodyPartsImages givenImage={item} />;
          }}
        />
      </View>
    </View>
  );
};

export default BodyPartsWorkout;
