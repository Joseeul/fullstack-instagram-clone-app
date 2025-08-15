import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { loginUser } from "@/lib/appwrite";
import { UserInputLogin } from "@/lib/models/UserModel";

const signIn = () => {
  const router = useRouter();

  const [form, setForm] = useState<UserInputLogin>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="flex-1 justify-center p-5">
        <Text
          className="text-5xl text-center mb-10"
          style={{ fontFamily: "Instagram-font" }}
        >
          Instagram
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
            secureTextEntry={true}
            style={{ fontFamily: "Ig-Regular" }}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, password: text }))
            }
          />
        </Input>
        <TouchableOpacity activeOpacity={0.5}>
          <Text
            className="text-right mb-4"
            style={{ fontFamily: "Ig-Medium", color: "#3797EF" }}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>
        <Button
          size="lg"
          variant="solid"
          action="primary"
          style={{ backgroundColor: "#3797EF", borderRadius: 100 }}
          className="mb-4"
          onPress={async () => {
            setIsLoading(true);
            const result = await loginUser(form);
            if (!result) {
              console.log("error login");
              setIsLoading(false);
            }
            router.replace("/");
          }}
        >
          <ButtonText style={{ fontFamily: "Ig-Bold" }}>Sign In</ButtonText>
        </Button>
      </View>
      <View className="absolute bottom-0 left-0 right-0 p-5 mb-10">
        <Button
          size="lg"
          variant="outline"
          action="primary"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 100,
            borderColor: "#3797EF",
          }}
          className="mb-4"
          onPress={() => router.replace("/(auth)/signUp")}
        >
          <ButtonText style={{ fontFamily: "Ig-Bold", color: "#3797EF" }}>
            Create an account
          </ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default signIn;
