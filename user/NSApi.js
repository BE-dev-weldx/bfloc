import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { sendTestNotification } from './path/to/FCMTesterAPI';

const NSApi = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // This will be executed when the component mounts
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://biofloc.onrender.com/get_fcm_tokens'); // Replace with your API URL
        const jsonData = await response.json();
  
        // Update the state with the received data
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

  const deviceTokens = ["cNLa9V5kQFCOQZQXsGNgB7:APA91bFg4s4vf3P3qQhrtZdXgm6yufXHltywkd-mT_zAFK0jU69-GaXi9IlBccCY81mm46kOxkwJEDd43yTCH4OlfDRs_jKbS8OCMby8EepKzvAZD7y1jizBbuTxj11fS1y0NtvM1-2D", "eHTPytBeSDih0YnAVB_ERT:APA91bFvq2UVCO9OuUcPclfHfAlwGep_UMuOFim75lkC2WxUe9uPkJMyRaBbqBoycA5LwPMH2UA8x9M71Q4h0FQfjcXG2VPPbKtZvI3djiP-k1c4Q02U4DIg60SEwOa3ipG6vY0cjePK", "cMMCHBTmTDGCYO0mIzAAWl:APA91bFfQy21--61_KULBtGLbWVbAaiQp2PMD2wax9QxQIke8LgEBelHYtqWH9HiZps_6oHuMPxRJFo3BcNMLAo08yR3044_UA0JbqYuSYW_jSX-wvi2LawpQ-WFhLqaUeCVHVqvtodx"]; // Replace with actual device tokens

  const handleSendNotification = async () => {
    try {
      const response = await sendTestNotification(
        deviceTokens,
        'Test Notification',
        'This is a test notification from FCM Tester!'
      );
      // Handle response if needed
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <View>
      <Button title="Send Test Notification" onPress={handleSendNotification} />
    </View>
  );
};

export default NSApi;
