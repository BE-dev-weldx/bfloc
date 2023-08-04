import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TankDetails from './TankDetails'
import UserTank from './UserTank'
const Stack = createNativeStackNavigator();


export default function Details({route}){
  const data = route.params.datas;
  // console.log(data)
  return(
     <Stack.Navigator>
        <Stack.Screen name="UserDetails">
        {(props) => <UserTank {...props} data={data} />}
      </Stack.Screen>
        <Stack.Screen name="TankDetails" component={TankDetails} />
      </Stack.Navigator>
  )
}

