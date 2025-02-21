import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {

    const mockNotifications = [
      { id: '1', message: 'You have a new message from Juan', time: '5m' },
      { id: '2', message: 'Maria liked your profile', time: '10m' },
      { id: '3', message: 'Pedro viewed your profile', time: '1h' },
    ];
    setNotifications(mockNotifications);
  }, []);

  const renderNotification = ({ item }) => {
    return (
      <TouchableOpacity style={styles.notificationItem}>

        <Image source={require('../../assets/image.png')} style={styles.profileImage} />
        <View>
      
          <Text style={styles.message}>{item.message}</Text>
      
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
   
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>⇦</Text> 
        </TouchableOpacity>


        <Text style={styles.title}>Notifications</Text>
      </View>

      
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D', 
  },
  header: {
    paddingTop: 16, 
    paddingHorizontal: 16, 
    paddingBottom: 16, 
    backgroundColor: '#1A1A1A', 
  },
  backButton: {
    position: 'absolute',
    top: 16, 
    left: 16, 
  },
  backButtonText: {
    fontSize: 28, 
    color: '#FFFFFF', 
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 40,
    color: '#D9D2B0',
    alignSelf: 'flex-start', 
    marginTop: 50,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333', 
    backgroundColor: 'rgba(38, 45, 38, 0.5)',
  },
  profileImage: {
    width: 40, 
    height: 40, 
    borderRadius: 20,
    marginRight: 16, 
  },
  message: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  time: {
    fontSize: 12,
    color: '#888', 
    marginTop: 4,
  },
});

export default NotificationsScreen;