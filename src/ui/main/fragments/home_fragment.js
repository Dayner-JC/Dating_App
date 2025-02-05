// components/HomeFragment.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import VerifiedIcon from '../../../assets/icons/verify.svg';
import LocationIcon from '../../../assets/icons/location.svg';
import auth from '@react-native-firebase/auth';
import API_BASE_URL from '../../../config/config';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function HomeFragment() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    const loadUsers = async () => {
      try {
        const userResponse = await fetch(`${API_BASE_URL}/get_users/get`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: user.uid }),
        });
        const data = await userResponse.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const calculateAge = (birthday) => {
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProfileScreen', { user: item })}
    >
      <Image
        source={
          item.photos?.length > 0
            ? { uri: item.photos[0] }
            : require('../../../assets/user_1.jpg')
        }
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {item.name || 'Unknown'}, {calculateAge(item.birthday) || 'Unknown'}{' '}
          {item.verified && <VerifiedIcon />}
        </Text>
        <View style={styles.locationContainer}>
          <LocationIcon style={styles.locationIcon} width={16} height={16} />
          <Text style={styles.location}>
            {item.location?.country || 'Unknown'}, {item.location?.state || 'Unknown'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0F0D',
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
  },
  card: {
    width: width - 40,
    height: height - 200,
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#1e1e1e',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  name: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_700',
    fontSize: width * 0.06,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationIcon: {
    marginRight: 5,
  },
  location: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: width * 0.04,
  },
});
