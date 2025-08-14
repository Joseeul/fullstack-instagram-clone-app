import CustomButton from "@/components/CustomButton";
import CustomInputField from "@/components/CustomInputField";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const signIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="flex-1 justify-center p-5">
        <Text
          className="text-6xl text-center mb-12"
          style={{ fontFamily: "Lobster" }}
        >
          Instagram
        </Text>
        <CustomInputField
          label="Email"
          className="mb-4 w-full"
          textClassName="text-gray-500"
          textInputClassName="border-2 border-gray-200 rounded-xl px-3 py-2"
          fontFamily="Ig-Regular"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <CustomInputField
          label="Password"
          className="mb-4 w-full"
          textClassName="text-gray-500"
          textInputClassName="border-2 border-gray-200 rounded-xl px-3 py-2"
          fontFamily="Ig-Regular"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <CustomButton
          label="Sign In"
          className="w-full mb-5"
          onPress={() => {}}
          buttonClassname="bg-blue-600 p-3 rounded-full"
          textClassName="text-white text-center"
          fontFamily="Ig-Regular"
        />
        <TouchableOpacity>
          <Text className="text-center" style={{ fontFamily: "Ig-Bold" }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-0 left-0 right-0 p-5 mb-10">
        <CustomButton
          label="Create new account"
          className="w-full"
          onPress={() => router.push("/(auth)/signUp")}
          buttonClassname="w-full p-3 rounded-full border border-blue-600"
          textClassName="text-blue-600 text-center"
          fontFamily="Ig-Regular"
        />
      </View>
    </SafeAreaView>
  );
};

export default signIn;
