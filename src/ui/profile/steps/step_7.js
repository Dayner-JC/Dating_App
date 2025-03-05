import React, {useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LocationIcon from '../../../assets/icons/gps.svg';

const Step7 = ({onNext, onChangeData}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [locationAcquired, setLocationAcquired] = useState(false);
  const mapRef = useRef(null);

  const reverseGeocode = useCallback(async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAddress(data.address);
      console.log('Address:', data.address);
    } catch (error) {
      Alert.alert('Error', 'Internet access failed');
      console.error('Error geocoding location:', error);
    }
  }, []);

  const getCurrentLocation = useCallback(() => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        const newLocation = {latitude, longitude};
        setSelectedLocation(newLocation);
        await reverseGeocode(latitude, longitude);
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            1000,
          );
        }
        setLoading(false);
        setLocationAcquired(true);
      },
      error => {
        if (error.code === 1) {
          Alert.alert('Error', 'Location permission denied');
        } else if (error.code === 2) {
          Alert.alert('Error', 'Location services disabled please enable GPS and retry');
        } else {
          Alert.alert('Sorry', 'Your region is not allowed');
        }
        console.error('Geolocation error:', error);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [reverseGeocode]);

  const handleMapPress = async e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    const newLocation = {latitude, longitude};
    setSelectedLocation(newLocation);
    await reverseGeocode(latitude, longitude);
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  };

  const handleContinue = () => {
    const locationData = {
      address,
      coordinates: selectedLocation,
    };
    onChangeData('location', locationData);
    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Location</Text>
        <Text style={styles.subtitle}>Select your location on the map!</Text>
        <View style={styles.map_container}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: selectedLocation ? selectedLocation.latitude : 37.78825,
              longitude: selectedLocation ? selectedLocation.longitude : -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}>
            {selectedLocation && (
              <Marker coordinate={selectedLocation} title="Selected location" />
            )}
          </MapView>
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#D97904" />
            </View>
          )}
        </View>
        {!locationAcquired ? (
          <TouchableOpacity
            style={styles.button}
            onPress={getCurrentLocation}
            disabled={loading}>
            <LocationIcon style={styles.icon} />
            <Text style={styles.buttonText}>Use my current location</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            disabled={!selectedLocation}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        )}
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A0F0DCC',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 60,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#D97904',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55,
  },
  buttonText: {
    fontFamily: 'Roboto_500',
    color: '#FFFFFF',
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default Step7;
