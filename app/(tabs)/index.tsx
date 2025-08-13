import { Redirect } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function Index() {

  const isAuth = false;

  if(!isAuth) return <Redirect href={'/(auth)/signIn'} />

  return (
    <SafeAreaView>
      <Text className="text-orange-500 text-2xl" style={{fontFamily: 'Ig-Bold'}}>Home</Text>
    </SafeAreaView>
  );
}
