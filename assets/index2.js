import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Switch,
  Pressable,
} from "react-native";
import { styled } from "nativewind";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { SquareIcon, LocationCrosshairsIcon } from "../../components/Icons.jsx";
import darkMapStyle from "../../lib/darkmapstyle.js";

const INITIAL_REGION = {
  latitude: 18.51413,
  longitude: -88.30381,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const StyledPressable = styled(Pressable);

export default function Navegation() {
  const [switchState, setSwitchState] = useState({
    route1: false,
    route2: false,
    route3: false,
    route4: false,
  });
  const [region, setRegion] = useState(INITIAL_REGION);

  const toggleSwitch = (route) => {
    setSwitchState((prevState) => ({
      ...prevState,
      [route]: !prevState[route],
    }));
  };

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Se requieren permisos de ubicación para esta función.");
      return;
    }

    const userLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = userLocation.coords;

    setRegion({
      ...region,
      latitude,
      longitude,
    });
  };

  return (
    <View className="flex-1">
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation
        showsMyLocationButton={false}
        customMapStyle={darkMapStyle}
      />
      <StyledPressable
        onPress={getUserLocation}
        style={{
          position: "absolute",
          bottom: "27%",
          right: 10,
          padding: 10,
          backgroundColor: "#ffffff",
          borderRadius: 25,
          elevation: 5,
        }}
      >
        <LocationCrosshairsIcon />
      </StyledPressable>
      <View className="absolute bottom-0 w-full h-[25%] bg-[#f5f4f4] flex p-4">
        <Text className="font-bold">Rutas cercanas</Text>
        <ScrollView className="mt-3 px-2">
          <View className="flex-row items-center">
            <SquareIcon color="blue" />
            <Text className="ml-2">Américas 1, 2 y 3</Text>
            <Switch
              className="ml-auto"
              trackColor={{ false: "#767577", true: "blue" }}
              thumbColor={switchState.route1 ? "#ffffff" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("route1")}
              value={switchState.route1}
            />
          </View>
          <View className="flex-row items-center">
            <SquareIcon color="yellow" />
            <Text className="ml-2">Nombre de otra ruta</Text>
            <Switch
              className="ml-auto"
              trackColor={{ false: "#767577", true: "yellow" }}
              thumbColor={switchState.route2 ? "#ffffff" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("route2")}
              value={switchState.route2}
            />
          </View>
          <View className="flex-row items-center">
            <SquareIcon color="orange" />
            <Text className="ml-2">Nombre de otra ruta</Text>
            <Switch
              className="ml-auto"
              trackColor={{ false: "#767577", true: "orange" }}
              thumbColor={switchState.route3 ? "#ffffff" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("route3")}
              value={switchState.route3}
            />
          </View>
          <View className="flex-row items-center">
            <SquareIcon color="green" />
            <Text className="ml-2">Nombre de otra ruta</Text>
            <Switch
              className="ml-auto"
              trackColor={{ false: "#767577", true: "green" }}
              thumbColor={switchState.route4 ? "#ffffff" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("route4")}
              value={switchState.route4}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
