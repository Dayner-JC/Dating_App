import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/button';

const Step9 = ({ onNext, onChangeData }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const sections = [
    {
      title: '1. Arts & Creativity 🎨',
      items: ['Painting', 'Drawing', 'Photography', 'Writing', 'Poetry', 'Acting', 'Filmmaking', 'Music production', 'Dancing'],
    },
    {
      title: '2. Sports & Fitness 🏋️',
      items: ['Running', 'Yoga', 'Cycling', 'Gym workouts', 'Swimming', 'Hiking', 'Soccer', 'Football', 'Basketball', 'Tennis', 'Martial arts'],
    },
    {
      title: '3. Entertainment 🎬',
      items: ['Movies', 'Series binge-watching', 'Theater', 'Gaming', 'Live music', 'Concerts', 'Podcasts', 'Reading', 'Board games'],
    },
    {
      title: '4. Travel & Adventure ✈️',
      items: ['Solo traveling', 'Road trips', 'Camping', 'Backpacking', 'Beach trips', 'Skiing', 'Mountain climbing', 'Exploring new cities'],
    },
    {
      title: '5. Food & Drinks 🍴',
      items: ['Cooking', 'Baking', 'Trying new cuisines', 'Coffee lover', 'Wine tasting', 'Craft beer', 'Fine dining', 'Street food'],
    },
    {
      title: '6. Lifestyle & Wellness 🌱',
      items: ['Meditation', 'Journaling', 'Mindfulness', 'Self-care', 'Gardening', 'Sustainability', 'Minimalism', 'Personal growth'],
    },
    {
      title: '7. Learning & Personal Development 📚',
      items: ['Language learning', 'Coding', 'Science and tech', 'DIY projects', 'History', 'Philosophy', 'Entrepreneurship'],
    },
    {
      title: '8. Social Activities 🎉',
      items: ['Volunteering', 'Night outs', 'Festivals', 'Networking events', 'Community work', 'Meetups'],
    },
    {
      title: '9. Pets & Animals 🐾',
      items: ['Dogs', 'Cats', 'Wildlife', 'Animal rescue', 'Bird watching', 'Horse riding'],
    },
  ];

  const toggleItem = (item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((selected) => selected !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const handleNext = () => {
    onChangeData('interests', selectedItems);
    onNext();
  };

  return (
    <View style={styles.container}>
        <View style={styles.content}>
        <Text style={styles.title}>Interests</Text>
        <Text style={styles.subtitle}>
        Select the activities, hobbies, and passions that define you. It’ll help others get to know you better!
        </Text>
        <Text style={styles.subtitle}>Select at least 5 interests to start.</Text>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {sections.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.itemsContainer}>
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.item,
                    selectedItems.includes(item) && styles.itemSelected,
                  ]}
                  onPress={() => toggleItem(item)}
                >
                  <Text
                    style={
                      selectedItems.includes(item)
                        ? styles.itemTextSelected
                        : styles.itemText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <Button
        title="Continue"
        onPress={handleNext}
        fontFamily="Roboto_500"
        backgroundColor="#D97904"
        disabledBackgroundColor = "#8b580f"
        disabledTextColor = "#a2a8a5"
        borderRadius={100}
        marginBottom={20}
        width="100%"
        height={55}
        disabled={selectedItems.length < 5}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#17261F',
    width: '100%',
  },
  content: {
    width: '85%',
    height: '100%',
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
  scrollContainer: {
    flex: 1,
    marginVertical: 35,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Roboto_500',
    fontSize: 14,
    color: '#D9D2B0',
    marginBottom: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: '#525853',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#5258531A',
  },
  itemSelected: {
    backgroundColor: '#3A341B',
    borderColor: '#D97904',
  },
  itemText: {
    color: '#D9D2B0',
    fontSize: 14,
    fontFamily: 'Roboto_400',
  },
  itemTextSelected: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Step9;
