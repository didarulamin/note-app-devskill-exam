import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Day(props) {
  let daysMapping = {
    1: "Su",
    2: "M",
    3: "Tu",
    4: "W",
    5: "Th",
    6: "F",
    0: "Sa",
  };
  return (
    <TouchableOpacity
      style={[
        props.style,
        styles.default,
        props.isActive ? styles.active : styles.inactive,
      ]}
      onPress={() => props.toggleDay(props.day)}
    >
      <Text style={props.isActive ? styles.activeText : styles.inactiveText}>
        {daysMapping[props.day]}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    height: 35,
    width: 35,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "black",
  },
  inactive: {
    backgroundColor: "#ffffff",
  },
  activeText: {
    color: "#ffffff",
  },
  inactiveText: {
    color: "black",
  },
});
