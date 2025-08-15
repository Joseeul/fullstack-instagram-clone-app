import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { registerUser } from "@/lib/appwrite";
import { UserInputRegister } from "@/lib/models/UserModel";

const signUp = () => {
  const router = useRouter();

  const [form, setForm] = useState<UserInputRegister>({
    user_name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="p-5">
        <Text className="text-4xl mt-10" style={{ fontFamily: "Ig-Bold" }}>
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
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, user_name: text }))
            }
          />
        </Input>
        {form.user_name ? (
          <Text className="mb-4" style={{ fontFamily: "Ig-Regular" }}>
            Your username will look like this. @{form.user_name}
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
            autoCapitalize="none"
            style={{ fontFamily: "Ig-Regular" }}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, email: text }))
            }
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
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, password: text }))
            }
            secureTextEntry={true}
          />
        </Input>
        <Button
          size="lg"
          variant="solid"
          action="primary"
          style={{ backgroundColor: "#3797EF", borderRadius: 100 }}
          className="mb-4"
          onPress={async () => {
            setIsLoading(true);
            const result = await registerUser(form);
            if (!result) {
              console.log("error registering");
              setIsLoading(false);
            }
            router.replace("/");
          }}
        >
          {isLoading ? <ButtonSpinner color={"#FFFFFF"} /> : ""}
          <ButtonText style={{ fontFamily: "Ig-Bold" }}>Sign Up</ButtonText>
        </Button>
      </View>
      <View className="absolute bottom-0 left-0 right-0 p-5 mb-10">
        <TouchableOpacity onPress={() => router.replace("/(auth)/signIn")}>
          <Text
            className="text-center"
            style={{ fontFamily: "Ig-Bold", color: "#3797EF" }}
          >
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default signUp;
