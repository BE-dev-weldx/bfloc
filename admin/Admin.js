import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  useColorScheme
} from "react-native";
import Details from "./UserDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const Announcement = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleInputChange1 = (text) => {
    setTitle(text);
  };

  const handleInputChange2 = (text) => {
    setBody(text);
  };

  const handleSubmit = async() => {
    // Do something with the input values when the button is clicked
    // console.log('Input 1:', input1);
    // console.log('Input 2:', input2);
    // You can perform further actions or send the data to a server here

    try {
      // Prepare the data to be sent in the request body
      const dataToSend = {
        "title":title,
        "content":body,
      };
  
      // Make the POST request using fetch
      const response = await fetch('https://biofloc.onrender.com/notify_multiple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        // The request was successful, do something with the response if needed
        Alert.alert(
          'Sent',
          'Sucessfully notified all users',
          [
            // Define buttons for the alert
            { text: 'OK', onPress: null },
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          ],
          { cancelable: false } // Set to false to prevent tapping outside the alert to dismiss it
        );
      } else {
        // The request was not successful, handle the error
        Alert.alert(
          'Failed',
          'Failed to notify users',
          [
            // Define buttons for the alert
            { text: 'OK', onPress: null },
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          ],
          { cancelable: false } // Set to false to prevent tapping outside the alert to dismiss it
        );
      }
    } catch (error) {
      // Handle any unexpected errors during the request
      console.error('Error during POST request:', error);
    }
  };

  return (
    <View style={isDarkMode?[styles.container, {backgroundColor:'black'}]:styles.container}>
      <Text style={isDarkMode?[styles.txt, {color:"white"}]:styles.txt}>All users will be notified with this Announcement !</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={handleInputChange1}
      />
  <TextInput
        style={styles.textarea} // Use the custom style for the textarea-like behavior
        placeholder="Content"
        multiline={true} // Enable multiple lines
        numberOfLines={4} // Set the initial number of lines (you can adjust this as needed)
        value={body}
        onChangeText={handleInputChange2}
      />
      <Button title="Notify Users" onPress={handleSubmit} />
    </View>
  );
};

const AdminPanel = ({ navigation }) => {

  const colorScheme = useColorScheme()
const isDarkMode = colorScheme === 'dark'
   
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // const credentials = await Keychain.getGenericPassword();

        if (!credentials) {
          // User is not logged in, navigate to Login screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };
    // unsubscribeNotificationOpenedApp()
    // checkLoginStatus();
  }, []);


  const [state, setState] = useState("Odisha");
  const [district, setDistrict] = useState();
  const [pincode, setPincode] = useState("");
  const [block, setBlock] = useState("");
  const [village, setVillage] = useState("");
  const [panchayat, setPanchayat] = useState("");
  const [showd, setShowd] = useState(false);
  const [showb, setShowb] = useState(false);
  const [showp, setShowp] = useState(false);
  const [showv, setShowv] = useState(false);
  const [districtResult, setDistrictResult] = useState([]);
  const [blockResult, setBlockResult] = useState([]);
  const [panchayatResult, setPanchayatResult] = useState([]);
  const [villageResult, setVillageResult] = useState([]);
  const [searchresult, setSresult] = useState([]);
  const [search, setSearch] = useState(true);
  const [tank, setUtank] = useState();
  //suggest toggle
  const [suggest, setSuggest] = useState(false);

  const fetchDistrict = async (district) => {
    try {
      const response = await fetch(
        "https://biofloc.onrender.com/autofil_district",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            district: district,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDistrictResult(data);
        setShowd(true);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchBlock = async (subdistrict) => {
    try {
      const response = await fetch(
        "https://biofloc.onrender.com/autofil_subdistrict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            district: district,
            subdistrict: subdistrict,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBlockResult(data);
        setShowb(true);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchPanchayat = async (panchayat) => {
    try {
      const response = await fetch(
        "https://biofloc.onrender.com/autofil_panchayat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            panchayat: panchayat,
            subdistrict: block,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPanchayatResult(data);
        setShowp(true);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchVillage = async (village) => {
    try {
      const response = await fetch(
        "https://biofloc.onrender.com/autofil_village",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            panchayat: panchayat,
            village: village,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setVillageResult(data);
        setShowv(true);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSearchDistrictChange = (text) => {
    setDistrict(text);
    if (text !== "") {
      setDistrictResult([]) // Reset the result when a district is selected
    }
    fetchDistrict(text);
  };
  const handleSearchBlockChange = (text) => {
    setBlock(text);
    if (text !== "") {
      setBlockResult([]) // Reset the result when a district is selected
    }
    fetchBlock(text);
  };
  const handleSearchPanchayatChange = (text) => {
    setPanchayat(text);
    if (text !== "") {
     setPanchayatResult([]) // Reset the result when a district is selected
    }
    fetchPanchayat(text);
  };
  const handleSearchVillageChange = (text) => {
    setVillage(text);
    if (text !== "") {
      setVillageResult([]) // Reset the result when a district is selected
    }
    fetchVillage(text);
  };

  const clickItemD = (item) => {
    setDistrict(item);
    setShowd(false);
  };
  const clickItemB = (item) => {
    setBlock(item);
    setShowb(false);
  };
  const clickItemP = (item) => {
    setPanchayat(item);
    setShowp(false);
  };
  const clickItemV = (item) => {
    setVillage(item);
    setShowv(false);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://biofloc.onrender.com/regional_data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: state,
            district: district,
            subdistrict: block,
            panchayat: panchayat,
            village: village,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSresult(data);

        setShowv(true);
        setSearch(false);
      } else {
        console.log("Error1:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleUserPress = (user) => {
    // Handle user click event
    console.log("Clicked user:", user);
  };
  const handleUserclick = async (data) => {
    //  console.log('printing id',data)
    try {
      const response = await fetch(
        `https://biofloc.onrender.com/users_tanks/${data}`
      );
      const datas = await response.json();
      setUtank(datas);
      // const abc = {a:"23"}
      // console.log('printing user tank data' ,{})
      navigation.navigate("Userdetails", { datas });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  const handleLogout = async () =>{
    await AsyncStorage.removeItem('logcode')
    navigation.navigate('Login');
  }
  return (
    <View style={isDarkMode?[styles.container, {backgroundColor:'black'}]:styles.container}>
      {search ? (
        <View>
            <TouchableOpacity onPress={handleLogout} style={{marginLeft:'93%'}}>
     <Image source={require('../assets/door.png')} style={styles.img2}/>
    </TouchableOpacity>
          <Text style={isDarkMode? [styles.heading, {color:'white'}]:styles.heading}>Search Farmers</Text>
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            style={styles.input}
            placeholder="District"
            value={district}
            onChangeText={handleSearchDistrictChange}
          />
          {/* Display the filtered districts */}
          {showd === true ? (
            <View>
              <FlatList
                data={districtResult}
                keyExtractor={(item, index) => `district_${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => clickItemD(item)}>
                    <Text style={{ paddingLeft: "5%", paddingBottom: "3%" }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                // style={{ maxHeight: item.length * 30 }} // Adjust the item height as needed (e.g., 30)
              />
            </View>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Block"
            value={block}
            onChangeText={handleSearchBlockChange}
          />
          {showb === true ? (
            <View>
              <FlatList
                data={blockResult}
                keyExtractor={(item, index) => `block_${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => clickItemB(item)}>
                    <Text style={{ paddingLeft: "5%", paddingBottom: "3%" }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                // style={{ maxHeight: result.length * 30 }} // Adjust the item height as needed (e.g., 30)
              />
            </View>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Panchayat"
            value={panchayat}
            onChangeText={handleSearchPanchayatChange}
          />
          {showp === true ? (
            <View>
              <FlatList
                data={panchayatResult}
                keyExtractor={(item, index) => `panchayat_${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => clickItemP(item)}>
                    <Text style={{ paddingLeft: "5%", paddingBottom: "3%" }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                // style={{ maxHeight: result.length * 30 }} // Adjust the item height as needed (e.g., 30)
              />
            </View>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Village"
            value={village}
            onChangeText={handleSearchVillageChange}
          />
          {showv === true ? (
            <View>
              <FlatList
                data={villageResult}
                keyExtractor={(item, index) => `village_${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => clickItemV(item)}>
                    <Text style={{ paddingLeft: "5%", paddingBottom: "3%" }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                // style={{ maxHeight: result.length * 30 }} // Adjust the item height as needed (e.g., 30)
              />
            </View>
          ) : null}
     <TouchableOpacity onPress={handleSearch} style={styles.button}>
      <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
     <TouchableOpacity onPress={()=>{navigation.navigate('Announcement')}} style={styles.button2}>
     {/* <Image source={require('../assets/alarm.png')} style={styles.img}/> */}
     <Text style={styles.ntext}>Announce</Text>
    </TouchableOpacity>

        </View>
      ) : (
        ""
      )}

      {!search ? (
        <View
          style={{
            marginVertical: 20,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View style={isDarkMode?[styles.infoBox, {backgroundColor:'black', borderWidth:2, borderColor:'white'}]:styles.infoBox}>
            <View>
            <Text style={styles.infoText}>Dist: {district}</Text>
            <Text style={styles.infoText}>Block: {block}</Text>
            </View>
            <View>
            <Text style={styles.infoText}>Panchayat: {panchayat}</Text>
            <Text style={styles.infoText}>Village: {village}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              setSearch(true);
            }}
            style={isDarkMode?[styles.searchAgainButton,{backgroundColor:'black', paddingHorizontal:0}]:styles.searchAgainButton}
          >
           
            <Text style={isDarkMode ? [styles.searchAgainButtonText, {color:'#61c2ff'}]:styles.searchAgainButtonText}>Search Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        ""
      )}
      {searchresult.length > 0 && search===false? (
        <View>
          <Text
            style={isDarkMode?{
              paddingVertical: 7,
              paddingHorizontal: 5,
              backgroundColor: "#7ce643",
              fontSize: 18,
              borderRadius: 5,
              color:'black'
              
            }:{
              paddingVertical: 7,
              paddingHorizontal: 5,
              backgroundColor: "lightgreen",
              fontSize: 18,
              borderRadius: 5
            }}
          >
            List of Farmers
          </Text>
          
          <FlatList
            data={searchresult}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => handleUserclick(item.u_id)}
                style={{ marginTop: 5, paddingHorizontal: 5 }}
              >
                <Text>{item.first_name + " " + item.last_name}</Text>
              </TouchableOpacity>
               </ScrollView>
            )}
          />
         
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

export default function Admin({navigation}) {


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();

        if (!credentials) {
          // User is not logged in, navigate to Login screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    // checkLoginStatus();
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Adminpanel"
        component={AdminPanel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Userdetails"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announcement"
        component={Announcement}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "3%",
    paddingHorizontal: "3%",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  infoBox: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  searchAgainButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 5,
    height: 30,
    // color:'black'
  },
  searchAgainButtonText: {
    fontSize: 15,
    color: "black",
    marginLeft: '73%',
  },

  button: {
    backgroundColor: '#4287f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  button2: {
    // display:'flex',
    // flex:1,
    backgroundColor: '#fc5a03',
    alignItems: 'center',
    justifyContent: "space-between",
    marginTop:'53%',
    // borderWidth:2,
    // borderColor:'red',
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 25,
    width:100,
    height:40,
    marginLeft:'74%'
    
  },
  ntext:{
    fontSize:15,
    fontWeight:'600',
    color:'white',
    textAlign:'center'
  },
  button3: {
    backgroundColor: '#fc5a03',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop:'0%',
    // borderWidth:2,
    // borderColor:'red',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // marginBottom:'60%',
    borderRadius: 25,
    width:50,
    height:50,
    // marginLeft:'87%'
    
  },
  img:{
height:23,
width:22
  },
  img2:{
    height:26,
    width:26
      },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonText2: {
    color: 'white',
    fontSize: 16,
    marginTop:'30%'
  },
  textarea: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    // Set the following two properties for the textarea-like behavior
    height: 100, // Set the initial height
    textAlignVertical: 'top', // Place the text at the top
  },
  txt:{
    fontSize:16,
    fontWeight:'900',
    paddingVertical: 10,
    color: 'black'
  }
});
