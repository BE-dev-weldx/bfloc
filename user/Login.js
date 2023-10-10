import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  useColorScheme
} from 'react-native';
import Modal from 'react-native-modal';

import Notification from './Notification';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const colorScheme = useColorScheme(); // Get the color scheme (light or dark)
  // console.log(colorScheme)
  const isDarkMode = colorScheme === 'dark';
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fcm1, setFcm1] = useState();
  const [fcm2, setFcm2] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getFCMToken() {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    setFcm1(fcmtoken);

    if (!fcmtoken) {
      let fcmtoken = await messaging().getToken();
      console.log(fcmtoken)
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
        setFcm2(fcmtoken);
      }
    }
  }

  useEffect(() => {
    const checkCredentials = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        if (username && password) {
          // Perform automatic login using stored credentials
          loginWithCred(username, password);
        }
      } catch (error) {
        console.log("AsyncStorage couldn't be accessed!", error);
      }
    };

    // checkCredentials();
    getFCMToken();
  }, []);

  const loginWithCred = async (phone, password) => {
    setIsLoading(true); // Start loading

    fetch('https://biofloc.onrender.com/login2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        pwd: password,
        fcmtoken: fcm1,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data !== 'invalid credentials !') {
          // await AsyncStorage.setItem('username', data.phone);
          // await AsyncStorage.setItem('password', data.passwords);
          // await AsyncStorage.setItem('logcode',data.phone+data.passwords)
          // await AsyncStorage.setItem('udata',JSON.stringify(data))

          if (data.roles !== null && data.roles === 'user') {
            await AsyncStorage.setItem('logcode',data.phone+data.passwords+data.roles)
            await AsyncStorage.setItem('udata',JSON.stringify(data))
  
            navigation.navigate('Dashboard', { data });
            // console.log('dashboard'+data)
          } else if (data.ac_role !== null && data.ac_role === 'admin') {
            await AsyncStorage.setItem('logcode',data.phone+data.passwords+data.ac_role)
            // await AsyncStorage.setItem('udata',JSON.stringify(data))
  
            navigation.navigate('Admin');
          }
        } else {
          Alert.alert(
            'Login Failed!',
            'Please login with valid credentials',
            [
              {
                text: 'Ok',
              },
            ],
            {
              cancelable: true,
            },
          );
        }

        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false); // Stop loading
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registerButtonClicked = () => {
    navigation.navigate('Register');
  };

  const loginBtnClicked = () => {
    loginWithCred(phone, password);
  };

  const notWorking = () => {
    navigation.navigate('Forget');
  };

  return (
    <View style={isDarkMode ? [styles.container, {backgroundColor:'black'}] : styles.container}>
      <View style={styles.logincontainer}>
        <Text style={styles.heading}>Biofloc  Monitoring</Text>
        <TextInput
          placeholder="Phone no"
          style={isDarkMode ?   styles.textinput_d : styles.textinput }
          value={phone}
          onChangeText={setPhone}
        />

        {showPassword ? (
          <TextInput
            placeholder="Password"
           style={isDarkMode ?   styles.textinput_d : styles.textinput }
            value={password}
            onChangeText={setPassword}
          />
        ) : (
          <TextInput
            placeholder="Password"
           style={isDarkMode ?   styles.textinput_d : styles.textinput }
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        )}
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={toggleShowPassword}
        >
          <Text
            style={
              showPassword ? styles.showPasswordButtonText : styles.hidePasswordButtonText
            }
          >
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginbtn}
          onPress={loginBtnClicked}
          disabled={isLoading} // Disable the button while loading
        >
          <Text style={styles.logintxt}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signup_forget}>
          {/* <TouchableOpacity style={styles.forgetbtn} onPress={notWorking}>
            <Text style={isDarkMode ? [styles.fg_re_txt, {color:'white'}] : styles.fg_re_txt}>Forgot password</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.forgetbtn} onPress={registerButtonClicked}>
            <Text style={isDarkMode ? [styles.fg_re_txt, {color:'white'}] : styles.fg_re_txt}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Indicator */}
      <Modal isVisible={isLoading} backdropOpacity={0.5}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="white" size="large" />
          <Text style={styles.loadingText}>Logging In...</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingVertical: '20%',
   
  },
  // container_d: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   backgroundColor: 'black',
  //   paddingVertical: '20%',
   
  // },
  heading:{
    textAlign:'center',
    fontSize:20,
    marginBottom:'20%'
  },
  textinput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    marginHorizontal: '5%',
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    color: 'black', // Text color for light mode
  },
  textinput_d: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    marginHorizontal: '5%',
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#333333',
    color: 'white', // Text color for dark mode
  },
  loginbtn: {
    backgroundColor: 'green',
    height: 45,
    marginHorizontal: '30%',
    // width:60,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center'

  },
  logintxt: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  signup_forget: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    marginHorizontal: '7%',
  },
  forgetbtn: {
    height: 40,
    backgroundColor: 'lightsky',
    marginTop: 20,
  },
  fg_re_txt: {
    color: 'blue',
    fontSize: 15,
  },
  showPasswordButton: {
    marginBottom: 20,
    alignSelf: 'flex-end',
    marginRight: 38,
    marginTop: 5,
  },
  showPasswordButtonText: {
    color: '#4E4E4E',
  },
  hidePasswordButtonText: {
    color: 'gray',
  },
  passwd: {
    marginBottom: 0,
  },
  loadingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
});
