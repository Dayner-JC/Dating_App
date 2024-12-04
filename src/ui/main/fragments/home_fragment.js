import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import VerifiedIcon from '../../../assets/icons/verify.svg';
import LocationIcon from '../../../assets/icons/location.svg';

const { height, width } = Dimensions.get('window');

const profiles = [
  {
    id: '1',
    name: 'Max',
    age: 27,
    location: 'Utah',
    image: require('../../../assets/user_1.jpg'),
    verified: true,
  },
  {
    id: '2',
    name: 'Sophia',
    age: 24,
    location: 'New York',
    image: require('../../../assets/user_2.jpg'),
    verified: false,
  },
];

export default function HomeFragment() {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => console.log('Clicked on:', item.name)}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {item.name}, {item.age}{' '}
          {item.verified && (<VerifiedIcon/>)}
        </Text>
        <View style={styles.locationContainer}>
          <LocationIcon style={styles.locationIcon} width={16} height={16} />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
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
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
  },
  card: {
    width: width - 40,
    height: height - 172,
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
    padding: 20,
  },
  name: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_700',
    fontSize: 28,
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
    fontSize: 16,
  },
});
