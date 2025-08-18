import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { fetchUserData, followUser } from "@/lib/api/database";
import { userMapper } from "@/lib/mapping/userMapper";
import { User } from "@/lib/models/UserModel";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Ellipsis } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

const UserProfile = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        Alert.alert(
          "Failed to get user data",
          "An error occurred while processing your request.",
          [{ text: "Retry", onPress: () => fetchUser() }]
        );
        console.log("Error getting user_id from SecureStore");
        return;
      }

      const result = await fetchUserData(id);
      const mappedUser = userMapper(result);
      setUser(mappedUser);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleFollow = async () => {
    const getFollowerId = await SecureStore.getItemAsync("user_id"); // ambil id kita sekarang

    if (!getFollowerId) {
      Alert.alert(
        "Failed to process your request",
        "An error occurred while processing your request.",
        [{ text: "OK" }]
      );
      console.log("Error getting user_id from SecureStore");
      return;
    }

    const result = await followUser(getFollowerId, id);
    console.log('selesai')

    if (!result) {
      Alert.alert(
        "Failed to follow this user",
        "An error occurred while processing your request.",
        [{ text: "OK" }]
      );
      console.log("Error following user");
      return;
    }
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Spinner size="large" />
        </View>
      ) : (
        <View className="p-5">
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <Text className="text-3xl" style={{ fontFamily: "Ig-Bold" }}>
                {user?.user_name}
              </Text>
            </View>
            <View className="flex-row">
              <Ellipsis />
            </View>
          </View>
          <View className="flex-row mt-8 items-center">
            <Avatar size="xl" className="mr-8">
              <AvatarImage
                source={{
                  uri: user?.avatar_url,
                }}
              />
            </Avatar>
            <View className="flex-row gap-11">
              <View>
                <Text className="text-xl" style={{ fontFamily: "Ig-Bold" }}>
                  {user?.total_post}
                </Text>
                <Text className="text-lg" style={{ fontFamily: "Ig-Regular" }}>
                  posts
                </Text>
              </View>
              <View>
                <Text className="text-xl" style={{ fontFamily: "Ig-Bold" }}>
                  {user?.total_followers}
                </Text>
                <Text className="text-lg" style={{ fontFamily: "Ig-Regular" }}>
                  followers
                </Text>
              </View>
              <View>
                <Text className="text-xl" style={{ fontFamily: "Ig-Bold" }}>
                  {user?.total_following}
                </Text>
                <Text className="text-lg" style={{ fontFamily: "Ig-Regular" }}>
                  following
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-6 w-full">
            <Text style={{ fontFamily: "Ig-Regular" }}>{user?.bio}</Text>
            <View className="flex-row w-full space-x-2 gap-4 mt-4">
              <Button
                className="flex-1 rounded-lg"
                size="md"
                variant="solid"
                action="primary"
                onPress={() => {
                  handleFollow();
                }}
              >
                <ButtonText
                  className="text-lg"
                  style={{
                    fontFamily: "Ig-Bold",
                  }}
                >
                  Follow
                </ButtonText>
              </Button>
              <Button
                className="flex-1 rounded-lg"
                size="md"
                variant="solid"
                action="primary"
              >
                <ButtonText
                  className="text-lg"
                  style={{
                    fontFamily: "Ig-Bold",
                  }}
                >
                  Message
                </ButtonText>
              </Button>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserProfile;
