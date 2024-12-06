import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { restaurants } from '../Constants';
import { useNavigation } from '@react-navigation/native';

const BodyPartExerciseList = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={{ marginTop: 30 }} className="mt-6">
        <Image
          source={require('../../assets/224.jpg')}
          style={{ margin: 10, width: '95%', height: '25%', borderRadius: 10 }}
        />
        <Text style={{ fontSize: 30, marginTop: 20, marginLeft: 20 }}>
          API Gotten Exercises list range
        </Text>

        <FlatList
          data={restaurants}
          keyExtractor={(name) => name}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                className=""
                onPress={() => navigation.navigate('ExerciseDetails')}
              >
                <Image
                  source={require('../../assets/224.jpg')}
                  resizeMode="cover"
                  style={{
                    borderWidth: 2,
                    borderColor: 'rgba(255,255,255,0.64)',
                    height: 250,
                    width: 160,
                    borderRadius: 10, // Circular shape
                    marginTop: 20,
                    marginHorizontal: 20,
                  }}
                />
                <Text style={{ marginHorizontal: 30 }}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default BodyPartExerciseList;

// //PAGE FOR RENDERING CHOSEN  EXERCISE  CATEGORY TYPES
//
// import React, { useState } from 'react';
// import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
// import { restaurants, ExcerciseDB_API_KEY } from '../Constants';
// import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'react-native-virtualized-view';
// import axios from 'axios';
//
// const BodyPartExerciseList = ({ route }) => {
//   const [gottenWorkout, setGottenWorkout] = useState([]);
//
//   const { workout } = route.params;
//
//   const navigation = useNavigation();
//
//   const options = {
//     method: 'GET',
//     url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${workout.name}`,
//     params: {
//       limit: '15',
//       offset: '0',
//     },
//     headers: {
//       'x-rapidapi-key': ExcerciseDB_API_KEY,
//       'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
//     },
//   };
//
//   try {
//     const response = axios.request(options);
//
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
//
//   return (
//     <ScrollView>
//       <View
//         style={{ marginTop: 30, backgroundColor: 'green' }}
//         className="mt-6"
//       >
//         <Image
//           source={workout.imagePath}
//           style={{
//             margin: 10,
//             width: '95%',
//             height: '10%',
//             borderRadius: 10,
//             resizeMode: 'stretch',
//           }}
//         />
//         <Text style={{ fontSize: 30, marginVertical: 20, marginLeft: 20 }}>
//           {workout.name} Workouts
//         </Text>
//
//         <FlatList
//           data={gottenWorkout}
//           keyExtractor={(item) => item.name}
//           numColumns={2}
//           renderItem={({ item }) => {
//             return (
//               <TouchableOpacity
//                 className=""
//                 onPress={() => navigation.navigate('ExerciseDetails')}
//               >
//                 <Image
//                   source={require('../../assets/224.jpg')}
//                   resizeMode="cover"
//                   style={{
//                     borderWidth: 2,
//                     borderColor: 'rgba(255,255,255,0.64)',
//                     height: 250,
//                     width: 160,
//                     borderRadius: 10, // Circular shape
//                     marginTop: 20,
//                     marginHorizontal: 20,
//                   }}
//                 />
//                 <Text style={{ marginHorizontal: 30 }}>{item.name}</Text>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       </View>
//     </ScrollView>
//   );
// };
//
// export default BodyPartExerciseList;
