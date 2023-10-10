import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState} from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity,Alert, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = ({ uid}) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme==='dark'
  // console.log(uid)
  const navigation = useNavigation()
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const user = {
    name: 'John Doe',
    profilePhoto: require('../assets/image.png'),
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('logcode')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={isDarkMode?[styles.container,{backgroundColor:'black'}]:styles.container}>
      <Image source={user.profilePhoto} style={styles.profilePhoto} />
      <Text style={isDarkMode?[styles.name,{color:'white'}]:styles.name}>{uid.first_name + ' '+ uid.last_name}</Text>
      <View style={isDarkMode?[styles.detailsContainer, {backgroundColor:'black'}]:styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={isDarkMode?[styles.detailLabel,{color:'white'}]:styles.detailLabel}>Village:</Text>
          <Text style={isDarkMode?[styles.detailText, {color:'white'}]:styles.detailText}>{uid.village}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={isDarkMode?[styles.detailLabel,{color:'white'}]:styles.detailLabel}>Block:</Text>
          <Text style={isDarkMode?[styles.detailText, {color:'white'}]:styles.detailText}>{uid.block}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={isDarkMode?[styles.detailLabel,{color:'white'}]:styles.detailLabel}>District:</Text>
          <Text style={isDarkMode?[styles.detailText, {color:'white'}]:styles.detailText}>{uid.district}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={isDarkMode?[styles.detailLabel,{color:'white'}]:styles.detailLabel}>User Id:</Text>
          <Text style={isDarkMode?[styles.detailText, {color:'white'}]:styles.detailText}>{'biofloc'+uid.u_id}</Text>
        </View>
      </View>

      <TouchableOpacity style={isDarkMode?[styles.logoutButton,{backgroundColor:'#8c0e0e', width:80}]:styles.logoutButton} onPress={handleLogout}>
        <Text style={isDarkMode?[styles.logoutButtonText,{color:'white', textAlign:'center'}]:styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    flex: 1,
    fontWeight: 'bold',
    color: '#555',
  },
  detailText: {
    flex: 2,
    color: '#777',
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    textAlign:'center'
  },
});

export default Profile;
