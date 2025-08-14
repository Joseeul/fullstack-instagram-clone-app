import CustomButton from "@/components/CustomButton";
import CustomInputField from "@/components/CustomInputField";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const signUp = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="p-5">
        <Text className="text-4xl mb-3 mt-3" style={{ fontFamily: "Ig-Bold" }}>
          More Than Just a Feed. It's About You.
        </Text>
        <Text className="text-lg mb-3" style={{ fontFamily: "Ig-Regular" }}>
          Discover relevant content, a supportive community, and features that
          will inspire your creativity. Sign up now and experience a social
          experience like no other.
        </Text>
        <CustomInputField
          label="Username"
          className="mb-4 mt-3 w-full"
          textClassName="text-gray-500"
          textInputClassName="border-2 border-gray-200 rounded-xl px-3 py-2"
          fontFamily="Ig-Regular"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        {username ? (
          <Text className="mb-4" style={{ fontFamily: "Ig-Regular" }}>
            Your username will look like this. @{username}
          </Text>
        ) : (
          ""
        )}
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
          label="Sign Up"
          className="w-full mb-5"
          onPress={() => {}}
          buttonClassname="bg-blue-600 p-3 rounded-full"
          textClassName="text-white text-center"
          fontFamily="Ig-Regular"
        />
      </View>
      <View className="absolute bottom-0 left-0 right-0 p-5 mb-10">
        <TouchableOpacity onPress={() => router.push("/(auth)/signIn")}>
          <Text
            className="text-center text-blue-600"
            style={{ fontFamily: "Ig-Bold" }}
          >
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default signUp;
