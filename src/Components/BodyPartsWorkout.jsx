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
        className="font-semibold underline"
        style={{ fontSize: 30, marginTop: 20, marginLeft: 25 }}
      >
        Body-Parts-list
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          flexWrap: 'wrap',
        }}
      >
        <FlatList
          data={BodyParts}
          keyExtractor={(name) => name.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
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
