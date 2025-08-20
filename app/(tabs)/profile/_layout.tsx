import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editProfile"
        options={{
          title: "Edit Profile",
        }}
      />
      <Stack.Screen
        name="menuSetting"
        options={{
          title: "Settings and activity",
        }}
      />
      <Stack.Screen
        name="followingList"
        options={{
          title: "Following",
        }}
      />
      <Stack.Screen
        name="followerList"
        options={{
          title: "Follower",
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
