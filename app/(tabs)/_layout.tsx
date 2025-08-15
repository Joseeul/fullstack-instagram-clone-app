import { Tabs, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";

import {
  Blend,
  CircleUserRound,
  House,
  Search,
  SquarePlus,
} from "lucide-react-native";

const TabLayout = () => {
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const getSessionDate = await SecureStore.getItemAsync(
        "session_expire_date"
      );

      if (getSessionDate === null) {
        router.replace("/(auth)/signIn");
        return;
      } else {
        const sessionDate = new Date(getSessionDate);
        const dateNow = new Date();

        if (dateNow > sessionDate) {
          router.replace("/(auth)/signIn");
        }
      }

      setIsCheckingSession(false);
    };
    checkSession();
  }, []);

  if (isCheckingSession) {
    return null;
  }

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
