// const __savePhoto = async () => {
//   if (capturedImage) {
//     try {
//       const fileName = capturedImage.uri.split('/').pop();
//       const filePath = photos/${fileName};
//       const fileUri = capturedImage.uri;
//       const contentType = 'image/jpeg';

//       const response = await fetch(fileUri);
//       if (!response.ok) {
//         throw new Error('Failed to fetch image data');
//       }

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

//       setObjectUrl(downloadURL); // Store the download URL
//       console.log('Image uploaded successfully!');
//     } catch (error) {
//       console.error('Error saving photo:', error);
//       alert('Failed to save photo. Please try again.');
//     }
//   } else {
//     console.error('No captured image found');
//     alert('No image captured. Please take a photo first.');
//   }
// };