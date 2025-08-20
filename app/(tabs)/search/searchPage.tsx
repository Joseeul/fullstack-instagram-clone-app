import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { searchUser } from "@/lib/api/database";
import { searchMapper } from "@/lib/mapping/userMapper";
import { UserSearch } from "@/lib/models/UserModel";
import { useRouter } from "expo-router";
import debounce from "lodash.debounce";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<UserSearch[]>([]);

  const handleSearch = debounce(async (text: string) => {
    if (!text.trim()) {
      return;
    }

    const result = await searchUser(text);

    if (!result) {
      return;
    }

    const mappedSearch = result.map(searchMapper);
    setUser(mappedSearch);
  }, 1000);

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="p-5">
        <View className="flex-row items-center gap-4">
          <View className="border flex-row items-center gap-4 border-gray-400 rounded-lg p-2 flex-1">
            <Search color={"#9ca3af"} size={20} />
            <TextInput
              className="w-80"
              style={{ fontFamily: "Ig-Regular" }}
              placeholder="Search..."
              onChangeText={(text) => handleSearch(text)}
            />
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontFamily: "Ig-Regular" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={user}
          keyExtractor={(item) => item.user_id}
          ListEmptyComponent={
            <Text className="text-lg mt-4" style={{ fontFamily: "Ig-Medium" }}>
              User not found.
            </Text>
          }
          renderItem={({ item }) => (
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
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;
