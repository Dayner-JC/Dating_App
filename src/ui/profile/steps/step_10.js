import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { readFile } from 'react-native-fs';
import InputIcon from '../../../assets/icons/input.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import Button from '../../components/button';
import API_BASE_URL from '../../../config/config';
import auth from '@react-native-firebase/auth';

const Step10 = ({ onNext, onChangeData }) => {
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);
  const [loading, setLoading] = useState(false);

  const handleSelectPhoto = (index) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        Alert.alert('Selection cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error selecting image', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        try {
          const selectedImage = response.assets[0];
          const base64Image = await readFile(selectedImage.uri, 'base64');

          const imagePayload = {
            image: base64Image,
            fileName: selectedImage.fileName || `image_${index}.jpg`,
            type: selectedImage.type || 'image/jpeg',
          };

          const newPhotos = [...photos];
          newPhotos[index] = imagePayload;
          setPhotos(newPhotos);
        } catch (error) {
          Alert.alert('Error', 'Unable to process the image');
          console.error('Error reading the image:', error);
        }
      }
    });
  };

  const uploadPhotos = async () => {
    const user = auth().currentUser;
    try {
      const response = await fetch(`${API_BASE_URL}/profile/photos/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          photos: photos,
        }),
      });

      const data = await response.json();

      if (data.success) {
        handleContinue();
      } else {
        Alert.alert(data.error || 'Error updating photos.');
      }
    } catch (error) {
      console.error('Error updating photos:', error);
      Alert.alert('Failed to update photos.');
    }
};

  const handleDeletePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    setPhotos(newPhotos);
  };

  const handleContinue = () => {
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
                  <Image source={{ uri: `data:${photo.type};base64,${photo.image}` }} style={styles.photo} />
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
        {loading ? (
          <ActivityIndicator size="large" color="#D97904" />
        ) : (
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
            onPress={uploadPhotos}
            disabled={photos.filter(Boolean).length < 1}
          />
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
});

export default Step10;
