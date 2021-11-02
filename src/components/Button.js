import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ title, customStyles, onPress }) => {
  return (
    <TouchableOpacity style={[styles.buttons, customStyles]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttons: {
    borderRadius: 50,
    width: 165,
    height: 45,
    backgroundColor: "#ffe600",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
  },
});

export default Button;
