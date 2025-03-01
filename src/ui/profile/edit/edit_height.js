import React, { useState, useRef, useEffect, Alert } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import Button from '../../components/button';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';
import Background from '../../../assets/backgrounds/edits.svg';

const EditHeight = ({route}) => {
  const navigation = useNavigation();
  const { uid } = route.params;
  const [unit, setUnit] = useState('cm');
  const [selectedHeight, setSelectedHeight] = useState(160);
  const listRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const cmHeights = Array.from({ length: 71 }, (_, i) => 140 + i);
  const ftHeights = cmHeights.map((cm) => (cm / 30.48).toFixed(2));

  const currentHeights = unit === 'cm' ? cmHeights : ftHeights;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
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
          const heightData = data.height || '';
          if (heightData) {
            const [value, unitFromData] = heightData.split(' ');
            const numericValue = parseFloat(value);
            if (unitFromData === 'ft') {
              setUnit('ft');
              setSelectedHeight(numericValue);
            } else {
              setUnit('cm');
              setSelectedHeight(Math.round(numericValue));
            }
          }
        } else {
          Alert.alert('Error', data.error || 'Failed to load user data.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data.');
      }
    };

    fetchUserData();
  }, [uid]);

  useEffect(() => {
    const index = currentHeights.indexOf(selectedHeight);
    if (listRef.current && index !== -1) {
      listRef.current.scrollToOffset({ offset: index * 40, animated: true });
    }
  }, [currentHeights, selectedHeight, unit]);

  const handleUnitToggle = (newUnit) => {
    if (newUnit !== unit) {
      const equivalentHeight =
        newUnit === 'cm'
          ? Math.round(selectedHeight * 30.48)
          : (selectedHeight / 30.48).toFixed(2);

      setUnit(newUnit);
      setSelectedHeight(equivalentHeight);

      const index = currentHeights.indexOf(parseFloat(equivalentHeight));
      if (listRef.current && index !== -1) {
        listRef.current.scrollToOffset({ offset: index * 40, animated: true });
      }
    }
  };

  const handleScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / 40);
    setSelectedHeight(currentHeights[index]);
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 2) * 40,
      index * 40,
      (index + 2) * 40,
    ];
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });
    const color = scrollY.interpolate({
      inputRange,
      outputRange: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.heightOption,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.heightText,
            {
              color,
            },
          ]}
        >
          {unit === 'cm' ? `${item} cm` : `${item} ft`}
        </Animated.Text>
      </Animated.View>
    );
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/edit/edit-height`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: uid,
          height: selectedHeight + ` ${unit}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigation.goBack();
      } else {
        Alert.alert(data.error || 'Error updating height.');
      }
    } catch (error) {
      console.error('Error updating height:', error);
      Alert.alert('Failed to update height.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
         <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <Background style={styles.background} />
      <View style={styles.content}>
        <Text style={styles.title}>Edit Height</Text>
        <Text style={styles.subtitle}>How tall are you?</Text>

        <View style={styles.select_container}>
          <View style={styles.listContainer}>
            <Animated.FlatList
              data={currentHeights}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              ref={listRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={40}
              decelerationRate="fast"
              onMomentumScrollEnd={handleScrollEnd}
              contentContainerStyle={{ paddingVertical: 80 }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true },
              )}
            />

            <View style={styles.centerLines}>
              <View style={styles.line} />
              <View style={styles.line} />
            </View>
          </View>

          <View style={styles.unitToggle}>
            <View style={styles.toggle_container}>
              <Button
                title="cm"
                backgroundColor="transparent"
                selectedBackgroundColor="#D97904"
                isSelected={unit === 'cm'}
                borderRadius={40}
                marginHorizontal={5}
                height={40}
                width={64}
                onPress={() => handleUnitToggle('cm')}
              />
              <Button
                title="ft"
                backgroundColor="transparent"
                selectedBackgroundColor="#D97904"
                isSelected={unit === 'ft'}
                borderRadius={40}
                marginHorizontal={5}
                height={40}
                width={64}
                onPress={() => handleUnitToggle('ft')}
              />
            </View>
          </View>
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
          disabled={!selectedHeight}
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
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  content: {
    flex: 1,
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
  select_container: {
    marginVertical: 35,
  },
  listContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  centerLines: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'space-between',
    pointerEvents: 'none',
  },
  line: {
    height: 1,
    backgroundColor: '#D97904',
    opacity: 0.8,
  },
  heightOption: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heightText: {
    fontSize: 18,
    color: '#D9D2B080',
    fontFamily: 'Roboto_400',
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Roboto_400',
  },
  unitToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toggle_container: {
    flexDirection: 'row',
    backgroundColor: '#D979041A',
    borderRadius: 40,
  },
  unitButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#D979041A',
    borderRadius: 40,
    marginHorizontal: 5,
    height: 40,
  },
  selectedUnitButton: {
    backgroundColor: '#D97904E5',
  },
  unitText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Roboto_500',
  },
  selectedUnitText: {
    color: '#FFFFFF',
  },
});

export default EditHeight;
