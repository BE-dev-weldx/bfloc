import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './user/Login';
import Registration from './user/Registration';
import Dashboard from './user/Dashboard';
import Camera from './user/Camera';
import Admin from './admin/Admin';
import Forget from './user/Forget';
import Notification from './user/Notification';
import SplashScreen from './SplashScreen';
import Profile  from './user/Profile';
const Stack = createNativeStackNavigator();
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const[isadmin, setIsadmin] = useState(false)
  // const [userData, setUserData] = useState(null);
  // const [userCode, setUserCode] = useState(false);
  const [isSplashLoadingComplete, setIsSplashLoadingComplete] = useState(false);

  useEffect(() => {
    const check = async () => {
      const code = await AsyncStorage.getItem('logcode');
      if (code) {
        // const udt = await AsyncStorage.getItem('udata');
        // // setUserCode(true);
        // // setUserData(JSON.parse(udt));
        const lastChar = code.charAt(code.length - 1);
        if(lastChar === 'n'){
          setIsadmin(true)
          setLoggedIn(true);
        }
        setLoggedIn(true);

      } else {
       
      }
      // Operations inside useEffect are complete
      setIsSplashLoadingComplete(true);
    };
    check();
  }, []);

  if (!isSplashLoadingComplete) {
    // Show SplashScreen until operations are complete
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {loggedIn ? (
  // Show these screens only when loggedIn is true
  isadmin ? (
    <>
    <Stack.Screen name='Admin' component={Admin} options={{ headerShown: false }} />
    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
    </>
  ) : (
    <>
      <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name='Camera' component={Camera} options={{ headerShown: false }} />
      <Stack.Screen name='Admin' component={Admin} options={{ headerShown: false }} />
      <Stack.Screen name='Notification' component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      
    </>
  )
) : (
  // Show these screens only when loggedIn is false
  <>
    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
    <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
    <Stack.Screen name='Forget' component={Forget} options={{ headerShown: false }} />
    <Stack.Screen name='Admin' component={Admin} options={{ headerShown: false }} />
    <Stack.Screen name='Register' component={Registration} options={{ headerShown: false }} />
  </>
)
}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
