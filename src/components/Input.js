import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, onChangeText, secureTextEntry, label }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
  },
});

export default Input;
