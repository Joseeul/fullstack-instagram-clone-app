import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text } from "react-native";

const Index = () => {
  return (
    <SafeAreaView>
      <Text className="text-teal-500">Profile</Text>
      <Link href={'/(tabs)/profile/editProfile'}>Go to edit profile</Link>
    </SafeAreaView>
  );
};

export default Index;
