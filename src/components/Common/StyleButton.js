import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";

export const StyleButton = ({ onPress, title, name }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient colors={["#c3e3fb", "#69baf1"]} style={styles.boton}>
        <View style={styles.buttonContent}>
          <View style={styles.icon}>
            <Ionicons name={name} size={30} color="green" />
          </View>
          <Text style={styles.text}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    width: 170,
    marginTop: 15,
    borderRadius: 5,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "black",
    borderWidth: 0.5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: { color: "#1a2f51", fontSize: 15, fontWeight: "700" },
  icon: { marginLeft: -20, margin: 10 },
});
