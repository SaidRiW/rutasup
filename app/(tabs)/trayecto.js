import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

const INITIAL_REGION = {
  latitude: 18.51413,
  longitude: -88.30381,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};
export default function Navegation() {
  return (
    <View style={{ flex: 1 }}>
      <MapView style={StyleSheet.absoluteFill} initialRegion={INITIAL_REGION} />
    </View>
  );
}
