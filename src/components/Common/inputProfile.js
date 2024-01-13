import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./styles";

const InputProfile = ({ label, text, icon }) => {
  return (
    <View>
      <View style={styles.leftIcon}>
        <Ionicons name={icon} size={30} color={Colors.byte} />
      </View>
      <Text style={styles.styledInputLabel}>{label}</Text>
      <View style={styles.styledTextInput}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default InputProfile;

const styles = StyleSheet.create({
  styledTextInput: {
    backgroundColor: Colors.secondary,
    padding: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 5,
    fontSize: 16,
    height: 60,
    width: Dimensions.get("window").width - 85,
    marginVertical: 3,
    marginBottom: 10,
    color: Colors.tertiary,
  },
  styledInputLabel: {
    color: Colors.cuartiary,
    fontSize: 16,
    textAlign: "left",
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
