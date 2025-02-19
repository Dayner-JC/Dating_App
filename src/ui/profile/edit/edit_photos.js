import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import InputIcon from '../../../assets/icons/input.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {readFile} from 'react-native-fs';
import API_BASE_URL from '../../../config/config';

const EditPhotos = ({route}) => {
  const navigation = useNavigation();
  const {uid} = route.params;

  const [photos, setPhotos] = useState(Array(6).fill(null));

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile/photos/get`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({userId: uid}),
        });

        const data = await response.json();
        if (data.success) {
          const updatedPhotos = Array(6).fill(null);
          data.images.forEach((url, index) => {
            if (url) {
              updatedPhotos[index] = {original: true, uri: url};
            }
          });
          setPhotos(updatedPhotos);
        } else {
          Alert.alert(
            'Error',
            data.error,
          );
        }
      } catch (error) {
        Alert.alert('Error', error);
      }
    };

    fetchPhotos();
  }, [uid]);

  const handleSelectPhoto = index => {
    const options = {mediaType: 'photo', quality: 1};
    launchImageLibrary(options, async response => {
      if (response.didCancel || response.errorMessage) {
        return;
      }
      if (response.assets?.[0]) {
        try {
          const selectedImage = response.assets[0];
          const base64Image = await readFile(selectedImage.uri, 'base64');
          const newPhoto = {
            original: false,
            image: base64Image,
            fileName: selectedImage.fileName || `image_${index}.jpg`,
            type: selectedImage.type || 'image/jpeg',
          };
          const updatedPhotos = [...photos];
          updatedPhotos[index] = newPhoto;
          setPhotos(updatedPhotos);
        } catch (error) {
          Alert.alert('Error', error);
        }
      }
    });
  };

  const handleDeletePhoto = index => {
    const updatedPhotos = [...photos];
    updatedPhotos[index] = null;
    setPhotos(updatedPhotos);
  };

  const getPhotoUri = index => {
    const photo = photos[index];
    if (!photo) {
      return null;
    }
    return photo.original
      ? photo.uri
      : `data:${photo.type};base64,${photo.image}`;
  };

  const handleSaveChanges = async () => {
    try {
      const mergedPhotos = photos
        .filter(photo => photo !== null)
        .map(photo =>
          photo.original
            ? {original: true, uri: photo.uri}
            : {
                original: false,
                image: photo.image,
                type: photo.type,
                fileName: photo.fileName,
              },
        );

      const response = await fetch(`${API_BASE_URL}/profile/edit/edit-photos`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId: uid, photos: mergedPhotos}),
      });

      const data = await response.json();
      if (data.success) {
        navigation.goBack();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Photos</Text>
        <View style={styles.photoGrid}>
          {Array.from({length: 6}).map((_, index) => {
            const uri = getPhotoUri(index);
            return (
              <View key={index} style={styles.photoWrapper}>
                <TouchableOpacity
                  style={[
                    styles.photoContainer,
                    uri ? styles.solidBorder : styles.dashedBorder,
                  ]}
                  onPress={() => handleSelectPhoto(index)}>
                  {uri ? (
                    <Image source={{uri}} style={styles.photo} />
                  ) : (
                    <View style={styles.placeholder}>
                      <InputIcon width="100%" height="100%" />
                    </View>
                  )}
                </TouchableOpacity>
                {uri && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeletePhoto(index)}>
                    <DeleteIcon />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
        <Button
          title="Save changes"
          fontSize={16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width="100%"
          height={55}
          onPress={handleSaveChanges}
          disabled={photos.every(photo => photo === null)}
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
    shadowOffset: {width: 0, height: 2},
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

export default EditPhotos;
