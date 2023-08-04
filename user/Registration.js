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
} from 'react-native';
// import {} from

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import 'react-phone-number-input/style.css'

const Registration = ({navigation}) => {
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
  const [subdistrict, setSubdistrict] = useState("");
  const [village, setVillage] = useState("");
  const [panchayat, setPanchayat] = useState("");

  const r = [];

  const fetchCountries = async (district) => {
    try {
      const response = await fetch('https://biofloc.onrender.com/autofil_district', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            "district": district,
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

  const fetchCountries2 = async (subdistrict) => {
    try {
      const response = await fetch('https://biofloc.onrender.com/autofil_subdistrict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            "district": district,
            "subdistrict": subdistrict,
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

  const fetchCountries3 = async (village) => {
  try {
      const response = await fetch('https://biofloc.onrender.com/autofil_village', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            "subdistrict": subdistrict,
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

  const fetchCountries4 = async (panchayat) => {
    // console.log(panchayat)
  try {
      const response = await fetch('https://biofloc.onrender.com/autofil_panchayat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            "subdistrict": subdistrict,
            "panchayat": panchayat,
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
  
  const handleSearchTextChange = (text) => {
    setDistrict(text);
    fetchCountries(text); // Call the fetch function whenever the text changes
  };

  const handleSearchTextChange2 = (text) => {
    setSubdistrict(text);
    fetchCountries2(text, district); // Call the fetch function whenever the text changes
  };

  const handleSearchTextChange3 = (text) => {
    setVillage(text);
    // fetchCountries3(text, subdistrict); // Call the fetch function whenever the text changes
  };

  const handleSearchTextChange4 = (text) => {
    setPanchayat(text);
    fetchCountries4(text, village); // Call the fetch function whenever the text changes
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
        "block": subdistrict,
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
    <View style={styles.container}>
      <Text style={styles.header}>Registration</Text>
      <KeyboardAwareScrollView>
        <View style={styles.inner}>
          <View style={styles.btnContainer}>
            <TextInput placeholder="First name" style={styles.textInput} onChangeText={setF_name} value={f_name} />
            <TextInput placeholder="Last name" style={styles.textInput} onChangeText={setL_name} value={l_name} />
            <TextInput
              placeholder="Phone"
              style={styles.textInput}
              onChangeText={setPhone} value={phone}
            />
            <TextInput placeholder="State" style={styles.textInput} onChangeText={setState} value={state} />
            <TextInput placeholder="District" style={styles.textInput} onChangeText={handleSearchTextChange} value={district} />
            <TextInput placeholder="Block" style={styles.textInput} onChangeText={handleSearchTextChange2} value={subdistrict}/>
            <TextInput placeholder="Panchayat" style={styles.textInput} onChangeText={handleSearchTextChange4} value={panchayat}/>
            <TextInput placeholder="Village" style={styles.textInput} onChangeText={handleSearchTextChange3} value={village} />
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
              <Text style={{fontSize:16,color:'blue', marginVertical:5,}}>
                login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    paddingTop:'10%',
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
    borderColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor:'#A2A2A2',
    marginBottom: 23,
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
    marginTop: 12,
  },
  passwd: {
    marginBottom: 5,
  },
});

export default Registration;
