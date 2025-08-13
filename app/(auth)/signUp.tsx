import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const signUp = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-5">
        <Text className="text-red-700">signUp</Text>
        <TouchableOpacity>
          <Link href={"/(auth)/signIn"}>Already have an accout? Sign In</Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default signUp;
