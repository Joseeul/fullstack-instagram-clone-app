import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const signIn = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-5">
        <Text className="text-blue-700">signIn</Text>
        <TouchableOpacity>
          <Link href={"/(auth)/signUp"}>Don't have an accout? Sign Up</Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default signIn;
