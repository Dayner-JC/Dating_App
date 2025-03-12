import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import API_BASE_URL from '../../../config/config';
import {getCurrentUserUID} from '../../../infrastructure/uid/uid';

const PrivacyManagementScreen = () => {
  const navigation = useNavigation();
  const uid = getCurrentUserUID();
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
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [profileVisibility, setProfileVisibility] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      return;
    }
    const fetchBlockedUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/block_unblock_report/get`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({uid: uid}),
        });

        const data = await response.json();

        if (data.success) {
          setBlockedUsers(data.blockedUsers || []);
        } else {
          console.error('Failed to fetch blocked users');
        }
      } catch (error) {
        console.error('Error fetching blocked users:', error);
      }
    };

    fetchBlockedUsers();
  }, [uid]);

  useEffect(() => {
    if (!uid) {
      return;
    }

    const fetchPrivacySettings = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/user/privacy-settings/get`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({uid: uid}),
          },
        );
        const data = await response.json();

        if (data.success) {
          const {privacySettings} = data;
          setNotifications(privacySettings.notifications);
          setGeolocation(privacySettings.geolocation);
          setDataUsage(privacySettings.dataUsage);

          const visibility = privacySettings.profileVisibility;
          if (visibility.Visible_to_all_users) {
            setProfileVisibility('Visible to all users');
          } else if (visibility.Visible_only_to_matches) {
            setProfileVisibility('Visible only to matches');
          } else if (visibility.Hide_profile_temporarily) {
            setProfileVisibility('Hide profile temporarily');
          }
          setLoading(false);
        } else {
          Alert.alert('Error', 'Failed to load privacy settings');
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    };

    fetchPrivacySettings();
  }, [uid]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar backgroundColor="#0A0F0D" />
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  const updatePrivacySettings = async updatedSettings => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/user/privacy-settings/put`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({uid: uid, privacySettings: updatedSettings}),
        },
      );

      const data = await response.json();
      if (!data.success) {
        Alert.alert('Error', 'Failed to update privacy settings');
      }
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const handleNotificationChange = (key, value) => {
    const updatedNotifications = {...notifications, [key]: value};
    setNotifications(updatedNotifications);

    updatePrivacySettings({
      notifications: updatedNotifications,
      geolocation,
      dataUsage,
      blockedUsers,
      reportedUsers,
      profileVisibility: getProfileVisibilityObject(),
    });
  };

  const handleGeolocationChange = value => {
    setGeolocation(value);

    updatePrivacySettings({
      notifications,
      geolocation: value,
      dataUsage,
      blockedUsers,
      reportedUsers,
      profileVisibility: getProfileVisibilityObject(),
    });
  };

  const handleDataUsageChange = (key, value) => {
    const updatedDataUsage = {...dataUsage, [key]: value};
    setDataUsage(updatedDataUsage);

    updatePrivacySettings({
      notifications,
      geolocation,
      dataUsage: updatedDataUsage,
      blockedUsers,
      reportedUsers,
      profileVisibility: getProfileVisibilityObject(),
    });
  };

  const getProfileVisibilityObject = () => {
    switch (profileVisibility) {
      case 'Visible to all users':
        return {
          Visible_to_all_users: true,
          Visible_only_to_matches: false,
          Hide_profile_temporarily: false,
        };
      case 'Visible only to matches':
        return {
          Visible_to_all_users: false,
          Visible_only_to_matches: true,
          Hide_profile_temporarily: false,
        };
      case 'Hide profile temporarily':
        return {
          Visible_to_all_users: false,
          Visible_only_to_matches: false,
          Hide_profile_temporarily: true,
        };
      default:
        return {
          Visible_to_all_users: true,
          Visible_only_to_matches: false,
          Hide_profile_temporarily: false,
        };
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
            <Text style={styles.text}>{profileVisibility}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProfileVisibilityScreen', {uid: uid})
              }>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divisor} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allow Notifications</Text>
          {Object.keys(notifications).map(key => (
            <View key={key} style={styles.row}>
              <Text style={styles.text}>
                {key === 'newMessages'
                  ? 'New messages'
                  : key === 'likesReceived'
                  ? 'Likes received'
                  : key === 'matchesSuggestions'
                  ? 'Matches and suggestions'
                  : 'App Updates'}
              </Text>
              <Switch
                value={notifications[key]}
                onValueChange={value => handleNotificationChange(key, value)}
                trackColor={{false: '#525853', true: '#D97904'}}
                thumbColor={notifications[key] ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          ))}
        </View>
        <View style={styles.divisor} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geolocation Permissions</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Allow geolocation</Text>
            <Switch
              value={geolocation}
              onValueChange={value => handleGeolocationChange(value)}
              trackColor={{false: '#525853', true: '#D97904'}}
              thumbColor={geolocation ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>
        <View style={styles.divisor} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allow Data Usage</Text>
          {Object.keys(dataUsage).map(key => (
            <View key={key} style={styles.row}>
              <Text style={styles.text}>
                {key === 'matchCustomization'
                  ? 'Match customization'
                  : key === 'analysisImprovements'
                  ? 'Analysis and improvements of the app'
                  : key === 'marketingPromotions'
                  ? 'Marketing and promotions'
                  : 'Cookies and tracking technologies'}
              </Text>
              <Switch
                value={dataUsage[key]}
                onValueChange={value => handleDataUsageChange(key, value)}
                trackColor={{false: '#525853', true: '#D97904'}}
                thumbColor={dataUsage[key] ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          ))}
        </View>
        <View style={styles.divisor} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blocked Users</Text>
          {blockedUsers.length > 0 ? (
            <View style={styles.userRow}>
              <View style={styles.userList}>
                {blockedUsers.map(user => (
                  <Image
                    key={user.uid}
                    source={{uri: user.photo}}
                    style={styles.userAvatar}
                  />
                ))}
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('BlockedUserScreen')}>
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
                {reportedUsers.map(user => (
                  <Image
                    key={user.id}
                    source={user.avatar}
                    style={styles.userAvatar}
                  />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0F0D',
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
