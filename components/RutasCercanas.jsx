import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import RutaCercana from "./RutaCercana";

export default function RutasCercanas({ onRouteToggle }) {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch(
          "https://dcit-secador-solar.x10.mx/dist/js/pages/rutas.json",
          {
            cache: "no-store",
          },
        );
        const data = await response.json();
        setRutas(data.data.rutas);
      } catch (error) {
        console.error("Error fetching rutas:", error);
      }
    };
    fetchRutas();
  }, []);

  return (
    <View className="absolute bottom-0 w-full h-[25%] bg-[#f5f4f4] flex p-4">
      <Text className="font-bold">Rutas cercanas</Text>
      <ScrollView>
        {rutas.map((ruta) => (
          <RutaCercana
            key={ruta.id}
            nombre={ruta.nombre}
            color={ruta.color}
            punteros={ruta.punteros}
            onToggle={(coordinates) =>
              onRouteToggle(
                ruta.id,
                coordinates
                  ? {
                      punteros: coordinates,
                      color: ruta.color,
                      paradas: ruta.paradas,
                      nombre: ruta.nombre,
                    }
                  : null,
              )
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}
