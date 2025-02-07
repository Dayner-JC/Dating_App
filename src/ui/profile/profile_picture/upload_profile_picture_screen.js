import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import InputIcon from '../../../assets/icons/input.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';
import Button from '../../components/button';
import { useNavigation } from '@react-navigation/native';
import { readFile } from 'react-native-fs';
import API_BASE_URL from '../../../config/config';

const UploadProfilePictureScreen = ({route}) => {
  const navigation = useNavigation();
  const {uid} = route.params;
  const [photo, setPhoto] = useState(null);

  const handleSelectPhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, async (response) => {
      if (response.errorMessage) {
        Alert.alert('Error selecting image', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        try {
          const selectedImage = response.assets[0];
          const base64Image = await readFile(selectedImage.uri, 'base64');
          const imagePayload = {
            image: base64Image,
            fileName: selectedImage.fileName,
            type: selectedImage.type,
          };
          setPhoto(imagePayload);
        } catch (error) {
          Alert.alert('Error', 'Could not process the image');
        }
      }
    });
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
  };

  const handleSaveChanges = async () => {

    try {
      const response = await fetch(`${API_BASE_URL}/profile/photos/upload-profile-picture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: uid,
          photo: photo,
        }),
      });

      const data = await response.json();
      if (data.success) {
        navigation.goBack();
      } else {
        Alert.alert(data.error || 'Error updating photo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Couldn\'t save photo.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Profile Picture</Text>
        <Text style={styles.subtitle}>
          Upload your profile picture. Add a photo to personalize your profile.
        </Text>
        <View style={styles.photoWrapper}>
          <TouchableOpacity
            style={[
              styles.photoContainer,
              photo ? styles.solidBorder : styles.dashedBorder,
            ]}
            onPress={handleSelectPhoto}
          >
            {photo ? (
              <Image
                source={{ uri: `data:${photo.type};base64,${photo.image}` }}
                style={styles.photo}
              />
            ) : (
              <View style={styles.placeholder}>
                <InputIcon width={'100%'} height={'100%'} />
              </View>
            )}
          </TouchableOpacity>
          {photo && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeletePhoto}
            >
              <DeleteIcon />
            </TouchableOpacity>
          )}
        </View>
        <Button
          title="Save changes"
          fontSize={16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width={'100%'}
          height={55}
          onPress={handleSaveChanges}
          disabled={!photo}
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
    marginBottom: 20,
  },
  photoWrapper: {
    width: '100%',
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

export default UploadProfilePictureScreen;
