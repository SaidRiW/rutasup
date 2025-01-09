import { useState } from "react";
import { View, Alert } from "react-native";
import RutasCercanas from "../../components/RutasCercanas.jsx";
import MapaNavegacion from "../../components/MapaNavegacion.jsx";

export default function Navegation() {
  const [activeRoutes, setActiveRoutes] = useState([]);

  const handleRouteToggle = (routeId, routeData) => {
    setActiveRoutes((prevRoutes) => {
      if (routeData) {
        if (prevRoutes.length > 0) {
          // Si ya hay una ruta activa, muestra una alerta
          Alert.alert(
            "Atención",
            "No se puede seleccionar más de una ruta a la vez.",
            [{ text: "OK" }],
            { cancelable: true },
          );
          return prevRoutes; // No se agrega una nueva ruta
        }
        // Si no hay rutas activas, agrega la nueva ruta
        return [{ id: routeId, ...routeData }];
      } else {
        // Si se desactiva una ruta, elimina esa ruta
        return prevRoutes.filter((route) => route.id !== routeId);
      }
    });
  };

  return (
    <View className="flex-1">
      <MapaNavegacion
        activeRoutes={activeRoutes}
        setActiveRoutes={setActiveRoutes}
      />
      <RutasCercanas onRouteToggle={handleRouteToggle} />
    </View>
  );
}
