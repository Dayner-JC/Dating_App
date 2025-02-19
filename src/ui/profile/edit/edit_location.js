/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import LocationIcon from '../../../assets/icons/gps.svg';
import Button from '../../components/button';
import API_BASE_URL from '../../../config/config';

const EditLocation = ({ route }) => {
  const navigation = useNavigation();
  const { uid } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [locationAcquired, setLocationAcquired] = useState(false);
  const mapRef = useRef(null);

  const forwardGeocode = useCallback(async (address) => {
    try {
      const query = `${address.city}, ${address.state}, ${address.country}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        return { latitude, longitude };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/profile/request-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: uid,
          }),
        });
        const data = await response.json();
        if (data.success) {
          const locationData = data.location;
          setAddress(locationData);
          const coordinates = await forwardGeocode(locationData);
          if (coordinates) {
            setSelectedLocation(coordinates);
            if (mapRef.current) {
              mapRef.current.animateToRegion(
                {
                  ...coordinates,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                },
                1000
              );
            }
          }
        } else {
          Alert.alert('Error', data.error || 'Failed to load user data.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid, forwardGeocode]);

  const reverseGeocode = useCallback(async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      setAddress(data.address);
    } catch (error) {
    }
  }, []);

  const getCurrentLocation = useCallback(() => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
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
            1000
          );
        }
        setLoading(false);
        setLocationAcquired(true);
      },
      (error) => {
        Alert.alert('Error', error);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, [reverseGeocode]);

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const newLocation = { latitude, longitude };
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
        1000
      );
    }
  };

  const handleContinue = async () => {
    const locationData = {
      address,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/profile/edit/edit-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: uid,
          location: locationData,
        }),
      });
      const data = await response.json();
      if (data.success) {
        navigation.goBack();
      } else {
        Alert.alert(data.error || 'Error updating location.');
      }
    } catch (error) {
      Alert.alert('Failed to update location.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A0F0D" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
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
            onPress={handleMapPress}
          >
            {selectedLocation && (
              <Marker coordinate={selectedLocation} title="Selected location" />
            )}
          </MapView>
        </View>
        {loading && <ActivityIndicator style={{ marginBottom: 20 }} size="large" color="#D97904" />}
        {!locationAcquired ? (
          <TouchableOpacity style={styles.button} onPress={getCurrentLocation} disabled={loading}>
            <LocationIcon style={styles.icon} />
            <Text style={styles.buttonText}>Use my current location</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            disabled={!selectedLocation}
          >
            <Text style={styles.buttonText}>Save changes</Text>
          </TouchableOpacity>
        )}
        <Button
          title="Cancel"
          fontFamily="Roboto_500"
          fontSize={16}
          backgroundColor="transparent"
          borderWidth={1}
          borderColor="#747474"
          textColor="#D9D2B0"
          borderRadius={100}
          height={55}
          marginTop={10}
          onPress={() => navigation.goBack()}
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
    backgroundColor: '#0A0F0D',
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#0A0F0D',
    width: '100%',
    paddingStart: 10,
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

export default EditLocation;
