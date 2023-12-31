import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  useColorScheme
} from 'react-native';

const TankSummery = ({ navigation, udata }) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  // console.log('tank summery',typeof(udata))
  const [add, setAdd] = useState(false);
  const [area, setTankArea] = useState('');
  const [fish_type, setTankFishType] = useState('');
  const [capacity, setTankCapacity] = useState('');
  const [no, setNo] = useState('');
  const [tanks, setTanks] = useState([]);
  const fetchData = async(id)=>{
    fetch(`https://biofloc.onrender.com/users_tanks/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setTanks(data);
      // console.log('allt',tanks)
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }
  
  useEffect(() => {
    if (udata && udata.u_id) {
    
      fetchData(udata.u_id)
    }
  }, [udata, tanks]);

  const handleTankClick = (tank) => {
    console.log('clicked');
  };
  const closeButtonClicked = () =>{
    setAdd(!add)
  }
  const saveButtonClicked = (id) => {
    // console.log('clicked')
    const tank = {
      area: area,
      fish_type: fish_type,
      capacity: capacity,
    };
    if (no > 0) {
      for (var i = 0; i < no; i++) {
        fetch(`https://biofloc.onrender.com/tanks_entry/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            area: area,
            fish_type: fish_type,
            capacity: capacity,
            role: 'user',
          }),
        })
          .then(() => {
            console.log('tank added');
            setTanks([...tanks, tank]);
            setAdd(!add);
            setTankArea('');
            setTankFishType('');
            setTankCapacity('');
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      }
    } else {
      fetch(`https://biofloc.onrender.com/tanks_entry/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area: area,
          fish_type: fish_type,
          capacity: capacity,
          role: 'user',
        }),
      })
        .then(() => {
          // console.log('tank added');
          fetchData(id)
          setTanks([...tanks, tank]);
          setAdd(!add);
          setTankArea('');
          setTankFishType('');
          setTankCapacity('');
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  };
  const handlePress = (tank, u_id) => {
    // console.log('tank',tank)
    navigation.navigate('TankUpdates', { tank, u_id });
  };

  const handleAddTank = () => {
    setAdd(true);
  };

  return (
    <SafeAreaView style={isDarkMode?[styles.container, {backgroundColor:'black'}]:styles.container}>
      <ScrollView>
        <View>
          <View style={styles.headingcontainer}>
            <Text style={styles.headertext}>
           Tanks Detail
            </Text>
          </View>

          <View style={styles.showtankcontainer}>
            {add ? (
              <View style={styles.addcontainer}>
                <View>
                  <Text style={{ paddingLeft: 5 }}>Capacity </Text>
                  <TextInput
                    placeholder="E.g 100 ltr"
                    style={styles.textinput}
                    value={area}
                    onChangeText={setTankArea}
                  />
                </View>

                <View>
                  <Text style={{ paddingLeft: 5 }}>Fish Breed </Text>
                  <TextInput
                    placeholder="E.g Talapia"
                    style={styles.textinput}
                    value={fish_type}
                    onChangeText={setTankFishType}
                  />
                </View>

                <View>
                  <Text style={{ paddingLeft: 5 }}>Area of tank </Text>
                  <TextInput
                    placeholder="E.g 30 sqft."
                    style={styles.textinput}
                    value={capacity}
                    onChangeText={setTankCapacity}
                  />
                </View>
                {/* <View>
                  <Text style={{ paddingLeft: 5 }}>Number of tanks</Text>
                  <TextInput
                    placeholder="No of tanks"
                    style={styles.textinput}
                    value={no}
                    onChangeText={setNo}
                  />
                </View> */}

                {area && fish_type && capacity !== null ?<TouchableOpacity
                  style={styles.addbtn}
                  onPress={() => saveButtonClicked(udata.u_id)}
                >
                  <Text style={styles.addbtntext}>Save</Text>
                </TouchableOpacity>:<TouchableOpacity
                  style={styles.addbtn}
                  onPress={() => closeButtonClicked()}
                >
                  <Text style={styles.addbtntext}>Close</Text>
                </TouchableOpacity>}
              </View>
            ) : null}

            {!add ? (
              <TouchableOpacity
                style={isDarkMode?[styles.addbtn,{backgroundColor:'#1cb2b8'}]:styles.addbtn}
                onPress={handleAddTank}
              >
                <Text style={styles.addbtntext}>Add Tank</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.addtankcontainer}>
            <Text style={styles.yourtank_heading}>Your all tanks</Text>
            {tanks.map((tank, index) => (
              <View style={styles.cardcontainer} key={index}>
                <View>
                  <Text style={styles.title}>{tank.area}</Text>
                  <Text style={styles.text}>Fish: {tank.fish_type}</Text>
                  <Text style={styles.text}>Area: {tank.capacity}</Text>
                </View>

                <TouchableOpacity onPress={() => handlePress(tank,udata.u_id)}>
                  <Text style={styles.text}>Update Status</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop:'10%',
  },
  headingcontainer: {},
  headertext: {
    textAlign: 'center',
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    fontSize:20,
    padding:"5%"
    // marginTop:'5%',
  },
  addbtn: {
    backgroundColor: '#0e828c',
    width: 100,
    borderRadius: 5,
    margin: 10,
    alignSelf: 'flex-end',
    
  },
  addbtntext: {
    color: 'white',
    padding: 7,
    textAlign: 'center',
    fontSize:17
  },
  textinput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    margin: 5,
  },
  addcontainer: {
    marginTop: 10,
    flex: 1,
    borderRadius: 1,

    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  cardcontainer: {
    marginHorizontal:'3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2B6780',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white',
  },
  yourtank_heading: {
    fontSize: 19,
    marginHorizontal:'3%',
    marginBottom:'3%',
    fontWeight:'500'
  },
  addtankcontainer: {
    marginTop: 20,
  },
  showtankcontainer: {},
});

export default TankSummery;
