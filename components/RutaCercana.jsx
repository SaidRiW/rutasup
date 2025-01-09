import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { SquareIcon } from "../components/Icons";

export default function RutaCercana({ nombre, color, punteros, onToggle }) {
  const [switchState, setSwitchState] = useState(false);

  const toggleSwitch = () => {
    const newState = !switchState;
    setSwitchState(newState);
    onToggle(newState ? punteros : null);
  };

  return (
    <View className="flex-row items-center">
      <SquareIcon color={color} />
      <Text className="ml-2">{nombre}</Text>
      <Switch
        className="ml-auto"
        trackColor={{ false: "#767577", true: color }}
        thumbColor={switchState ? "#ffffff" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={switchState}
      />
    </View>
  );
}
