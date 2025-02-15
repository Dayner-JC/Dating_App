/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
  PanResponder,
} from 'react-native';
import VerifiedIcon from '../../../assets/icons/verify.svg';
import LocationIcon from '../../../assets/icons/location.svg';
import Like from '../../../assets/icons/like.svg';
import Dislike from '../../../assets/icons/dislike.svg';
import Hand from '../../../assets/icons/hand-swipe.svg';
import DislikeSwipe from '../../../assets/icons/dislike-swipe.svg';
import LikeSwipe from '../../../assets/icons/like-swipe.svg';
import auth from '@react-native-firebase/auth';
import API_BASE_URL from '../../../config/config';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function HomeFragment() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;
    setUid(user.uid);
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
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {age--;}
    return age.toString();
  };

  const handleLike = async (targetUserId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/reactions/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: uid, targetUserId }),
      });
      if (response.ok) {
        console.log('Like successfully registered');
      }
    } catch (error) {
      console.error('Error registering like:', error);
    }
  };

  const handleDislike = async (targetUserId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/reactions/dislike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: uid, targetUserId }),
      });
      if (response.ok) {
        console.log('Dislike successfully registered');
      }
    } catch (error) {
      console.error('Error registering dislike:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  const SwipeableCard = ({ userData }) => {
    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [isLongPressActive, setIsLongPressActive] = useState(false);
    const longPressTimeout = useRef(null);
    const startTime = useRef(0);
    const LONG_PRESS_DURATION = 200;

    const rightOverlayOpacity = position.x.interpolate({
      inputRange: [30, 120],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const leftOverlayOpacity = position.x.interpolate({
      inputRange: [-120, -30],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          startTime.current = Date.now();
          longPressTimeout.current = setTimeout(() => {
            setIsLongPressActive(true);
          }, LONG_PRESS_DURATION);
        },
        onPanResponderMove: (_evt, gestureState) => {
          position.setValue({ x: gestureState.dx, y: 0 });
          if (Math.abs(gestureState.dx) > 10 && longPressTimeout.current) {
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = null;
          }
        },
        onPanResponderRelease: (_evt, gestureState) => {
          if (longPressTimeout.current) {
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = null;
          }
          const pressDuration = Date.now() - startTime.current;

          if (pressDuration >= LONG_PRESS_DURATION || isLongPressActive) {
            setIsLongPressActive(false);
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
            return;
          }
          if (Math.abs(gestureState.dx) < 10 && Math.abs(gestureState.dy) < 10) {
            navigation.navigate('ProfileScreen', { user: userData });
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
            return;
          }
          if (gestureState.dx > 120) {
            handleLike(userData.id);
            Animated.timing(position, {
              toValue: { x: width + 100, y: 0 },
              duration: 300,
              useNativeDriver: false,
            }).start(() => {
              position.setValue({ x: 0, y: 0 });
            });
          }
          else if (gestureState.dx < -120) {
            handleDislike(userData.id);
            Animated.timing(position, {
              toValue: { x: -width - 100, y: 0 },
              duration: 300,
              useNativeDriver: false,
            }).start(() => {
              position.setValue({ x: 0, y: 0 });
            });
          } else {
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
          }
        },
      })
    ).current;

    const rotate = position.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });

    const animatedCardStyle = {
      transform: [{ translateX: position.x }, { rotate }],
    };

    return (
      <Animated.View {...panResponder.panHandlers} style={[styles.card, animatedCardStyle]}>
        <Image
          source={
            { uri: userData.photos[0] }
          }
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {userData.name || 'Unknown'}, {calculateAge(userData.birthday) || 'N/A'}{' '}
            {userData.verified && <VerifiedIcon />}
          </Text>
          <View style={styles.locationContainer}>
            <LocationIcon style={styles.locationIcon} width={16} height={16} />
            <Text style={styles.location}>
              {userData.location?.country || 'Unknown'},{' '}
              {userData.location?.state || 'Unknown'}
            </Text>
          </View>
        </View>
        {isLongPressActive && (
          <View style={styles.longPressOverlay}>
            <Dislike/>
            <Hand/>
            <Like/>
          </View>
        )}
        {!isLongPressActive && (
          <>
            <Animated.View style={[styles.leftOverlay, { opacity: leftOverlayOpacity }]}>
              <DislikeSwipe/>
            </Animated.View>
            <Animated.View style={[styles.rightOverlay, { opacity: rightOverlayOpacity }]}>
              <LikeSwipe/>
            </Animated.View>
          </>
        )}
      </Animated.View>
    );
  };

  const renderItem = ({ item }) => (
    <View >
      <SwipeableCard userData={item} />
    </View>
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
  longPressOverlay: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000052',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#65616152',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#7C0D0D52',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
