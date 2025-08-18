import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { fetchUserData } from "@/lib/api/database";
import { checkIsFollow, followUser } from "@/lib/api/follow";
import { userMapper } from "@/lib/mapping/userMapper";
import { User } from "@/lib/models/UserModel";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Ellipsis } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

const UserProfile = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingIndicator, setIsLoadingIndicator] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const userB_id = id;

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      await userFollowed();
    };

    init();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUser();
    userFollowed();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const fetchUser = async () => {
    const result = await fetchUserData(userB_id);
    const mappedUser = userMapper(result);
    setUser(mappedUser);
    setIsLoadingPage(false);
  };

  const userFollowed = async () => {
    const userA_id = (await SecureStore.getItemAsync("user_id")) as string;
    const result = await checkIsFollow({ userA_id, userB_id });

    if (result) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  };

  const handleFollow = async () => {
    setIsLoadingIndicator(true);
    const userA_id = (await SecureStore.getItemAsync("user_id")) as string;
    const result = await followUser({ userA_id, userB_id });

    if (!result) {
      Alert.alert(
        "Failed to follow this user",
        "An error occurred while processing your request.",
        [{ text: "OK" }]
      );
      console.log("Error following user");
      setIsLoadingIndicator(false);
      return;
    }
    setIsLoadingIndicator(false);
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoadingPage ? (
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
                  onPress={() => {
                    handleFollow();
                  }}
                >
                  {isLoadingIndicator ? (
                    <ButtonSpinner color={"#FFFFFF"} />
                  ) : (
                    ""
                  )}
                  {isFollow ? (
                    <ButtonText
                      className="text-lg"
                      style={{
                        fontFamily: "Ig-Bold",
                      }}
                    >
                      Following
                    </ButtonText>
                  ) : (
                    <ButtonText
                      className="text-lg"
                      style={{
                        fontFamily: "Ig-Bold",
                      }}
                    >
                      Follow
                    </ButtonText>
                  )}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
