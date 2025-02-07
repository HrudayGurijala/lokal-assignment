import { Tabs,Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';


export default function TabLayout() {
  const tabBarHeight = 70;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: true,
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarStyle: Platform.select({
          ios: {
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
          tabBarIcon: ({ color }) => <FontAwesome6 size={26} name="bookmark" color={color} />,

        }}
      />
    </Tabs>
  );
}
