import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView,  Image, useColorScheme} from 'react-native';

export default function TankDetails({ route }) {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme==='dark'
  const [data, setData] = useState([]);
  const tank = route.params.tank;
  // console.log(tank)
  const idata = route.params.data;

  useEffect(() => {
    setData(idata);
  }, [idata]);

  return (
    <View style={isDarkMode?[styles.container, {backgroundColor:'black'}]:styles.container}>
      <Text style={styles.heading}>Tank Status Updates</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tank ID:</Text>
        <Text style={styles.value}>{tank.tank_id}</Text>
        <Text style={styles.label}>Fish breed:</Text>
        <Text style={styles.value}>{tank.fish_type}</Text>
      </View>
     
      <ScrollView style={styles.textUpdatesContainer}>
      {/* <Text style={{fontSize:20,marginBottom:8}}>Updates</Text> */}
      {data ? data.map((update, index) => (
            <View key={index} style={styles.updateItem}>
              {update.txt_input && (
                <Text style={styles.updateText}>{update.txt_input}</Text>
              )}
              {update.picture && (
                <View>
                  <Image source={{ uri: update.picture }} style={styles.updateImage} />
                </View>
              )}
              <Text style={styles.updateDate}>
                {new Date(update.dates).toLocaleString()}
              </Text>
            </View>
          )):<View style={isDarkMode?{}:{}}><Text style={isDarkMode?{color:'white'}:{color:'black'}}>No Previous Updates</Text></View>}
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    marginVertical: 20 ,
    width:'auto',
   
    borderBottomWidth:1,
    borderBottomColor:'white',
  },
  label: {
    fontSize:20,
    fontWeight: '600',
    marginRight: 10,
    marginBottom:10
  },
  value: {
    flex: 1,
    fontSize:20
  },
  textUpdatesContainer: {
    marginTop: 0,
    
  },
   updateItem: {
    marginBottom: 16,
  },
  textUpdateContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  textUpdate: {
    fontSize: 16,
    marginBottom: 5,
  },
    updateText: {
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
    updateImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
    updateDate: {
    fontSize: 12,
    color: 'gray',
  },
});
