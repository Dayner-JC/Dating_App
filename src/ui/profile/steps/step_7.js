import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Button from '../../components/button';
import axios from 'axios';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';

const Step7 = ({ onNext }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [locationName, setLocationName] = useState('');

  const GOOGLE_API_KEY = 'AIzaSyDJd6R2n1Oe1TLY0NRGTRvQoyGBwxp2s_o';

//   const getCurrentLocation = useCallback(async () => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) {
//       console.error('Location permission denied');
//       return;
//     }

//     try {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const region = {
//             latitude,
//             longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           };
//           setCurrentLocation({ latitude, longitude });
//           setMapRegion(region);
//         },
//         (error) => {
//           console.error('Geolocation error:', error);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     } catch (error) {
//       console.error('Error getting location:', error);
//     }
//   }, []);

//   useEffect(() => {
//     getCurrentLocation();
//   }, [getCurrentLocation]);


const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );

      if (response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;
        const country = addressComponents.find(component =>
          component.types.includes('country')
        );
        const region = addressComponents.find(component =>
          component.types.includes('administrative_area_level_1')
        );
        console.log(country,region);
        setLocationName(`${region ? region.long_name : ''}, ${country ? country.long_name : ''}`);
      } else {
        setLocationName('Location not found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setLocationName('Error fetching location name');
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.content}>
      <Text style={styles.title}>Location</Text>
      <Text style={styles.subtitle}>Share your location to meet nearby people!</Text>
        <View style={styles.map_container}>
        <MapView
          style={styles.map}
          region={mapRegion}
          onRegionChangeComplete={(region) => setMapRegion(region)}
          onPress={handleMapPress}
        >
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
            />
          )}
        </MapView>

        </View>
      <Button
        title={selectedLocation ? 'Continue' : 'Use my current location'}
        onPress={() => {
          if (selectedLocation) {
            console.log(selectedLocation);
            onNext(selectedLocation);
          } else if (currentLocation) {
            setSelectedLocation(currentLocation);
          }
        }}
        backgroundColor="#D97904"
        disabledBackgroundColor="#8b580f"
        borderRadius={100}
        width="100%"
        height={55}
      />
      </View>
              <View style={styles.petalsContainer}>
                      <View style={styles.singlePetal}>
                        <Petal1 style={styles.petal1} />
                      </View>
                      <View style={styles.doublePetals}>
                        <Petal2 style={styles.petal2} />
                        <Petal3 style={styles.petal3} />
            </View>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
      },
  content: {
    flex: 1,
    width: '85%',
  },
  map_container: {
    marginVertical: 35,
    height: 276,
    width: '100%',
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 40,
    color: '#D9D2B0',
    textAlign: 'left',
    marginTop: 40,
  },
  subtitle: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
    textAlign: 'left',
    marginTop: 10,
  },
  map: {
    flex: 1,
    borderRadius: 20,
    height: 60,
  },
  petalsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  singlePetal: {
    flex: 1,
  },
  doublePetals: {
    flex: 1,
    flexDirection: 'row',
  },
  petal1: {
    marginStart: 10,
    marginBottom: 60,
  },
  petal2: {
    marginTop: 60,
  },
  petal3: {
    marginLeft: 60,
    marginTop: 20,
  },
});

export default Step7;
