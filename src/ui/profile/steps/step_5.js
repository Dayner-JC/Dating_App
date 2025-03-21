import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import Button from '../../components/button';

const Step5 = ({ onNext, onChangeData }) => {
  const [unit, setUnit] = useState('cm');
  const [selectedHeight, setSelectedHeight] = useState(160);
  const listRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const cmHeights = Array.from({ length: 71 }, (_, i) => 140 + i);
  const ftHeights = cmHeights.map((cm) => (cm / 30.48).toFixed(2));

  const currentHeights = unit === 'cm' ? cmHeights : ftHeights;

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
    onChangeData('height', currentHeights[index] + ` ${unit}`);
    console.log('height: ', currentHeights[index] + ` ${unit}`);
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Height</Text>
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
                { useNativeDriver: true }
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
          title="Continue"
          fontSize={16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width={'100%'}
          height={55}
          onPress={onNext}
          disabled={!selectedHeight}
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

export default Step5;
