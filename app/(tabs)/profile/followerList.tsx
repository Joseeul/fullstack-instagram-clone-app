import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { showFollowerList } from "@/lib/api/follow";
import { followerMapper, followingMapper } from "@/lib/mapping/userMapper";
import { UserFollowerList } from "@/lib/models/UserModel";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { router } from "expo-router";

const FollowerList = () => {
  const [user, setUser] = useState<UserFollowerList[]>();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFollowing();
  }, []);

  const fetchFollowing = async () => {
    const userA_id = (await SecureStore.getItemAsync("user_id")) as string;
    const result = await showFollowerList(userA_id);

    if (!result) {
      setIsLoading(false);
      return;
    }

    const mappedUser = result.map(followerMapper);
    setUser(mappedUser);
    setIsLoading(false);
  };
  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="p-5">
        {isloading ? (
          <View className="flex-1 justify-center items-center">
            <Spinner size="large" />
          </View>
        ) : (
          <FlatList
            data={user}
            keyExtractor={(item) => item.user_id}
            ListEmptyComponent={
              <Text
                className="text-lg mt-4"
                style={{ fontFamily: "Ig-Medium" }}
              >
                You don't have any followers
              </Text>
            }
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/profile/[id]',
                    params: { id: item.user_id },
                  })
                }
              >
                <View className="mt-4 flex-row gap-4 items-center">
                  <Avatar size="md">
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
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FollowerList;
