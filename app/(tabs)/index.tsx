import { Button, ButtonText } from "@/components/ui/button";
import { logoutUser } from "@/lib/api/auth";
import { router } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function Index() {
  return (
    <SafeAreaView>
      <Text
        className="text-orange-500 text-2xl"
        style={{ fontFamily: "Ig-Bold" }}
      >
        Home
      </Text>
      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={async () => {
          const result = await logoutUser();
          if (result) return router.replace("/(auth)/signIn");
          console.log("error log out");
        }}
      >
        <ButtonText>Log out</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
