//TABS LAYOUT

import { Tabs } from 'expo-router';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';


export default function TabsLayout() {
    return (
      <Tabs
        initialRouteName="home"
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
                backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#25292e',
            },
        }}
        tabBar={(props) =>
          (
            <BottomTabBar {...props} />
          )
        }
      >
        <Tabs.Screen
          name="Entries"
          options={{
            href: "/Entries",
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'list-sharp' : 'list-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="Account"
          options={{
            href: {
              pathname: "/Account",
            },
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="Factors"
          options={{
            href: {
              pathname: "/Factors",
            },
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'heart-circle-sharp' : 'heart-circle-outline'} color={color} size={24} />
            ),
          }}
        />
      </Tabs>
    );
  }
