import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Equipments } from '../Constants';
import EquipmentsImages from './EquipmentsImages';
import { useFonts } from 'expo-font';

const ExerciseCategory = () => {
  const [fontsLoaded] = useFonts({
    DancingScript: require('../../assets/DancingScript-VariableFont_wght.ttf'),
    MouseMemoir: require('../../assets/MouseMemoirs-Regular.ttf'),
  });
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 40,
      }}
    >
      {/*<Text*/}
      {/*  style={{*/}
      {/*    marginVertical: 15,*/}
      {/*    fontSize: 30,*/}
      {/*    marginLeft: 10,*/}
      {/*  }}*/}
      {/*  className=""*/}
      {/*>*/}
      {/*  Choose Equipment*/}
      {/*</Text>*/}

      <Text
        className=" italic"
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          marginLeft: 20,
          marginBottom: 10,
        }}
      >
        Choose
        <Text style={{ color: 'red' }}> Equipment </Text>
      </Text>
      <FlatList
        data={Equipments}
        keyExtractor={(item) => item.id || item.name}
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
