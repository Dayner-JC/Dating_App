import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';

const PrivacyManagementScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState({
    newMessages: true,
    likesReceived: true,
    matchesSuggestions: true,
    appUpdates: true,
  });

  const [geolocation, setGeolocation] = useState(true);

  const [dataUsage, setDataUsage] = useState({
    matchCustomization: true,
    analysisImprovements: true,
    marketingPromotions: true,
    cookiesTracking: true,
  });

  const [blockedUsers, setBlockedUsers] = useState([
    { id: 1, avatar: require('../../../assets/user_2.jpg') },
    { id: 2, avatar: require('../../../assets/0.png') },
    { id: 3, avatar: require('../../../assets/6.png') },
  ]);

  const [reportedUsers, setReportedUsers] = useState([
    { id: 4, avatar: require('../../../assets/5.png') },
    { id: 5, avatar: require('../../../assets/3.png') },
  ]);

  const handleToggle = (key, section) => {
    if (section === 'notifications') {
      setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    } else if (section === 'dataUsage') {
      setDataUsage((prev) => ({ ...prev, [key]: !prev[key] }));
    } else if (section === 'geolocation') {
      setGeolocation((prev) => !prev);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A0F0D" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.title}>Privacy{'\n'}Management</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Visibility</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Visible to all users</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileVisibilityScreen')}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divisor}/>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allow Notifications</Text>
          {Object.keys(notifications).map((key) => (
            <View key={key} style={styles.row}>
              <Text style={styles.text}>
                {key === 'newMessages' ? 'New messages' :
                  key === 'likesReceived' ? 'Likes received' :
                    key === 'matchesSuggestions' ? 'Matches and suggestions' :
                      'App Updates'}
              </Text>
              <Switch
                value={notifications[key]}
                onValueChange={() => handleToggle(key, 'notifications')}
                trackColor={{ false: '#525853', true: '#D97904' }}
                thumbColor={notifications[key] ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          ))}
        </View>

        <View style={styles.divisor}/>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geolocation Permissions</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Allow geolocation</Text>
            <Switch
              value={geolocation}
              onValueChange={() => handleToggle('geolocation', 'geolocation')}
              trackColor={{ false: '#525853', true: '#D97904' }}
              thumbColor={geolocation ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        <View style={styles.divisor}/>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allow Data Usage</Text>
          {Object.keys(dataUsage).map((key) => (
            <View key={key} style={styles.row}>
              <Text style={styles.text}>
                {key === 'matchCustomization' ? 'Match customization' :
                  key === 'analysisImprovements' ? 'Analysis and improvements of the app' :
                    key === 'marketingPromotions' ? 'Marketing and promotions' :
                      'Cookies and tracking technologies'}
              </Text>
              <Switch
                value={dataUsage[key]}
                onValueChange={() => handleToggle(key, 'dataUsage')}
                trackColor={{ false: '#525853', true: '#D97904' }}
                thumbColor={dataUsage[key] ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          ))}
        </View>

        <View style={styles.divisor}/>

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Blocked Users</Text>
            {blockedUsers.length > 0 ? (
                <View style={styles.userRow}>
                <View style={styles.userList}>
                    {blockedUsers.map((user) => (
                    <Image key={user.id} source={user.avatar} style={styles.userAvatar} />
                    ))}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('BlockedUserScreen')}>
                    <Text style={styles.manageText}>Manage</Text>
                </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.text}>None</Text>
            )}
        </View>

        <View style={styles.divisor} />

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reported Users</Text>
            {reportedUsers.length > 0 ? (
                <View style={styles.userRow}>
                <View style={styles.userList}>
                    {reportedUsers.map((user) => (
                    <Image key={user.id} source={user.avatar} style={styles.userAvatar} />
                    ))}
                </View>
                </View>
            ) : (
                <Text style={styles.text}>None</Text>
            )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
    paddingBottom: 20,
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#0A0F0D',
    width: '100%',
    paddingStart: 10,
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 32,
    color: '#D9D2B0',
    marginStart: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  section: {
    marginStart: 20,
    marginEnd: 20,
  },
  sectionTitle: {
    fontFamily: 'Roboto_600',
    color: '#D9D2B0',
    fontSize: 12,
  },
  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#222322',
    marginTop: 20,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  text: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 16,
  },
  editText: {
    fontFamily: 'Roboto_400',
    color: '#D9D2B0',
    fontSize: 14,
    textDecorationLine: 'underline',
    paddingEnd: 5,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  userList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  manageText: {
    fontFamily: 'Roboto_400',
    color: '#D9D2B0',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginEnd: 5,
  },
});

export default PrivacyManagementScreen;
