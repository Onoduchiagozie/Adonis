import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Equipments } from '../Constants';
import EquipmentsImages from './EquipmentsImages';

const ExerciseCategory = () => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 20,

        marginBottom: 40,
      }}
    >
      <Text
        style={{ marginVertical: 15, fontSize: 30, marginLeft: 10 }}
        className="font-thin"
      >
        Choose Equipment
      </Text>
      <FlatList
        data={Equipments}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <EquipmentsImages equip={item} />;
        }}
      />
    </View>
  );
};

export default ExerciseCategory;
