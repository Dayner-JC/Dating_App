import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconButton from '../../../components/icon_button';
import ArrowIcon from '../../../../assets/icons/arrow-left.svg';
import API_BASE_URL from '../../../../config/config';
import {getCurrentUserUID} from '../../../../infrastructure/uid/uid';

const BlockedUserScreen = () => {
  const navigation = useNavigation();
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const uid = getCurrentUserUID();

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/user/block_unblock/get`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({uid: uid}),
        });
        const data = await response.json();
        if (data.success) {
          setBlockedUsers(data.blockedUsers);
        }
      } catch (error) {
        console.error('Error fetching blocked users:', error);
      }
      setLoading(false);
    };

    fetchBlockedUsers();
  }, [uid]);

  const toggleBlockStatus = async user => {
    setUpdating(user.uid);
    try {
      const endpoint = user.blocked
        ? `${API_BASE_URL}/user/block_unblock_report/block`
        : `${API_BASE_URL}/user/block_unblock_report/unblock`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({uid: uid, targetUid: user.uid}),
      });

      const data = await response.json();
      if (data.success) {
        setBlockedUsers(prevUsers =>
          prevUsers.map(u =>
            u.uid === user.uid ? {...u, blocked: !u.blocked} : u,
          ),
        );

        if (user.blocked) {
          ToastAndroid.show('User blocked successfully', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('User unblocked successfully', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.error('Error toggling block status:', error);
    }
    setUpdating(null);
  };

  const calculateAge = birthday => {
    if (!birthday) {
      return 'N/A';
    }
    const [month, day, year] = birthday.split('/');
    const birthDate = new Date(`${year}`, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age.toString();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A0F0D" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.title}>Blocked Users</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView>
          {blockedUsers.length > 0 ? (
            blockedUsers.map(user => (
              <View key={user.uid} style={styles.userItem}>
                <Image source={{uri: user.photo}} style={styles.avatar} />
                <Text style={styles.userName}>
                  {user.name}, {calculateAge(user.birthday)}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.unblockButton,
                    user.blocked
                      ? styles.blockedButton
                      : styles.unblockedButton,
                  ]}
                  onPress={() => toggleBlockStatus(user)}
                  disabled={updating === user.uid}>
                  {updating === user.uid ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={[
                        styles.unblockText,
                        user.blocked
                          ? styles.blockedText
                          : styles.unblockedText,
                      ]}>
                      {user.blocked ? 'Blocked' : 'Unblocked'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No blocked users</Text>
          )}
        </ScrollView>
      )}
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
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  userName: {
    fontFamily: 'Roboto_600',
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  unblockButton: {
    borderRadius: 8,
    width: 106,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unblockedButton: {
    borderWidth: 1,
    borderColor: '#525853',
    backgroundColor: 'transparent',
  },
  blockedButton: {
    backgroundColor: '#D97904',
  },
  unblockText: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
  },
  unblockedText: {
    color: '#D9D2B0',
  },
  blockedText: {
    color: '#FFFFFF',
  },
});

export default BlockedUserScreen;
