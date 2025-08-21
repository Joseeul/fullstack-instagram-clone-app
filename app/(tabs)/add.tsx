import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { uploadImage } from "@/lib/api/post";
import { PostInput } from "@/lib/models/PostModel";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, Text, View } from "react-native";

const Add = () => {
  const [image, setImage] = useState<PostInput>();
  const [isAvailable, setIsAvailable] = useState(false);
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      const getUserId = (await SecureStore.getItemAsync("user_id")) as string;
      setUserId(getUserId);
    };
    getUserId();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setImage({
        author_id: userId,
        description,
        name: asset.fileName || "uknown",
        type: asset.mimeType || "image/jpeg",
        size: asset.fileSize || 0,
        uri: asset.uri,
      });
      setIsAvailable(true);
    }
  };

  const handleImage = async () => {
    if (!image) {
      Alert.alert("Failed to upload", "No image found!", [{ text: "OK" }]);
      return;
    }
    if (!description.trim()) {
      Alert.alert("Empty field", "No description detected", [{ text: "OK" }]);
      return;
    }
    const result = await uploadImage(image);
  };

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <View className="p-5">
        {isAvailable ? (
          <Image
            source={
              image?.uri
                ? { uri: image.uri }
                : require("assets/images/icon.png")
            }
            className="w-[400] h-[400]"
          />
        ) : (
          <Text className="text-center">No image selected</Text>
        )}
        <Input
          variant="outline"
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="mt-4"
        >
          <InputField
            placeholder="Input description"
            onChangeText={(text) => setDescription(text)}
          />
        </Input>
        <Button
          size="md"
          variant="solid"
          action="primary"
          onPress={pickImage}
          className="mt-4"
        >
          <ButtonText>Select an image</ButtonText>
        </Button>

        <Button
          size="md"
          variant="solid"
          action="primary"
          className="mt-4"
          onPress={handleImage}
        >
          <ButtonText>Upload</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};
export default Add;
