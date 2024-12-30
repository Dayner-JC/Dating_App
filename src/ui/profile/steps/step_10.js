import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import InputIcon from '../../../assets/icons/input.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';
import Button from '../../components/button';

const Step10 = ({ onNext, onChangeData }) => {
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);

  const handleSelectPhoto = (index) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('Selección de imagen cancelada.');
        } else if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const newPhotos = [...photos];
          newPhotos[index] = response.assets[0].uri;
          setPhotos(newPhotos);
        }
      }
    );
  };

  const handleDeletePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    setPhotos(newPhotos);
  };

  const handleContinue = () => {
    onChangeData('photos', photos);
    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Photos</Text>
        <Text style={styles.subtitle}>
          Upload your photos and videos. Upload at least 1 photo to start. Add 4 or more to shine.
        </Text>
        <View style={styles.photoGrid}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoWrapper}>
              <TouchableOpacity
                style={[
                  styles.photoContainer,
                  photo ? styles.solidBorder : styles.dashedBorder,
                ]}
                onPress={() => handleSelectPhoto(index)}
              >
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.photo} />
                ) : (
                  <View style={styles.placeholder}>
                    <InputIcon width={'100%'} height={'100%'} />
                  </View>
                )}
              </TouchableOpacity>
              {photo && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeletePhoto(index)}
                >
                  <DeleteIcon />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        <Button
          title="Complete"
          fontSize={16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width={'100%'}
          height={55}
          onPress={handleContinue}
          disabled={photos.filter(Boolean).length < 1}
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
  content: {
    width: '85%',
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
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 35,
  },
  photoWrapper: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 20,
    position: 'relative',
  },
  photoContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashedBorder: {
    borderWidth: 1,
    borderColor: '#525853',
    borderStyle: 'dashed',
  },
  solidBorder: {
    borderWidth: 1,
    borderColor: '#525853',
    borderStyle: 'solid',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5258531A',
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  deleteText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 900,
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

export default Step10;
