import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "./styles";

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  const showEyeIcon = isPassword && props.value && props.value.length > 0;
  return (
    <View>
      <View style={styles.leftIcon}>
        <Ionicons name={icon} size={30} color={Colors.byte} />
      </View>
      <Text style={styles.styledInputLabel}>{label}</Text>
      <TextInput style={styles.styledTextInput} {...props} />

      {isPassword && showEyeIcon && (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => setHidePassword(!hidePassword)}
        >
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={Colors.darkLight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MyTextInput;

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
    fontSize: 15,
    textAlign: "left",
  },
  leftIcon: {
    left: 15,
    top: 36,
    position: "absolute",
    zIndex: 1,
  },
  rightIcon: {
    right: 15,
    top: 33,
    position: "absolute",
    zIndex: 1,
  },
});
