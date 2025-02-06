import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';


import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';

export default function TabLayout() {
  const tabBarHeight = 70;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: true,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
      
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            height: tabBarHeight,
            
          },
          default: {
            height: tabBarHeight,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <Octicons size={28} name="search" color={color} />,
          headerShown: false,
        }}
        
        />
      <Tabs.Screen
        name="bookmarks"
        options={{
          headerShown: false,
          title: 'Bookmarks',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="bookmark" color={color} />,

        }}
      />
    </Tabs>
  );
}
