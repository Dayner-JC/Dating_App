import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Button from '../components/button';
import { useNavigation } from '@react-navigation/native';
import Img from '../../assets/create_profile.svg';
import Petal1 from '../../assets/splash_screen_flower/petals/petal_15.svg';
import Petal2 from '../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal3 from '../../assets/splash_screen_flower/petals/petal_16.svg';

const CreateProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
        <View style={styles.petal_1}>
            <Petal1/>
        </View>
        <View style={styles.content}>
        <Img/>
      <Text style={styles.description}>
      Love starts with you; share more to find your match.
      </Text>
        <Button
          title="Create Profile"
          fontSize = {16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          borderRadius={100}
          width={'100%'}
          height={55}
          onPress={() => navigation.navigate('ProfileCreationSteps')}
        />
        </View>
        <View style={styles.bottom_petals}>
            <Petal2 style={styles.petal_2}/>
            <Petal3 style={styles.petal_3}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17261F',
},
content: {
    width: '85%',
    alignItems: 'center',
},
  description: {
    fontFamily: 'GreatMangoDemo',
    color: '#D9D2B0',
    fontSize: 46,
    marginVertical: 30,
},
petal_1: {
    width: '100%',
    alignItems: 'flex-end',
    paddingEnd: 10,
},
bottom_petals: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: '50',
    justifyContent: 'space-between',
},
petal_2: {
    marginStart: 70,
    marginTop: 5,
},
petal_3: {
    marginEnd: 140,
},
});

export default CreateProfileScreen;
