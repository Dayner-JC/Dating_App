import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../components/icon_button';
import ArrowIcon from '../../assets/icons/arrow-left.svg';

const ListMatchesScreen = () => {
  const navigation = useNavigation();

  const [matches] = React.useState([
    { id: 1, name: 'Brandi', age: 22, date: '45 seconds ago', avatar: 'https://static1.bigstockphoto.com/1/7/2/large1500/27169880.jpg' },
    { id: 2, name: 'Claire', age: 28, date: '5 minutes ago', avatar: 'https://th.bing.com/th/id/R.6db076ba1e4078e3e20d6463b29b072d?rik=EPWU4cEYyDavmg&riu=http%3a%2f%2fcdn3.upsocl.com%2fwp-content%2fuploads%2f2014%2f03%2f268.jpg&ehk=yfLWWyMuDKwwoodDORRXdGBs79s04AL3oqoOUz3OPYc%3d&risl=&pid=ImgRaw&r=0' },
  ]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A0F0D" />

      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>

      <Text style={styles.title}>List of Matches</Text>

      <ScrollView>
        {matches.map((user) => (
          <View key={user.id} style={styles.userItem}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />

            <Text style={styles.userName}>
              {user.name}, {user.age} {'\n'}<Text style={styles.userDate}>{user.date}</Text>
            </Text>

            <TouchableOpacity style={styles.chatButton}>
              <Text style={styles.chatButtonText}>Chat Now</Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
    paddingBottom: 20,
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#0A0F0D',
    width: '100%',
    paddingStart: 10,
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 32,
    color: '#D9D2B0',
    marginStart: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  userName: {
    fontFamily: 'Roboto_600',
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  userDate: {
    fontFamily: 'Inter_300',
    flex: 1,
    color: '#D9D2B0',
    fontSize: 12,
  },
  chatButton: {
    backgroundColor: '#0000001A',
    borderRadius: 100,
    width: 106,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },
  chatButtonText: {
    fontFamily: 'Roboto_500',
    fontSize: 13,
    color: '#FFFFFF',
  },
});

export default ListMatchesScreen;
