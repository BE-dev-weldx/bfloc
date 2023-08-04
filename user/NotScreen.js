import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function Notification({ navigation }) {
  const not = {
    head: "hello bc you have got a new notification",
    content: "janagana mana adhi nayak jay hai bharat bhagya bidhata"
  };

  const handleNotification = () => {
    navigation.navigate('Detail', { not });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <View style={styles.noticontainer}>
        <TouchableOpacity style={styles.notification} onPress={handleNotification}>
          <View style={styles.notificationContent}>
            <Text numberOfLines={1} style={styles.notificationHead}>{not.head}</Text>
            <Text numberOfLines={1} style={styles.notificationText}>
              {not.content}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  noticontainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  notification: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationContent: {},
  notificationHead: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    // textAlign: 'center',
  },
});
