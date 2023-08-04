import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import TankDetails from './TankDetails';

export default function UserDetails({ navigation, route, data }) {
  // console.log('user tanks', data)
  const [tanks, setTanks] = useState([]);
  const [tdetails, setTdetails] = useState([]);

  useEffect(() => {
    if (data) {
      setTanks(data);
    }
  }, [data]);
  useEffect(() => {
    if (tdetails.length > 0) {
     
    }
  }, [tdetails]);



const handleTankPress = async (tank) => {
    console.log(tank.tank_id);
    try {
      const response = await fetch(
        `https://biofloc.onrender.com/data_tank_id/${tank.tank_id}`
      );
      const data = await response.json();

      navigation.navigate('TankDetails',{tank, data})
      setTdetails(data);
    } catch (error) {
      console.log(error);
    }

   
  };


  return (
    <View style={styles.container}>
       <ScrollView showsVerticalScrollIndicator={false}>
      {tanks.length > 0 ? tanks.map((tank) => (
       
        <TouchableOpacity
          key={tank.tank_id}
          onPress={() => handleTankPress(tank)}
          style={styles.tankContainer}>
          <View style={styles.propertyContainer}>
            <Text style={styles.propertyLabel}>Tank ID:</Text>
            <Text style={styles.propertyValue}>{tank.tank_id}</Text>
          </View>
          <View style={styles.propertyContainer}>
            <Text style={styles.propertyLabel}>Fish:</Text>
            <Text style={styles.propertyValue}>{tank.fish_type}</Text>
          </View>
          <View style={styles.propertyContainer}>
            <Text style={styles.propertyLabel}>Area:</Text>
            <Text style={styles.propertyValue}>{tank.area}</Text>
          </View>
        </TouchableOpacity>
      
      )) :''}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white',
  },
  tankContainer: {
    marginBottom: 10,
    backgroundColor: '#EFEFEF',
    padding: 10,
    borderRadius: 5,
  },
  propertyContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  propertyLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  propertyValue: {
    flex: 1,
  },
});
