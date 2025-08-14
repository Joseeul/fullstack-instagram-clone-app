import { Redirect, Tabs } from "expo-router";
import React from "react";

import {
  Blend,
  CircleUserRound,
  House,
  Search,
  SquarePlus,
} from "lucide-react-native";

const TabLayout = () => {
  const isAuth = false;

  if (!isAuth) return <Redirect href={"/(auth)/signIn"} />;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => <House strokeWidth={focused ? 2 : 1} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => <Search strokeWidth={focused ? 2 : 1} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <SquarePlus strokeWidth={focused ? 2 : 1} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => <Blend strokeWidth={focused ? 2 : 1} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <CircleUserRound strokeWidth={focused ? 2 : 1} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
