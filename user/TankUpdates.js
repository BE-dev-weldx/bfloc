import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Camera from './Camera.js'
const TankUpdates = ({ route, navigation }) => {
  const { tank } = route.params;

  const [updates, setUpdates] = useState([]);
  const [textUpdate, setTextUpdate] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    fetchPreviousUpdates(tank.u_id, tank.tank_id);
  }, []);

  const fetchPreviousUpdates = async (u_id, tank_id) => {
    try {
      const response = await fetch(`https://biofloc.onrender.com/past_updates/${u_id}/${tank_id}`);
      const data = await response.json();
      setUpdates(data);
    } catch (error) {
      console.log('Error fetching previous updates:', error);
    }
  };

  const handleTextUpdate = async (u_id, tank_id) => {
    if (textUpdate.trim() === '') {
      return;
    }

    try {
      await fetch(`https://biofloc.onrender.com/new_data/${u_id}/${tank_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ txt_input: textUpdate, role: 'user' }),
      });

      const newUpdate = { txt_input: textUpdate, dates: new Date().toISOString() };
      setUpdates([newUpdate, ...updates]);

      setTextUpdate('');
    } catch (error) {
      console.log('Error saving update:', error);
    }
  };

  const goCam = (tank) => {
   navigation.navigate('Camera',{tank})
  };

  return (

    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.subtitle}>{tank.area}</Text>
        <Text style={styles.title}>{tank.fish_type}</Text>
        <Text style={styles.subtitle}>{tank.capacity}</Text>
      </View>
      <ScrollView>
        <View style={styles.previousUpdates}>
          <Text style={styles.previousUpdatesTitle}>Previous Updates:</Text>
          {updates ? updates.map((update, index) => (
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
          )):<View style={styles.noupdate}><Text>No Previous Updates</Text></View>}
        </View>
      </ScrollView>
      <View style={styles.updateContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a text update"
          value={textUpdate}
          onChangeText={setTextUpdate}
        />
      <View style={styles.ct}>
  <TouchableOpacity style={[styles.button, styles.cameraButton]} onPress={()=>goCam(tank)}>
    <Text style={styles.buttonText}>Capture</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.button, styles.textUpdateButton]} onPress={() => handleTextUpdate(tank.u_id, tank.tank_id)}>
    <Text style={styles.buttonText}>Add Text Update</Text>
  </TouchableOpacity>
</View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:'10%',
    backgroundColor: 'white',
    paddingHorizontal:'3%'
    
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor:'skyblue',
    borderRadius:5,
    marginTop:7,
    height:50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign:'center'
  },
  subtitle: {
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  updateContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 8,
  },
  previousUpdates: {
    marginTop: 32,
  },
  previousUpdatesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  updateItem: {
    marginBottom: 16,
  },
  updateText: {
    fontSize: 16,
    marginBottom: 4,
  },
  updateDate: {
    fontSize: 12,
    color: 'gray',
  },
  updateImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  noupdate:{
    justifyContent:'center',
    alignContent:'center',
  },
  ct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    marginRight: 8,
    backgroundColor: 'blue',
  },
  textUpdateButton: {
    marginLeft: 8,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TankUpdates;
