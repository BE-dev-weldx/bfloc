import React, { useState, useRef } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  TouchableOpacity,
  CheckBox,
  FlatList,
  useColorScheme,
  Platform,
} from 'react-native';
// import {} from

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import 'react-phone-number-input/style.css'

const Registration = ({navigation}) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [at, setAt] = useState("");
  const [state, setState] = useState("Odisha");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [block, setBlock] = useState("");
  // const [block, setBlock] = useState("");
  const [village, setVillage] = useState("");
  const [panchayat, setPanchayat] = useState("");
  const [districtResult, setDistrictResult] = useState([]);
  const [blockResult, setBlockResult] = useState([]);
  const [panchayatResult, setPanchayatResult] = useState([]);
  const [villageResult, setVillageResult] = useState([]);
  const [showd, setShowd] = useState(false);
  const [showb, setShowb] = useState(false);
  const [showp, setShowp] = useState(false);
  const [showv, setShowv] = useState(false);
  const r = [];
  
  const fetchDistrict = async (district) => {
    console.log('instant run')
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
        // console.log(data,'district')
        setDistrictResult(data);
        setShowd(true);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchBlock = async (block) => {
    // console.log('instant run2')
    // console.log(district)
    try {
      const response = await fetch(
        "https://biofloc.onrender.com/autofil_block",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            district: district,
            block: block,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        setBlockResult(data);
        setShowb(true);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchCountries3 = async (village) => {
  try {
      const response = await fetch('https://biofloc.onrender.com/autofil_village', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            "block": block,
            "village": village,
         }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Process the fetched countries data
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
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
            block: block,
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

  const submitButtonClicked = () =>{
   console.log(village)
    fetch('https://biofloc.onrender.com/create_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "f_name": f_name,
        "l_name": l_name,
        "phone": phone,
        "pwd": password,
        "state": state,
        "district": district,
        "block": block,
        "panchayat": panchayat,
        "village": village,
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

      navigation.navigate('Login')
  }

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : null}
  >
    <FlatList
    style={isDarkMode ? [styles.container, {backgroundColor:'black'}] : styles.container}
    data={[{ key: 'registration' }]}
    renderItem={() => (
    <View >
     
      <Text style={styles.header}>Registration</Text>
      
        <View style={styles.inner}>
          <View style={isDarkMode ?[styles.btnContainer, {backgroundColor:'black'}] :styles.btnContainer}>
            <TextInput placeholder="First name" style={styles.textInput} onChangeText={setF_name} value={f_name} />
            <TextInput placeholder="Last name" style={styles.textInput} onChangeText={setL_name} value={l_name} />
            <TextInput
              placeholder="Phone"
              style={styles.textInput}
              onChangeText={setPhone} value={phone}
            />
            <TextInput placeholder="State" style={styles.textInput} onChangeText={setState} value={state} />
            <TextInput
            style={styles.input}
            placeholder="District"
            value={district}
            onChangeText={handleSearchDistrictChange}
          />
          {/* Display the filtered districts */}
          {showd === true ? (
         
              <FlatList
                data={districtResult}
                keyExtractor={(item, index) => `district_${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => clickItemD(item)}>
                    <Text style={styles.textInput}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                // style={{ maxHeight: item.length * 30 }} // Adjust the item height as needed (e.g., 30)
              />
          
          ) : null}

             <TextInput
            style={styles.input}
            placeholder="Block"
            value={block}
            onChangeText={handleSearchBlockChange}
          />
          {showb === true ? (
         
              <FlatList
                data={blockResult}
                keyExtractor={(item, index) => `block_${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => clickItemB(item)}>
                    <Text style={styles.textInput}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                // style={{ maxHeight: result.length * 30 }} // Adjust the item height as needed (e.g., 30)
              />
         
          ) : null}


           <TextInput
            style={styles.input}
            placeholder="Panchayat"
            value={panchayat}
            onChangeText={handleSearchPanchayatChange}
          />
          {showp === true ? (
      
              <FlatList
                data={panchayatResult}
                keyExtractor={(item, index) => `panchayat_${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => clickItemP(item)}>
                    <Text style={styles.textInput}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                // style={{ maxHeight: result.length * 30 }} // Adjust the item height as needed (e.g., 30)
              />
          
          ) : null}

           <TextInput
            style={styles.input}
            placeholder="Village"
            value={village}
            onChangeText={handleSearchVillageChange}
          />
          {showv === true ? (
      
              <FlatList
                data={villageResult}
                keyExtractor={(item, index) => `village_${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => clickItemV(item)}>
                    <Text style={styles.textInput}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                // style={{ maxHeight: result.length * 30 }} // Adjust the item height as needed (e.g., 30)
              />
       
          ) : null}
            <TextInput placeholder="Pincode" style={styles.textInput} onChangeText={setPincode} value={pincode} />
            {showPassword ? (
              <TextInput
                placeholder="Password"
                style={[styles.textInput, styles.passwd]}
                value={password}
                onChangeText={setPassword}
              />
            ) : (
              <TextInput
                placeholder="Password"
                style={[styles.textInput, styles.passwd]}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            )}
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={toggleShowPassword}>
              <Text
                style={
                  showPassword
                    ? styles.showPasswordButtonText
                    : styles.hidePasswordButtonText
                }>
                {showPassword ? 'Hide' : 'Show'} Password
              </Text>
            </TouchableOpacity>
            <Button title="Submit" onPress={submitButtonClicked} />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={()=>{navigation.navigate('Login')}}>
              <Text style={isDarkMode?[styles.loginbtn, {color:'#57d100'}]:styles.loginbtn}>
                login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      
    </View>
       )}
       />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    paddingTop:'5%',
  },
  inner: {
    marginHorizontal:20,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 25,
    alignSelf: 'center',
  },
  textInput: {
    height: 35,
    // borderColor: '#000000',
    // borderBottomWidth: 1,
    // borderBottomColor:'#A2A2A2',
    marginBottom: 15,
    paddingLeft: 2,
  },
  showPasswordButton: {
    // marginTop:10,
    marginBottom: 15,
    alignSelf: 'flex-end',
  },
  showPasswordButtonText: {
    color: '#4E4E4E',
  },
  hidePasswordButtonText: {
    color: 'gray',
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 16,
  },
  passwd: {
    marginBottom: 5,
  },
  loginbtn:{fontSize:18,color:'blue', marginVertical:5,}
});

export default Registration;
