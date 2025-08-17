import { searchUser } from "@/lib/api/database";
import { searchMapper } from "@/lib/mapping/userMapper";
import { UserSearch } from "@/lib/models/UserModel";
import { useRouter } from "expo-router";
import debounce from "lodash.debounce";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
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
            className="bg-red-100 w-80"
              placeholder="Search..."
              onChangeText={(text) => handleSearch(text)}
            />
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={user}
          keyExtractor={(item) => item.user_id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.user_id}</Text>
              <Text>{item.user_name}</Text>
              <Text>{item.avatar_url}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;
