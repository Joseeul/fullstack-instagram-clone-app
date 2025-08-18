import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { fetchUserData } from "@/lib/api/database";
import { userMapper } from "@/lib/mapping/userMapper";
import { User } from "@/lib/models/UserModel";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Blend, ChevronDown, Menu, SquarePlus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Index = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUser();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const fetchUser = async () => {
    const getUserId = await SecureStore.getItemAsync("user_id");

    if (!getUserId) {
      Alert.alert(
        "Failed to get user data",
        "An error occurred while processing your request.",
        [{ text: "Retry", onPress: () => fetchUser() }]
      );
      console.log("Error getting user_id from SecureStore");
      return;
    }

    const result = await fetchUserData(getUserId);
    const mappedUser = userMapper(result);
    setUser(mappedUser);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                <ChevronDown size={20} />
              </View>
              <View className="flex-row gap-5">
                <Blend />
                <SquarePlus />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => router.push("/(tabs)/profile/menuSetting")}
                >
                  <Menu />
                </TouchableOpacity>
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
                  <Text
                    className="text-lg"
                    style={{ fontFamily: "Ig-Regular" }}
                  >
                    posts
                  </Text>
                </View>
                <View>
                  <Text className="text-xl" style={{ fontFamily: "Ig-Bold" }}>
                    {user?.total_followers}
                  </Text>
                  <Text
                    className="text-lg"
                    style={{ fontFamily: "Ig-Regular" }}
                  >
                    followers
                  </Text>
                </View>
                <View>
                  <Text className="text-xl" style={{ fontFamily: "Ig-Bold" }}>
                    {user?.total_following}
                  </Text>
                  <Text
                    className="text-lg"
                    style={{ fontFamily: "Ig-Regular" }}
                  >
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
                  onPress={() => router.push("/(tabs)/profile/editProfile")}
                >
                  <ButtonText
                    className="text-lg"
                    style={{
                      fontFamily: "Ig-Bold",
                    }}
                  >
                    Edit Profile
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
                    Share Profile
                  </ButtonText>
                </Button>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
