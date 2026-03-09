import React from "react";
import { Tabs } from "expo-router";
import { COLORS } from '@/constants'
import { Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

export default function TabLayout() {
  return (
      <Tabs
          screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveBackgroundColor: "#CDCDE0",
              tabBarShowLabel: false,
              tabBarStyle: {
                  backgroundColor: "#fff",
                  borderTopWidth: 1,
                  borderTopColor: '#F0F0F0',
                  height: 56,
                  paddingTop: 8
              }
      }}
      >
          <Tabs.Screen name="index" options={{
              tabBarIcon: ({ color, focused }) => <Ionicons name={
                  focused? 'home' : 'home-outline'}  size={26} color={color}/>
          }} />

          <Tabs.Screen name="cart" options={{
              tabBarIcon: ({ focused, color }) => <Feather
                  name={focused ? 'shopping-cart' : 'shopping-cart'}
                  size={26} 
                  color={color} />
          }} />

          <Tabs.Screen name="favorite" options={{
              tabBarIcon: ({ focused, color }) => <Ionicons
                  name={focused ? 'heart' : 'heart-outline'}
                  size={26} 
                  color={color} />
          }} />

          <Tabs.Screen name="profile" options={{
              tabBarIcon: ({ focused, color }) => <Ionicons
                  name={focused ? 'person' : 'person-outline'}
                  size={26} 
                  color={color} />
          }} />
    </Tabs>
  );
}