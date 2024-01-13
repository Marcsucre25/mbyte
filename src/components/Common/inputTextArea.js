import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./styles";
const InputTextArea = ({ label, ...props }) => {
  return (
    <View>
      <Text style={styles.styledInputLabel}>{label}</Text>
      <TextInput style={styles.styledTextInput} {...props} />
    </View>
  );
};

export default InputTextArea;

const styles = StyleSheet.create({
  styledTextInput: {
    backgroundColor: "#fff",
    padding: 15,
    //paddingLeft: 55,
    //paddingRight: 55,
    borderRadius: 5,
    fontSize: 16,
    height: 100,
    width: Dimensions.get("window").width - 50,
    marginVertical: 3,
    marginBottom: 10,
    color: Colors.tertiary,
  },
  styledInputLabel: {
    color: "#000",
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold",
  },
  leftIcon: {
    left: 15,
    top: 36,
    position: "absolute",
    zIndex: 1,
  },
  text: {
    color: "#000",
    //backgroundColor: "red",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 5,
  },
});
