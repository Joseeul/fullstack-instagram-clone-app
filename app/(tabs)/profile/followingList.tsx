import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { showFollowingList } from "@/lib/api/follow";
import { followingMapper } from "@/lib/mapping/userMapper";
import { UserSearch } from "@/lib/models/UserModel";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";

const FollowingList = () => {
  const [user, setUser] = useState<UserSearch[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    fetchFollowing();
  }, []);

  const fetchFollowing = async () => {
    const userA_id = (await SecureStore.getItemAsync("user_id")) as string;
    const result = await showFollowingList(userA_id);

    if (!result) {
      return;
    }

    const mappedUser = result.map(followingMapper);
    setUser(mappedUser);
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <FlatList
        data={user}
        keyExtractor={(item) => item.user_id}
        renderItem={({ item }) =>
          isAvailable ? (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/search/[id]",
                  params: { id: item.user_id },
                })
              }
            >
              <View className="mt-4 flex-row gap-4 items-center">
                <Avatar size="md">
                  <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: item.avatar_url,
                    }}
                  />
                </Avatar>
                <Text className="text-lg" style={{ fontFamily: "Ig-Medium" }}>
                  {item.user_name}
                </Text>
              </View>
            </Pressable>
          ) : (
            <Text className="text-lg mt-4" style={{ fontFamily: "Ig-Medium" }}>
              User not found.
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default FollowingList;
