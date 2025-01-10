import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Button from '../../components/button';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';

const EditLocation = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log(`[handleMapPress] Map pressed at Latitude=${latitude}, Longitude=${longitude}`);

    setSelectedLocation({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
         <IconButton icon={<ArrowIcon />} onPress={()=>{}} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Location</Text>
        <Text style={styles.subtitle}>Share your location to meet nearby people!</Text>
        <View style={styles.map_container}>
          <MapView
            style={styles.map}
            region={mapRegion}
            onRegionChangeComplete={setMapRegion}
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
          title="Save changes"
          onPress={() => {}}
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor = "#a2a8a5"
          borderRadius={100}
          width="100%"
          height={55}
          disabled={!selectedLocation}
        />
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
          onPress={() => {}}
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
    backgroundColor: '#17261F',
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#17261F',
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
    borderRadius: 4,
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
