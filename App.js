import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './user/Login';
import Registration from './user/Registration';
import Dashboard from './user/Dashboard';
import Camera from './user/Camera';
import Admin from './admin/Admin';
import Forget from './user/Forget';
import Notification from './user/Notification';
import SplashScreen from './SplashScreen';
import Profile  from './user/Profile';

import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();




    //   const response = await fetch("https://biofloc.onrender.com/post_fcm_token", {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({"fcm_token":fcmtoken}),
    //     });
    
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    
    //     const result = await response.json();
    //     console.log(result)
    // } catch (err) {
    //   console.log(err.message);
    // }
  
  // else{
  //   const response = await fetch("https://biofloc.onrender.com/post_fcm_token", {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({"fcm_token":fcmtoken}),
  //       });
    
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
    
  //       const result = await response.json();
  //       console.log(result)
  // }
// }

 // Step 2: Get the navigation object using useNavigation

 const unsubscribeNotificationOpenedApp = messaging().onNotificationOpenedApp((remoteMessage) => {
  console.log('asdfghjkl', remoteMessage);

  // Step 3: Handle the behavior you want when the user opens the app by clicking the notification
  // For example, navigate to a specific screen based on the notification data.

  // Assuming the notification data contains a "screen" key that specifies the target screen name

    // navigation.navigate('Notification');

});


export default function App() {

  // const [result, setResult] = useState('');
  useEffect(() => {
   
    // setResult(result);
    // console.log(result)
  }, []);

  
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">      
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Camera' component={Camera} options={{headerShown:false}}/>
        {/* <Stack.Screen name='Login' options={{headerShown: false}}>{() => <Login fcmtoken={result}/>}</Stack.Screen> */}

        <Stack.Screen name='Register' component={Registration} options={{headerShown: false}}/>
        <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown: false}}/>
        <Stack.Screen name='Admin' component={Admin} options={{headerShown: false}}/>
        <Stack.Screen name='Forget' component={Forget} options={{headerShown: false}}/>
        <Stack.Screen name='Notification' component={Notification} options={{headerShown: false}}/>
        {/* <Stack.Screen name='Notification' component={Notification} options={{headerShown: false}}/> */}
        <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

