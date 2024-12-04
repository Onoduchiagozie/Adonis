import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Equipments } from '../Constants';
import MyImageViewer from './MyImageViewer';

const ExerciseCategory = () => {
  return (
    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
      <Text
        style={{ marginVertical: 10, fontSize: 30, marginLeft: 10 }}
        className="font-thin"
      >
        Choose-Equipment
      </Text>
      <FlatList
        data={Equipments}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View className="">
              <View className="rounded-l-xl mx-6 h-80">
                <MyImageViewer
                  name={item}
                  prompt={'Gym Workout Equipment' + item}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ExerciseCategory;
