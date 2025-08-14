import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

const signUp = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="p-5">
        <Text className="text-4xl mb-4 mt-10" style={{ fontFamily: "Ig-Bold" }}>
          More Than Just a Feed. It's About You.
        </Text>
        <Text className="text-lg mb-4" style={{ fontFamily: "Ig-Regular" }}>
          Discover relevant content, a supportive community, and features that
          will inspire your creativity. Sign up now and experience a social
          experience like no other.
        </Text>
        <Input
          variant="outline"
          size="xl"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="mb-4"
          style={{ backgroundColor: "#FAFAFA" }}
        >
          <InputField
            placeholder="Username"
            style={{ fontFamily: "Ig-Regular" }}
            onChangeText={(text) => setUsername(text)}
          />
        </Input>
        {username ? (
          <Text className="mb-4" style={{ fontFamily: "Ig-Regular" }}>
            Your username will look like this. @{username}
          </Text>
        ) : (
          ""
        )}
        <Input
          variant="outline"
          size="xl"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="mb-4"
          style={{ backgroundColor: "#FAFAFA" }}
        >
          <InputField
            placeholder="Email"
            style={{ fontFamily: "Ig-Regular" }}
            onChangeText={(text) => setEmail(text)}
          />
        </Input>
        <Input
          variant="outline"
          size="xl"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="mb-4"
          style={{ backgroundColor: "#FAFAFA" }}
        >
          <InputField
            placeholder="Password"
            style={{ fontFamily: "Ig-Regular" }}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </Input>
        <Button
          size="lg"
          variant="solid"
          action="primary"
          style={{ backgroundColor: "#3797EF", borderRadius: 100 }}
          className="mb-4"
        >
          <ButtonText style={{ fontFamily: "Ig-Bold" }}>Sign Up</ButtonText>
        </Button>
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
