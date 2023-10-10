import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity , Image, useColorScheme} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

// Component imports
import TankDetails from './TankDetails';
import Profile from './Profile';

export default function Dashboard({ navigation, route }) {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const [udata, setData] = useState(null);
  const [localdata, setLocalData] = useState(null);
  const data = route.params?.data;
  // console.log('dashboard',data)
  
  
  useEffect(() => {
    const checkdata = async() => {
      const udt = await AsyncStorage.getItem('udata');
      if(udt){
        setLocalData(JSON.parse(udt))
      }
     }
      checkdata()
    setData(data);
  }, [data]);
  

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#0e828c', // Color for the active tab label and icon
        inactiveTintColor: 'black', // Color for the inactive tab label and icon
        labelStyle: { fontSize: 16 }, // Style for the tab label
        style: isDarkMode ? style.tab_d : style.tab, // Background color of the tab bar
      }}
    >
      <Tab.Screen
        name="Tank"
        options={{
          tabBarLabel: 'Your Tanks',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/check-list.png')}
                style={{ width: 22, height: 22 }}
              />
            </View>
          ),
          headerShown: false,
        }}
      >
        {() => <TankDetails udata={localdata ? localdata : data} />}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile Status',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={ require('../assets/user.png')}
                style={{ width: 22, height: 22 }}
              />
            </View>
          ),
          headerShown: false,
        }}
      >
        {() => <Profile uid={localdata ? localdata : data} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}


const style = StyleSheet.create({
  tab:{
    backgroundColor:'white',
  },
  tab_d:{
    backgroundColor:'black',
  }
})