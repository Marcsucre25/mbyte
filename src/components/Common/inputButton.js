import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "./styles";

const InputButton = ({ onPress, text }) => {
  return (
    <View>
      <TouchableOpacity style={styles.styledButton} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputButton;

const styles = StyleSheet.create({
  styledButton: {
    padding: 15,
    backgroundColor: Colors.brand,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
    marginTop: 15,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
  },
});
