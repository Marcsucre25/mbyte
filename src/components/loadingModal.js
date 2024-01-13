import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

const LoadingModal = ({ abrirModal }) => {
  return (
    <>
      <Modal visible={abrirModal} transparent={true}>
        <View style={styles.modalContainer}>
          <ActivityIndicator color={"#000"} size={"large"} />
        </View>
      </Modal>
    </>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(34, 36, 48, 0.66)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modalContent: {
    backgroundColor: "#c3e3fb",
    padding: 20,
    marginTop: "33%",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "column",
  },
});
