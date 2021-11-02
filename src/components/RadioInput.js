import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const RadioInput = ({ label, setValue, value }) => {
  const isSelected = value === label;
  return (
    <Pressable onPress={() => setValue(label)}>
      <View style={styles.container}>
        <View
          style={[styles.outerCircle, isSelected && { borderColor: "#d87d4a" }]}
        >
          <View
            style={[
              styles.innerCircle,
              isSelected && {
                borderColor: "#d87d4a",
                backgroundColor: "#d87d4a",
              },
            ]}
          ></View>
        </View>
        <Text style={{ marginLeft: 10 }}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  outerCircle: {
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    borderWidth: 1,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

export default RadioInput;
