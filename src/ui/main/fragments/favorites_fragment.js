/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import InfoIcon from '../../../assets/icons/info.svg';
import VerifiedIcon from '../../../assets/icons/verify.svg';
import LocationIcon from '../../../assets/icons/location.svg';
import { useNavigation } from '@react-navigation/native';

const dataLists = {
  peopleWhoLikeYou: [
    { id: '1', name: 'Leslie', image: 'https://th.bing.com/th/id/R.2aa40bb626c09354da4c56b8744ad9b1?rik=Dn7hj%2bq19wBDLw&pid=ImgRaw&r=0' },
    { id: '2', name: 'Brenda', image: 'https://th.bing.com/th/id/OIP.lq99e0pkiblHoXx7ZU_x2AHaHZ?rs=1&pid=ImgDetMain' },
    { id: '3', name: 'Alexander', image: 'https://th.bing.com/th/id/OIP.Sw6i6KBSlnsT9_Mqq6gWnAHaHi?w=184&h=187&c=7&r=0&o=5&pid=1.7' },
  ],
  matches: [
     { id: '1', name: 'Brandi', age: 22, location: 'Naperville', image: 'https://static1.bigstockphoto.com/1/7/2/large1500/27169880.jpg'},
     { id: '2', name: 'Claire', age: 28, location: 'Orange', image: 'https://th.bing.com/th/id/R.6db076ba1e4078e3e20d6463b29b072d?rik=EPWU4cEYyDavmg&riu=http%3a%2f%2fcdn3.upsocl.com%2fwp-content%2fuploads%2f2014%2f03%2f268.jpg&ehk=yfLWWyMuDKwwoodDORRXdGBs79s04AL3oqoOUz3OPYc%3d&risl=&pid=ImgRaw&r=0' },
  ],
  suggestions: [
    { id: '1', name: 'Jenny', age: 24, location: 'Orlando', image: 'https://th.bing.com/th/id/OIP.GBooRNWo9Dv24_Q0hG3l4QHaKh?w=744&h=1057&rs=1&pid=ImgDetMain' },
    { id: '2', name: 'Wendy', age: 30, location: 'Austin', image: 'https://i.pinimg.com/originals/a1/2c/f8/a12cf89e0fb01fcc800c75f6c48741c9.jpg' },
  ],
  peopleYouLike: [
    { id: '1', name: 'Emily', image: 'https://th.bing.com/th/id/OIP.jsXuwEhPK5VUlcOJN7A9NAHaJP?pid=ImgDet&w=191&h=237&c=7' },
    { id: '2', name: 'Sophia', image: 'https://th.bing.com/th/id/OIP.tp2Df52FjwbmqtyH6NJ51gHaNK?pid=ImgDet&w=188&h=333&c=7' },
    { id: '3', name: 'Isabella', image: 'https://th.bing.com/th/id/OIP.tP7Zo7_9Afr3u2O0kjTkNwAAAA?pid=ImgDet&w=191&h=191&c=7' },
  ],
};

const renderPeopleWhoLikeYouCard = ({ item }) => (
  <View style={styles.photoContainer}>
    <Image source={{ uri: item.image }} style={styles.photoImage} />
    {item.name && <Text style={styles.photoName}>{item.name}</Text>}
  </View>
);

const renderMatchCard = ({ item }) => (
  <View style={styles.cardContainer}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.overlayContainer}>
      <View style={styles.name_container}>
      <Text style={styles.cardName}>
        {item.name}{item.age ? `, ${item.age}` : ''}
      </Text>
      <VerifiedIcon width={16} height={16}/>
      </View>
      <View style={styles.location_container}>
        <LocationIcon width={10} height={10}/>
      {item.location && <Text style={styles.cardLocation}>{item.location}</Text>}
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Chat Now</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const renderPeopleYouLikeCard = ({ item }) => (
  <View style={styles.photoContainer}>
    <Image source={{ uri: item.image }} style={styles.photoImage} />
    {item.name && <Text style={styles.photoName}>{item.name}</Text>}
  </View>
);

const renderSuggestionsCard = ({ item }) => (
  <View style={styles.cardContainer}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.overlayContainer}>
    <View style={styles.name_container}>
      <Text style={styles.cardName}>
        {item.name}{item.age ? `, ${item.age}` : ''}
      </Text>
      <VerifiedIcon width={16} height={16}/>
      </View>
      <View style={styles.location_container}>
        <LocationIcon width={10} height={10}/>
      {item.location && <Text style={styles.cardLocation}>{item.location}</Text>}
      </View>
    </View>
  </View>
);

export default function FavoritesFragment() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.infoHeaderContainer}>
        <Text style={styles.sectionTitle}>People who like you</Text>
        <TouchableOpacity onPress={() => {}}>
          <InfoIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataLists.peopleWhoLikeYou}
        renderItem={renderPeopleWhoLikeYouCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>There are no requests available.</Text>
        }
      />

      <View style={styles.headerContainer}>
        <Text style={styles.card_section_title}>Matches</Text>
        {dataLists.matches.length > 0 && (
          <TouchableOpacity onPress={()=>navigation.navigate('ListMatchesScreen')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={dataLists.matches}
        renderItem={renderMatchCard}
        keyExtractor={(item) => item.id}
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
        data={dataLists.peopleYouLike}
        renderItem={renderPeopleYouLikeCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>It all starts with a like.</Text>
        }
      />

      <Text style={[styles.card_section_title, { marginTop: 16, paddingHorizontal: 16 }]}>
        Suggestions
      </Text>
      <FlatList
        data={dataLists.suggestions}
        renderItem={renderSuggestionsCard}
        keyExtractor={(item) => item.id}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
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
