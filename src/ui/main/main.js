/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeFragment from '../main/fragments/home_fragment';
import FavoritesFragment from '../main/fragments/favorites_fragment';
import MessagesFragment from '../main/fragments/messages_fragment';
import ProfileFragment from '../main/fragments/profile_fragment';
import { StyleSheet } from 'react-native';
import HomeIcon from '../../assets/icons/home.svg';
import FavoritesIcon from '../../assets/icons/matches.svg';
import MessagesIcon from '../../assets/icons/chat.svg';
import HomeAppBar from './appBars/home_appBar';
import FavoritesAppBar from './appBars/favorites_appBar';
import MessagesAppBar from './appBars/messages_appBar';
import ProfileAppBar from './appBars/profile_appBar';
import ProfileIcon from '../../assets/icons/profile_icon';

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeFragment}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              fill={focused ? '#D9D2B0' : 'transparent'}
              stroke={focused ? '#17261F' : 'white'}
            />
          ),
          header: () => <HomeAppBar />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesFragment}
        options={{
          tabBarIcon: ({ focused }) => (
            <FavoritesIcon
              fill={focused ? '#D9D2B0' : 'transparent'}
              stroke={focused ? '#17261F' : 'white'}
            />
          ),
          header: () => <FavoritesAppBar />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesFragment}
        options={{
          tabBarIcon: ({ focused }) => (
            <MessagesIcon
              fill={focused ? '#D9D2B0' : 'transparent'}
              stroke={focused ? '#17261F' : 'white'}
            />
          ),
          header: () => <MessagesAppBar />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileFragment}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
            focused={focused}
            />
          ),
          header: () => <ProfileAppBar />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#17261F',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    display: 'none',
  },
  tabBarIcon: {
    marginVertical: 'auto',
  },
});

export default Main;
