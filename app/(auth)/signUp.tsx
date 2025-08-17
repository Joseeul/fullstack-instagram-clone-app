import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { checkUsername, registerUser } from "@/lib/api/auth";
import { UserInputRegister } from "@/lib/models/UserModel";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const signUp = () => {
  const router = useRouter();

  const [form, setForm] = useState<UserInputRegister>({
    user_name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [available, setAvailable] = useState(true);

  const handleSubmit = async () => {
    if (!form.user_name.trim() || !form.email.trim() || !form.password.trim()) {
      Alert.alert("Failed to submit", "Field cannot be empty!", [
        { text: "OK" },
      ]);
      return;
    }

    const available = await checkUsername(form.user_name);

    if (!available) {
      setAvailable(false);
      return;
    }

    if (/^_+$/.test(form.user_name)) {
      Alert.alert(
        "Illegal character detected",
        "Username must be a characters.",
        [{ text: "OK" }]
      );
      return;
    }

    setIsLoading(true);
    const result = await registerUser(form);

    if (!result) {
      Alert.alert(
        "Failed to register",
        "There was an error while processing your request.",
        [{ text: "OK" }]
      );
      return;
    }

    router.replace("/");
  };

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
              setForm((prev) => ({
                ...prev,
                user_name: text.replace(/ /g, "_"),
              }))
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
        {available ? (
          ""
        ) : (
          <Text className="mb-4 text-red-600">Username not available</Text>
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
          onPress={handleSubmit}
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
