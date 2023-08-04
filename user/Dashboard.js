import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Component imports
import TankDetails from './TankDetails';
import Profile from './Profile';

export default function Dashboard({ navigation, route }) {
  const [udata, setData] = useState(null);
  const data = route.params?.data;
  

  useEffect(() => {
    setData(data);
  }, [data]);
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

    checkLoginStatus();
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tank"
        options={{
          tabBarLabel: 'Your Tanks',
          tabBarIcon: () => <MaterialCommunityIcons name="account" color={'red'} size={24} />,
          headerShown:false
        }}
      >
        {() => <TankDetails udata={data} />}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile Status',
          tabBarIcon: () => <MaterialCommunityIcons name="account" color={'red'} size={24} />,
          headerShown: false
        }}
      >
        {() => <Profile uid={udata} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
