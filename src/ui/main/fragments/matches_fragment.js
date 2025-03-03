/* eslint-disable no-catch-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import InfoIcon from '../../../assets/icons/info.svg';
import VerifiedIcon from '../../../assets/icons/verify.svg';
import LocationIcon from '../../../assets/icons/location.svg';
import {useNavigation} from '@react-navigation/native';
import {getCurrentUserUID} from '../../../infrastructure/uid/uid';
import API_BASE_URL from '../../../config/config';

export default function MatchesFragment() {
  const navigation = useNavigation();
  const [peopleWhoLikeYou, setPeopleWhoLikeYou] = useState([]);
  const [peopleYouLike, setPeopleYouLike] = useState([]);
  const [matches, setMatches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const createMockUsers = async () => {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/profile/create-mock-users`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({}),
  //       });
  //       const data = await response.json();
  //       if (data.success) {
  //         Alert.alert('Success', data.message);
  //       }
  //     } catch (Error) {
  //       Alert.alert('Error', Error);
  //     }
  //   };

  //   createMockUsers();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getCurrentUserUID();

        const peopleWhoLikeYouResponse = await fetch(
          `${API_BASE_URL}/profile/reactions/people-who-like-you`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId}),
          },
        );
        const peopleYouLikeResponse = await fetch(
          `${API_BASE_URL}/profile/reactions/people-you-like`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId}),
          },
        );
        const matchesResponse = await fetch(
          `${API_BASE_URL}/profile/reactions/matches`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId}),
          },
        );
        const suggestionsResponse = await fetch(
          `${API_BASE_URL}/get_users/get-suggestions`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId}),
          },
        );

        const peopleWhoLikeYouData = await peopleWhoLikeYouResponse.json();
        const peopleYouLikeData = await peopleYouLikeResponse.json();
        const matchesData = await matchesResponse.json();
        const suggestionsData = await suggestionsResponse.json();

        if (peopleWhoLikeYouData.success) {
          setPeopleWhoLikeYou(peopleWhoLikeYouData.data);
        }
        if (peopleYouLikeData.success) {
          setPeopleYouLike(peopleYouLikeData.data);
        }
        if (matchesData.success) {
          setMatches(matchesData.data);
        }
        if (suggestionsData.success) {
          setSuggestions(suggestionsData.data);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while loading data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar backgroundColor="#0A0F0D" />
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.infoHeaderContainer}>
        <Text style={styles.sectionTitle}>People who like you</Text>
        <TouchableOpacity onPress={() => {}}>
          <InfoIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={peopleWhoLikeYou}
        renderItem={renderPeopleWhoLikeYouCard}
        keyExtractor={item => item.uid}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>There are no requests available.</Text>
        }
      />

      <View style={styles.headerContainer}>
        <Text style={styles.card_section_title}>Matches</Text>
        {matches.length > 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate('ListMatchesScreen')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={matches}
        renderItem={renderMatchCard}
        keyExtractor={item => item.uid}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>There are no matches yet.</Text>
        }
      />

      <View style={styles.divisor_container}>
        <View style={styles.divisor} />
      </View>

      <View style={styles.infoHeaderContainer}>
        <Text style={styles.sectionTitle}>People you like</Text>
        <TouchableOpacity onPress={() => {}}>
          <InfoIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={peopleYouLike}
        renderItem={renderPeopleYouLikeCard}
        keyExtractor={item => item.uid}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>It all starts with a like.</Text>
        }
      />

      <Text
        style={[
          styles.card_section_title,
          {marginTop: 16, paddingHorizontal: 16},
        ]}>
        Suggestions
      </Text>
      <FlatList
        data={suggestions}
        renderItem={renderSuggestionsCard}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            There are no suggestions available to suggest.
          </Text>
        }
      />

      <View style={styles.divisor_container_2}>
        <View style={styles.divisor} />
      </View>
    </ScrollView>
  );
}

const renderPeopleWhoLikeYouCard = ({item}) => (
  <View style={styles.photoContainer}>
    <Image source={{uri: item.photos[0]}} style={styles.photoImage} />
    {item.name && <Text style={styles.photoName}>{item.name}</Text>}
  </View>
);

const renderMatchCard = ({item}) => (
  <View style={styles.cardContainer}>
    <Image source={{uri: item.photos[0]}} style={styles.cardImage} />
    <View style={styles.overlayContainer}>
      <View style={styles.name_container}>
        <Text style={styles.cardName}>
          {item.name}
          {item.age ? `, ${item.age}` : ''}
        </Text>
        <VerifiedIcon width={16} height={16} />
      </View>
      <View style={styles.location_container}>
        <LocationIcon width={10} height={10} />
        {item.location && (
          <Text style={styles.cardLocation}>{item.location}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Chat Now</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const renderPeopleYouLikeCard = ({item}) => (
  <View style={styles.photoContainer}>
    <Image source={{uri: item.photos[0]}} style={styles.photoImage} />
    {item.name && <Text style={styles.photoName}>{item.name}</Text>}
  </View>
);

const renderSuggestionsCard = ({item}) => (
  <View style={styles.cardContainer}>
    <Image source={{uri: item.photos[0]}} style={styles.cardImage} />
    <View style={styles.overlayContainer}>
      <View style={styles.name_container}>
        <Text style={styles.cardName}>
          {item.name}
          {item.age ? `, ${item.age}` : ''}
        </Text>
        <VerifiedIcon width={16} height={16} />
      </View>
      <View style={styles.location_container}>
        <LocationIcon width={10} height={10} />
        <Text style={styles.cardLocation}>
          {item.location?.address.country || 'Unknown'},{' '}
          {item.location?.address.state || 'Unknown'}
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A0F0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divisor: {
    height: 1,
    width: '100%',
    backgroundColor: '#222322',
  },
  divisor_container: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  divisor_container_2: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  infoHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Roboto_500',
    color: '#D9D2B0',
    paddingRight: 5,
  },
  card_section_title: {
    fontSize: 32,
    fontFamily: 'GreatMangoDemo',
    color: '#D9D2B0',
    paddingRight: 5,
  },
  seeAllText: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#FFFFFF',
  },
  horizontalList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  photoContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  photoImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#63A486',
  },
  photoName: {
    fontFamily: 'Roboto_700',
    marginTop: 5,
    fontSize: 13,
    color: '#FFFFFF',
  },
  cardContainer: {
    width: 200,
    height: 280,
    marginRight: 15,
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 8,
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardName: {
    fontFamily: 'Roboto_700',
    fontSize: 18,
    color: '#FFFFFF',
    paddingRight: 2,
  },
  cardLocation: {
    fontFamily: 'Roboto_400',
    fontSize: 12,
    color: '#FFFFFF',
    paddingStart: 2,
  },
  buttonContainer: {
    marginTop: 8,
    backgroundColor: '#0000001A',
    paddingVertical: 8,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
    marginBottom: 8,
  },
  buttonText: {
    fontFamily: 'Roboto_500',
    fontSize: 13,
    color: '#FFFFFF',
  },
  emptyText: {
    fontFamily: 'Roboto_300',
    color: '#FFFFFF',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 7,
    marginBottom: 20,
  },
});
