// import React in our code
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import ContainerPrinicipal from "../components/ContainerPrinicipal";

const ButtonWhatsapp = () => {
  const [whatsAppMsg] = useState("Acabo de realizar un pedido de productos, adjunto PDF de la compra");

  const initiateWhatsAppSMS = () => {
    let url = "whatsapp://send?text=" + whatsAppMsg + "&phone=5930982866821";
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp abierto");
      })
      .catch(() => {
        alert("Asegurate de tener instalado whatsapp ");
      });
  };

  return (
    <ContainerPrinicipal>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={initiateWhatsAppSMS}
          >
            <Text style={styles.buttonTextStyle}>Adquirir</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ContainerPrinicipal>
  );
};

export default ButtonWhatsapp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },

  buttonStyle: {
    justifyContent: "center",
    marginTop: 15,
    padding: 10,
    backgroundColor: "#8ad24e",
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  },
});
