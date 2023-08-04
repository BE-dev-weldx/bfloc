import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import firestore from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

// Initialize Firebase (Make sure you add your Firebase configuration)
// firebase.initializeApp(firebaseConfig);

export default function App({route}) {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState('off');
  // const [url, setUrl] = useState(null); // Added state for object URL
  const [url, setUrl] = useState('')

  const cameraRef = useRef(null);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      alert('Access denied');
    }
  };

  const __takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPreviewVisible(true);
      setCapturedImage(photo);
    }
  };

  const __savePhoto = async () => {
    if (capturedImage) {
      try {
        const fileName = capturedImage.uri.split('/').pop();
        const filePath = `photos/${fileName}`;
        const fileUri = capturedImage.uri;
        const contentType = 'image/jpeg';
        const reference = storage().ref(filePath);
        await reference.putFile(fileUri);

        // Get the download URL of the uploaded image
        const downloadURL = await reference.getDownloadURL();
        // console.log(downloadURL)
        // Store the download URL
        // setUrl(downloadURL);
        // console.log(url)
        
  
        // Send the image URL to a specific API endpoint using a POST request
        const apiResponse = await fetch(`https://biofloc.onrender.com/new_data/${route.params.tank.u_id}/${route.params.tank.tank_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ picture: downloadURL, role: 'user' }),
        });
  
        // Check if the API response is successful (status 200)
        if (apiResponse.status === 200) {
          alert('Photo saved successfully!');
          setPreviewVisible(false);
          setCapturedImage(null);
          __startCamera();
        } else {
          console.log('Failed to save photo to the API.');
          alert('Failed to save photo. Please try again.');
        }
      } catch (error) {
        console.log('Error saving photo:', error);
        alert('Failed to save photo. Please try again.');
      }
    }
  };
  
  // const __savePhoto = async () => {
  //   if (capturedImage) {
  //     try {
  //       const fileName = capturedImage.uri.split('/').pop();
  //       const filePath = `photos/${fileName}`;
  //       const fileUri = capturedImage.uri;
  //       const contentType = 'image/jpeg';
  
  //       const fileBlob = await response.blob();
  //       if (!fileBlob) {
  //         throw new Error('Failed to convert image to blob');
  //       }
  
  //       const reference = storage().ref(filePath);
  //       await reference.put(fileBlob, { contentType });
  
  //       const downloadURL = await reference.getDownloadURL();
  //       if (!downloadURL) {
  //         throw new Error('Failed to get download URL');
  //       }
  
  //       setUrl(downloadURL); // Store the download URL
  //       console.log('Image uploaded successfully!');
  //       console.log(downloadURL)
  //     } catch (error) {
  //       console.error('Error saving photo:', error);
  //       alert('Failed to save photo. Please try again.');
  //     }
  //   } else {
  //     console.error('No captured image found');
  //     alert('No image captured. Please take a photo first.');
  //   }
  // };
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const __handleFlashMode = () => {
    setFlashMode((prevMode) => {
      if (prevMode === 'on') return 'off';
      if (prevMode === 'off') return 'auto';
      if (prevMode === 'auto') return 'on';
    });
  };

  const __switchCamera = () => {
    setCameraType((prevType) => {
      return prevType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back;
    });
  };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={styles.cameraContainer}>
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} url={url} retakePicture={__retakePicture} savePhoto={__savePhoto} />
          ) : (
            <Camera
              ref={cameraRef}
              style={styles.camera}
              type={cameraType}
              flashMode={flashMode}
              autoFocus={Camera.Constants.AutoFocus.on}
            >
              <View style={styles.cameraButtons}>
                <TouchableOpacity style={styles.flashButton} onPress={__handleFlashMode}>
                  <Text style={styles.buttonText}>⚡️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.switchButton} onPress={__switchCamera}>
                  <Text style={styles.buttonText}>{cameraType === Camera.Constants.Type.front ? '🤳' : '📷'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.captureButtonContainer}>
                <TouchableOpacity style={styles.captureButton} onPress={__takePicture} />
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View style={styles.permissionContainer}>
          <TouchableOpacity style={styles.permissionButton} onPress={__startCamera}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const CameraPreview = ({ photo, url, retakePicture, savePhoto }) => {
  return (
    <View style={styles.previewContainer}>
      <ImageBackground source={{ uri: photo && photo.uri }} style={styles.previewImage}>
        <View style={styles.previewButtons}>
          <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
            <Text style={styles.buttonText}>Save Photo</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* {url && (
        <Text style={styles.objectUrlText}>Uploaded to: {url}</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Change background color to black for a more professional look
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraButtons: {
    position: 'absolute',
    top: 30,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashButton: {
    marginRight: 15,
  },
  switchButton: {
    marginRight: 15,
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the bottom padding for better alignment
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    width: 80, // Increase the size of the capture button
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    borderWidth: 5, // Add a border to the button
    borderColor: '#ccc', // Set the border color
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000', // Change background color to black for a more professional look
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionButton: {
    width: 150, // Increase the width of the permission button
    borderRadius: 8,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50, // Increase the height of the permission button
  },
  previewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  previewImage: {
    flex: 1,
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20, // Increase padding for better button placement
  },
  retakeButton: {
    width: 120, // Adjust the width of the retake button
    height: 40,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingVertical: 10, // Add padding for better button appearance
  },
  saveButton: {
    width: 120, // Adjust the width of the save button
    height: 40,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#14274e',
    paddingVertical: 10, // Add padding for better button appearance
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  objectUrlText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff', // Set text color to white
  },
});