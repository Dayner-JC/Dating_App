import React from 'react';
import { ScrollView, Text, View, StyleSheet, StatusBar } from 'react-native';
import IconButton from '../../../components/icon_button';
import ArrowIcon from '../../../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A0F0D" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.screen_title}>Privacy Policy</Text>
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Text style={styles.effectiveDateTitle}>Effective Date:</Text>
      <Text style={styles.effectiveDate}>January 1st, 2025</Text>

      <Text style={styles.title}>Welcome to <Text style={styles.subsectionTitle}>Dating App!</Text></Text>
      <Text style={styles.paragraph}>
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app. By using our services, you agree to the terms outlined in this policy.
      </Text>

      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.paragraph}>
        At Dating App, we value your trust. This Privacy Policy outlines how we handle your data to ensure your experience is safe, enjoyable, and personalized.
      </Text>

      <Text style={styles.sectionTitle}>2. Data We Collect</Text>
      <Text style={styles.paragraph}>We collect the following types of data:</Text>

      <Text style={styles.subsectionTitle}>a. Information You Provide:</Text>
      <Text style={styles.bulletPoint}>- Name, email, date of birth, gender, and profile photo.</Text>
      <Text style={styles.bulletPoint}>- Preferences, interests, and other details shared in your profile.</Text>
      <Text style={styles.bulletPoint}>- Messages and interactions with other users.</Text>

      <Text style={styles.subsectionTitle}>b. Information We Collect Automatically:</Text>
      <Text style={styles.bulletPoint}>- Device details (e.g., operating system, browser type).</Text>
      <Text style={styles.bulletPoint}>- IP address and geolocation data.</Text>
      <Text style={styles.bulletPoint}>- Activity logs (e.g., login times, viewed profiles).</Text>

      <Text style={styles.subsectionTitle}>c. Sensitive Data:</Text>
      <Text style={styles.bulletPoint}>
        - Information related to gender, sexual orientation, or other preferences (optional and provided with your consent).
      </Text>

      <Text style={styles.sectionTitle}>3. How We Use Your Data</Text>
      <Text style={styles.paragraph}>We use your data for the following purposes:</Text>
      <Text style={styles.bulletPoint}> <Text style={styles.point_title}>- Personalization:</Text> To recommend matches based on your preferences.</Text>
      <Text style={styles.bulletPoint}> <Text style={styles.point_title}>- Communication:</Text> To notify you about matches, messages, and app updates.</Text>
      <Text style={styles.bulletPoint}> <Text style={styles.point_title}>- Security:</Text> To prevent fraud, ensure user safety, and enforce community guidelines.</Text>
      <Text style={styles.bulletPoint}>- Improvement: To analyze app usage and enhance features.</Text>

      <Text style={styles.sectionTitle}>4. Sharing Your Data</Text>
      <Text style={styles.paragraph}>We may share your data with:</Text>
      <Text style={styles.bulletPoint}> <Text style={styles.point_title}>- Service Providers:</Text> For payment processing, analytics, or customer support.</Text>
      <Text style={styles.bulletPoint}> <Text style={styles.point_title}>- Legal Authorities:</Text> To comply with laws, regulations, or legal processes.</Text>
      <Text style={styles.bulletPoint}> <Text style={styles.point_title}>- Other Users:</Text> Limited information (e.g., profile details) as part of the app’s functionality.</Text>
      <Text style={styles.italic}>*We do not sell your personal data to third parties.</Text>

      <Text style={styles.sectionTitle}>5. Data Protection Measures</Text>
      <Text style={styles.paragraph}>We take the security of your data seriously and implement the following measures:</Text>
      <Text style={styles.bulletPoint}>- Data encryption in transit and at rest.</Text>
      <Text style={styles.bulletPoint}>- Regular security assessments and updates.</Text>
      <Text style={styles.bulletPoint}>- Restricted access to personal information.</Text>

      <Text style={styles.sectionTitle}>6. Your Rights</Text>
      <Text style={styles.paragraph}>You have the following rights regarding your data:</Text>
      <Text style={styles.bulletPoint}> <Text style={styles.point_title}>- Access and Correction:</Text> View and update your personal information.</Text>
      <Text style={styles.bulletPoint}> <Text style={styles.point_title}>- Data Deletion:</Text> Request to delete your account and associated data.</Text>
      <Text style={styles.bulletPoint}> <Text style={styles.point_title}>- Withdraw Consent:</Text> Adjust your preferences for data collection and usage.</Text>
      <Text style={styles.paragraph}>
        To exercise these rights, go to <Text style={styles.privacy} onPress={()=>navigation.navigate('PrivacyManagementScreen')}>Privacy Management</Text> in the app or contact us at <Text style={styles.email}  onPress={()=>{}}>privacy@datingapp.com</Text>
      </Text>

      <Text style={styles.sectionTitle}>7. Cookies and Tracking Technologies</Text>
      <Text style={styles.paragraph}>
        We use cookies and similar technologies to:
      </Text>
      <Text style={styles.bulletPoint}>- Improve app functionality.</Text>
      <Text style={styles.bulletPoint}>- Understand user behavior.</Text>
      <Text style={styles.bulletPoint}>- Provide relevant recommendations.</Text>
      <Text style={styles.paragraph}>
        You can disable cookies through your device settings, but this may impact app functionality.
      </Text>

      <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
      <Text style={styles.paragraph}>
        We may update this Privacy Policy periodically. When changes occur, we will notify you via the app or email. The "Effective Date" at the top of this policy indicates the latest update.
      </Text>

      <Text style={styles.sectionTitle}>9. Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions or concerns about this Privacy Policy, feel free to contact us:
      </Text>
      <View style={styles.email_container}>
      <Text style={styles.bold}>- Email: <Text style={styles.email} onPress={()=>{}}>privacy@datingapp.com</Text></Text>
      </View>
      <Text style={styles.paragraph}>
        Thank you for trusting <Text style={styles.subsectionTitle}>Dating App</Text> to connect and share with others. We are committed to protecting your privacy and providing a safe platform for all users.
      </Text>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
  },
  scrollView: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#0A0F0D',
    width: '100%',
    paddingStart: 10,
  },
  screen_title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 32,
    color: '#D9D2B0',
    paddingStart: 20,
    paddingTop: 20,
  },
  effectiveDateTitle: {
    fontFamily: 'Roboto_700',
    color: '#D9D2B0',
    fontSize: 12,
    marginBottom: 2,
  },
  effectiveDate: {
    color: '#E5E5E5',
    fontSize: 14,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 22,
  },
  paragraph: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 22,
  },
  sectionTitle: {
    fontFamily: 'Roboto_600',
    color: '#D9D2B0',
    fontSize: 16,
    marginTop: 10,
  },
  subsectionTitle: {
    fontFamily: 'Roboto_700',
    color: '#E5E5E5',
    fontSize: 16,
  },
  bulletPoint: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 15,
  },
  italic: {
    fontFamily: 'Roboto_500',
    color: '#FFFFFF',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  email_container: {
    marginTop: 5,
    marginBottom: 10,
  },
  email:{
    fontFamily: 'Roboto_400',
    color: '#D9D2B0',
    fontSize: 14,
  },
  bold:{
    fontFamily: 'Roboto_700',
    fontSize: 14,
    marginLeft: 15,
    color: '#FFFFFF',
  },
  privacy:{
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D97904',
  },
  point_title: {
    fontFamily: 'Roboto_700',
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 15,
  },
});

export default PrivacyPolicyScreen;
