/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import ArrowDown from '../../assets/icons/chevron-down.svg';
import IconButton from '../components/icon_button';
import ArrowIcon from '../../assets/icons/arrow-left.svg';
import EmailIcon from '../../assets/icons/sms.svg';
import SearchIcon from '../../assets/icons/search.svg';
import {useNavigation} from '@react-navigation/native';
import API_BASE_URL from '../../config/config';

const HelpCenterScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedSection, setSelectedSection] = useState('FAQs');

  const [helpItems, setHelpItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHelpItems = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/help_center/get`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHelpItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar backgroundColor="#0A0F0D" />
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  const categories = [
    'All',
    'Account & Profile',
    'Matches & Messaging',
    'Privacy & Security',
    'Technical Issues',
  ];

  const filteredItems = helpItems.filter(item => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExpandItem = title => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  const renderFAQsSection = () => (
    <>
      <View style={styles.searchContainer}>
        <SearchIcon width={20} height={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#D9D2B066"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoryScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{width: 12}} />
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonSelected,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category &&
                    styles.categoryButtonTextSelected,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={{width: 12}} />
        </ScrollView>
      </View>

      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {filteredItems.map(item => (
          <View key={item.title} style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.itemHeader}
              onPress={() => handleExpandItem(item.title)}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <ArrowDown
                width={20}
                height={20}
                style={{
                  transform: [
                    {rotate: expandedItem === item.title ? '180deg' : '0deg'},
                  ],
                }}
              />
            </TouchableOpacity>
            {expandedItem === item.title && (
              <Text style={styles.itemDescription}>{item.description}</Text>
            )}
          </View>
        ))}
        <View style={{height: 20}} />
      </ScrollView>
    </>
  );

  const renderContactUsSection = () => (
    <View style={styles.contactUsContainer}>
      <View style={styles.header}>
        <EmailIcon />
        <Text style={styles.header_text}>Email Support</Text>
      </View>
      <Text style={styles.contactUsEmail}>support@datingapp.com</Text>
      <Text style={styles.contactUsText}>
        For detailed issues, send us an email. Our team will respond within
        24-48 hours.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A0F0D" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.title}>Help Center</Text>

      <View style={styles.sectionButtons}>
        <TouchableOpacity
          style={[
            styles.sectionButton,
            selectedSection === 'FAQs' && styles.sectionButtonSelected,
          ]}
          onPress={() => setSelectedSection('FAQs')}>
          <Text
            style={[
              styles.sectionButtonText,
              selectedSection === 'FAQs' && styles.sectionButtonTextSelected,
            ]}>
            FAQs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sectionButton,
            selectedSection === 'Contact Us' && styles.sectionButtonSelected,
          ]}
          onPress={() => setSelectedSection('Contact Us')}>
          <Text
            style={[
              styles.sectionButtonText,
              selectedSection === 'Contact Us' &&
                styles.sectionButtonTextSelected,
            ]}>
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divisor} />

      {selectedSection === 'FAQs'
        ? renderFAQsSection()
        : renderContactUsSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
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
    textAlign: 'left',
    marginStart: 20,
    marginVertical: 20,
  },
  sectionButtons: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  sectionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  sectionButtonSelected: {
    borderBottomColor: '#D97904',
  },
  sectionButtonText: {
    fontFamily: 'Roboto_500',
    fontSize: 16,
    color: '#B8B8B8',
  },
  sectionButtonTextSelected: {
    color: '#D97904',
  },
  divisor: {
    height: 1,
    width: '100%',
    backgroundColor: '#525853',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#525853',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 20,
    marginVertical: 20,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  categoryScroll: {
    marginBottom: 10,
  },
  categoryButton: {
    height: 36,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5258531A',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#525853',
  },
  categoryButtonSelected: {
    backgroundColor: '#D97904',
    borderWidth: 1,
    borderColor: '#D97904',
  },
  categoryButtonText: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
  },
  categoryButtonTextSelected: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#FFFFFF',
  },
  itemsList: {
    flex: 1,
    marginTop: 10,
  },
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222322',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontFamily: 'Roboto_500',
    fontSize: 16,
    color: '#FFFFFF',
  },
  itemDescription: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 8,
  },
  contactUsContainer: {
    padding: 20,
  },
  contactUsText: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 8,
  },
  contactUsEmail: {
    fontFamily: 'Roboto_500',
    fontSize: 16,
    color: '#D97904',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
  },
  header_text: {
    fontFamily: 'Roboto_500',
    fontSize: 16,
    color: '#FFFFFF',
    paddingStart: 10,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A0F0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HelpCenterScreen;
