import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TankSummery from './TankSummery';
import TankUpdates from './TankUpdates';
import Camera from './Camera'
const Stack = createNativeStackNavigator()

const TankDetails = ({ udata }) => {
  // console.log('td', udata)
  return (
    <Stack.Navigator>
      <Stack.Screen name='TankSummery' options={{headerShown:false}}>
        {(props) => <TankSummery {...props} udata={udata} />}
      </Stack.Screen>
      <Stack.Screen name='TankUpdates' component={TankUpdates} options={{headerShown:false}}/>
      <Stack.Screen name='Camera' component={Camera} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({})

export default TankDetails;
