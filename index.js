/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
// import NotifeeDemo from './NotifeeDemo';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('Message handled in the background', remoteMessage);
});
messaging().getInitialNotification(async remoteMessage => {
    // console.log('Message handled in the kill state', remoteMessage);
});


AppRegistry.registerComponent(appName, () => App);
