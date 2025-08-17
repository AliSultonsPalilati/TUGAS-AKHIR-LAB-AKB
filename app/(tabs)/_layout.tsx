import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#DB3022", 
        tabBarInactiveTintColor: "#9B9B9B", 
        tabBarShowLabel: true, 
        headerShown: false, 
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="bag"
        options={{
          title: "Bag",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bag-handle-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites" 
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
