import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Import the Animatable library

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a delay for demonstration purposes (you can replace it with your actual loading logic)
    const splashTimer = setTimeout(() => {
      navigation.replace('Login'); // Replace 'Main' with the name of your main screen
    }, 2000); // Splash screen duration in milliseconds (adjust as needed)

    return () => clearTimeout(splashTimer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Add your splash screen GIF */}
      <Image
        source={require('./assets/sp.png')}
        style={styles.image}
        resizeMode="contain"
      />
      {/* Add your brand name with the wave animation */}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set your desired background color
  },
  image: {
    width: '70%', // Adjust the image size as needed
  },
  brandText: {
    marginTop: 20, // Adjust the margin as needed
    fontSize: 24, // Adjust the font size as needed
    fontWeight: 'bold',
    color: '#000', // Set your desired text color
  },
});

export default SplashScreen;
