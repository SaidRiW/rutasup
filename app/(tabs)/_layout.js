import { Tabs } from "expo-router";
import { View } from "react-native";
import {
  BarsIcon,
  MapIcon,
  RouteIcon,
  StarIcon,
  VanIcon,
} from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#fff", height: 55 },
        tabBarActiveTintColor: "#4C54FD",
        tabBarInactiveTintColor: "#333333",
        tabBarLabelStyle: {
          marginTop: -8,
          marginBottom: 4,
          fontSize: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Navegación",
          tabBarIcon: ({ color }) => <VanIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="trayecto"
        options={{
          title: "Trayecto",
          tabBarIcon: ({ color }) => <RouteIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="rutas"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: "#4C54FD",
                width: 52,
                height: 52,
                borderRadius: 26,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => <StarIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Más",
          tabBarIcon: ({ color }) => <BarsIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
