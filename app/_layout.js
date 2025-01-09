import { Stack, Link } from "expo-router";
import { View, Pressable, Text } from "react-native";
import { Logo } from "../components/Logo";
import { UserCircleIcon, NotificationIcon } from "../components/Icons";
import { useFonts } from "expo-font";
import { FredokaOne_400Regular } from "@expo-google-fonts/fredoka-one";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "FredokaOne_400Regular",
                fontSize: 20,
                color: "black",
              }}
            >
              Rutas
              <Text style={{ color: "#242EFD" }}>Up</Text>
            </Text>
          ),
          headerLeft: () => (
            <Link asChild href="/about">
              <Pressable>
                <UserCircleIcon />
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Link asChild href="/about">
              <Pressable>
                <NotificationIcon />
              </Pressable>
            </Link>
          ),
        }}
      />
    </View>
  );
}
