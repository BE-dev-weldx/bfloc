import React,{useState} from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity,Alert } from 'react-native';


const Profile = ({ uid, navigation }) => {
  // console.log(uid)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const user = {
    name: 'John Doe',
    profilePhoto: require('../assets/image.png'),
  };

  const handleLogout = async () => {
    // try {
    //   // console.log('hello')
    //   // await AsyncStorage.removeItem('username');
    //   // await AsyncStorage.removeItem('password');
    //   // setIsLoggedIn(false);
    //   // setUserDetails({});
      navigation.navigate("Login");
    // } catch (error) {
    //   Alert.alert('Error', 'An error occurred while logging out. Please try again.');
    // }
  };

  return (
    <View style={styles.container}>
      <Image source={user.profilePhoto} style={styles.profilePhoto} />
      <Text style={styles.name}>{uid.first_name + ' '+ uid.last_name}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Village:</Text>
          <Text style={styles.detailText}>{uid.village}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Block:</Text>
          <Text style={styles.detailText}>{uid.block}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>District:</Text>
          <Text style={styles.detailText}>{uid.district}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>User Id</Text>
          <Text style={styles.detailText}>{'biofloc'+uid.u_id}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
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
  },
});

export default Profile;
