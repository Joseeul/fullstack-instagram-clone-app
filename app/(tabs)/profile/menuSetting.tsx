import { logoutUser } from "@/lib/api/auth";
import { useRouter } from "expo-router";
import {
  AtSign,
  Ban,
  Bell,
  Bookmark,
  ChevronRight,
  CircleOff,
  CircleStar,
  Clock,
  Grid2x2Plus,
  History,
  Lock,
  MessageCircle,
  MessageCircleMore,
  MessageCircleWarning,
  MessageSquareShare,
  OctagonMinus,
  SquareActivity,
  UsersRound,
} from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MenuSetting = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-1 bg-gray-100"></View>
        <View className="p-5">
          <Text className="text-gray-600" style={{ fontFamily: "Ig-Medium" }}>
            How you use Instagram
          </Text>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <Bookmark />
              <Text style={{ fontFamily: "Ig-Regular" }}>Saved</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <History />
              <Text style={{ fontFamily: "Ig-Regular" }}>Archive</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <SquareActivity />
              <Text style={{ fontFamily: "Ig-Regular" }}>Activity</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <Bell />
              <Text style={{ fontFamily: "Ig-Regular" }}>Notification</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <Clock />
              <Text style={{ fontFamily: "Ig-Regular" }}>Time management</Text>
            </View>
            <ChevronRight />
          </View>
        </View>
        <View className="p-1 bg-gray-100"></View>
        <View className="p-5">
          <Text className="text-gray-600" style={{ fontFamily: "Ig-Medium" }}>
            Who can see your content
          </Text>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <Lock />
              <Text style={{ fontFamily: "Ig-Regular" }}>Account privacy</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <CircleStar />
              <Text style={{ fontFamily: "Ig-Regular" }}>Close Friends</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <Grid2x2Plus />
              <Text style={{ fontFamily: "Ig-Regular" }}>Crossposting</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <Ban />
              <Text style={{ fontFamily: "Ig-Regular" }}>Blocked</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <CircleOff />
              <Text style={{ fontFamily: "Ig-Regular" }}>
                Hide story and live
              </Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <UsersRound />
              <Text style={{ fontFamily: "Ig-Regular" }}>
                Activity in Friends tab
              </Text>
            </View>
            <ChevronRight />
          </View>
        </View>
        <View className="p-1 bg-gray-100"></View>
        <View className="p-5">
          <Text className="text-gray-600" style={{ fontFamily: "Ig-Medium" }}>
            How others can interact with you
          </Text>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <MessageCircleMore />
              <Text style={{ fontFamily: "Ig-Regular" }}>
                Message and story replies
              </Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <AtSign />
              <Text style={{ fontFamily: "Ig-Regular" }}>
                Tags and mentions
              </Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <MessageCircle />
              <Text style={{ fontFamily: "Ig-Regular" }}>Comments</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <MessageSquareShare />
              <Text style={{ fontFamily: "Ig-Regular" }}>Sharing</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <OctagonMinus />
              <Text style={{ fontFamily: "Ig-Regular" }}>Restricted</Text>
            </View>
            <ChevronRight />
          </View>
          <View className="mt-5 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <MessageCircleWarning />
              <Text style={{ fontFamily: "Ig-Regular" }}>
                Limit interactions
              </Text>
            </View>
            <ChevronRight />
          </View>
        </View>
        <View className="p-1 bg-gray-100"></View>
        <View className="p-5 flex-col gap-5">
          <Text className="text-gray-600" style={{ fontFamily: "Ig-Medium" }}>
            Login
          </Text>
          <Text className="color-blue-600" style={{ fontFamily: "Ig-Regular" }}>
            Add account
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={async () => {
              const result = await logoutUser();
              if (result) return router.replace("/(auth)/signIn");
              console.log("error log out");
            }}
          >
            <Text
              className="color-red-600"
              style={{ fontFamily: "Ig-Regular" }}
            >
              Log out
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={async () => {
              const result = await logoutUser();
              if (result) return router.replace("/(auth)/signIn");
              console.log("error log out");
            }}
          >
            <Text
              className="color-red-600"
              style={{ fontFamily: "Ig-Regular" }}
            >
              Log out all accounts
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuSetting;
