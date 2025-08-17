import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="p-5">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/search/searchPage")}
        >
          <View className="border flex-row items-center gap-4 border-gray-400 rounded-lg p-2">
            <Search color={"#9ca3af"} size={20} />
            <Text className="text-gray-400" style={{fontFamily: 'Ig-Regular'}}>Search...</Text>
          </View>
        </TouchableOpacity>
        <Text>all feed here</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
