import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LocationIcon from '../../assets/icons/location.svg';
import LinearGradient from 'react-native-linear-gradient';
import IconButton from '../components/icon_button';
import CloseIcon from '../../assets/icons/close-button.svg';
import LikeIcon from '../../assets/icons/heart.svg';
import BackIcon from '../../assets/icons/back-button.svg';

const {width: screenWidth} = Dimensions.get('window');

const ProfileScreen = ({route, navigation}) => {
  const {user} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChatButton, setShowChatButton] = useState(false);

  console.log('user: ', user);

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

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

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={user.photos}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onScroll={handleScroll}
          renderItem={({item}) => (
            <Image source={{uri: item}} style={styles.profileImage} />
          )}
        />

        <View style={styles.indicatorContainer}>
          {user.photos.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.backIconContainer}>
        <IconButton icon={<BackIcon />} onPress={() => navigation.goBack()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {user.name}, {calculateAge(user.birthday)}
          </Text>
          <View style={styles.locationContainer}>
            <LocationIcon style={styles.locationIcon} width={16} height={16} />
            <Text style={styles.location}>
              {user.location.country}, {user.location.state}
            </Text>
          </View>
          <Text style={styles.description}>{user.about}</Text>

          <Text style={styles.sectionTitle}>Interests and hobbies</Text>
          <View style={styles.interestsContainer}>
            {user.interests.map(interest => (
              <Text key={interest} style={styles.interest}>
                {interest}
              </Text>
            ))}
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Gender:</Text>
                <Text style={styles.detailValue}>{user.gender}</Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Preference:</Text>
                <Text style={styles.detailValue}>{user.preference}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Looking:</Text>
                <Text style={styles.detailValue}>{user.intentions}</Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Height:</Text>
                <Text style={styles.detailValue}>{user.height} cm</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.padding} />
      </ScrollView>

      {!showChatButton ? (
        <LinearGradient
          colors={['#0A0F0D8F', '#0A0F0D']}
          locations={[0, 0.9]}
          style={styles.actionButtons}>
          <IconButton
            icon={<CloseIcon />}
            onPress={() => navigation.goBack()}
          />
          <IconButton
            icon={<LikeIcon />}
            onPress={() => setShowChatButton(true)}
          />
        </LinearGradient>
      ) : (
        <View style={styles.chatButtonContainer}>
          <TouchableOpacity style={styles.chatButton} onPress={() => {}}>
            <Text style={styles.chatButtonText}>Chat Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
  },
  profileImage: {
    width: screenWidth,
    height: screenWidth * 1.2,
  },
  backIconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D2B0',
    marginHorizontal: 4,
    zIndex: 1,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  userInfo: {
    padding: 20,
    backgroundColor: '#0A0F0D',
  },
  name: {
    fontFamily: 'Roboto_700',
    color: '#FFFFFF',
    fontSize: 24,
  },
  locationIcon: {
    marginRight: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  location: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 15,
  },
  description: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Roboto_500',
    color: '#D9D2B0',
    fontSize: 16,
    marginBottom: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interest: {
    backgroundColor: '#5258531A',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginRight: 10,
    marginBottom: 5,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#525853',
    fontFamily: 'Roboto_400',
    fontSize: 14,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    fontFamily: 'Roboto_500',
    color: '#D9D2B0',
    fontSize: 16,
  },
  detailValue: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 5,
  },
  actionButtonsContainer: {
    marginTop: 20,
    height: 90,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 100,
    backgroundColor: 'transparent',
  },
  padding: {
    height: 100,
  },
  chatButtonContainer: {
    width: '100%',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#0A0F0D',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  chatButton: {
    backgroundColor: '#D97904',
    borderRadius: 100,
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Roboto_500',
  },
});

export default ProfileScreen;
