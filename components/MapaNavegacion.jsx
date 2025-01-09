import { useState, useEffect, useMemo } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { styled } from "nativewind";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
import * as Location from "expo-location";
import Timer from "react-native-timer";
import { LocationCrosshairsIcon, SignIcon, VanIcon } from "../components/Icons";
import darkMapStyle from "../lib/darkmapstyle.js";

const INITIAL_REGION = {
  latitude: 18.51413,
  longitude: -88.30381,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const StyledPressable = styled(Pressable);
const MAX_WAYPOINTS = 25; // Máximo de waypoints permitidos por Google Maps

// Función para dividir waypoints en bloques
const splitWaypoints = (waypoints) => {
  const chunks = [];
  for (let i = 0; i < waypoints.length; i += MAX_WAYPOINTS) {
    chunks.push(waypoints.slice(i, i + MAX_WAYPOINTS));
  }
  return chunks;
};

export default function MapaNavegacion({ activeRoutes }) {
  const [region, setRegion] = useState(INITIAL_REGION);
  const [combis, setCombis] = useState([]);
  const [timeToUsers, setTimeToUsers] = useState({});

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

  useEffect(() => {
    const initialCombiPositions = activeRoutes.map((route) => ({
      routeId: route.id,
      nombre: route.nombre,
      color: route.color || "blue",
      position: route.punteros[0],
      routePoints: route.punteros,
      currentIndex: 0,
    }));
    setCombis(initialCombiPositions);

    const moveCombis = () => {
      setCombis((prevCombis) =>
        prevCombis.map((combi) => {
          const nextIndex = (combi.currentIndex + 1) % combi.routePoints.length;
          return {
            ...combi,
            position: combi.routePoints[nextIndex],
            currentIndex: nextIndex,
          };
        }),
      );
    };

    Timer.setInterval("moveCombis", moveCombis, 2000);

    return () => Timer.clearInterval("moveCombis");
  }, [activeRoutes]);

  useEffect(() => {
    const updateETAs = async () => {
      const newTimes = {};

      await Promise.all(
        combis.map(async (combi) => {
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/directions/json?origin=${combi.position.latitud},${combi.position.longitud}&destination=${region.latitude},${region.longitude}&key=${GOOGLE_MAPS_KEY}&mode=driving`,
            );
            const data = await response.json();
            if (data.routes.length > 0) {
              const duration = data.routes[0].legs[0].duration.text;
              newTimes[combi.routeId] = `Tiempo estimado: ${duration}`;
            }
          } catch (error) {
            console.error(`Error obteniendo ETA para ${combi.routeId}:`, error);
            newTimes[combi.routeId] = "Error obteniendo tiempo";
          }
        }),
      );

      setTimeToUsers(newTimes);
    };

    updateETAs();
  }, [combis, region]);

  const waypoints = useMemo(
    () =>
      activeRoutes.flatMap((route) =>
        route.punteros.map((point) => ({
          latitude: point.latitud,
          longitude: point.longitud,
        })),
      ),
    [activeRoutes],
  );

  const origin = waypoints[0];
  const destination = waypoints[waypoints.length - 1];
  const waypointChunks = splitWaypoints(waypoints.slice(1, -1));

  return (
    <View className="flex-1">
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation
        showsMyLocationButton={false}
        customMapStyle={darkMapStyle}
      >
        {waypointChunks.map((chunk, index) => (
          <MapViewDirections
            key={index}
            origin={index === 0 ? origin : chunk[0]}
            destination={
              index === waypointChunks.length - 1
                ? destination
                : chunk[chunk.length - 1]
            }
            waypoints={chunk.slice(1, -1)}
            apikey={GOOGLE_MAPS_KEY}
            strokeColor="blue"
            strokeWidth={4}
            mode="DRIVING"
          />
        ))}

        {activeRoutes.flatMap((route) =>
          route.paradas.map((parada) => (
            <Marker
              key={parada.id}
              coordinate={{
                latitude: parada.latitud,
                longitude: parada.longitud,
              }}
              title={parada.nombre}
              description={`Parada de la ${route.nombre}`}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: route.color,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SignIcon />
              </View>
            </Marker>
          )),
        )}

        {combis.map((combi, index) => (
          <Marker
            key={`${combi.routeId}-${index}`}
            coordinate={{
              latitude: combi.position.latitud,
              longitude: combi.position.longitud,
            }}
            title={`Combi de ${combi.nombre}`}
            description={timeToUsers[combi.routeId] || "Calculando..."}
          >
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "white",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <VanIcon color={combi.color} />
            </View>
          </Marker>
        ))}
      </MapView>

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
    </View>
  );
}
