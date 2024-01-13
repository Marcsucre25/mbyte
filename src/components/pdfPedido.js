import React, { useContext, useState } from "react";
import { View, StyleSheet, Button, Platform, Text } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import InputButton from "./Common/inputButton";
import { generateHTMLPedido } from "./HtmlPedido";
import { StyleButton } from "../components/Common/StyleButton";
import { Linking } from "react-native";

const PdfPedido = ({ selectedOrder }) => {
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [whatsAppMsg] = useState(
    "Acabo de realizar un pedido de productos, adjunto PDF de la compra"
  );
  if (!selectedOrder) {
    return null;
  }

  const { items, total, fecha } = selectedOrder;

  //Obtener fecha de pedidp
  const formattedDate = new Date(fecha).toLocaleDateString();
  const fileName = `DetallePedido.pdf`;

  const html = generateHTMLPedido(items, formattedDate, total);

  const handleConfirmar = async () => {
    //Imprimir
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url,
    });
    // Guardar como PDF
    const { uri } = await Print.printToFileAsync({ html });
    const renamedUri = uri.replace(/[^\/]+$/, fileName);
    console.log("File has been saved to:", renamedUri);
    await shareAsync(renamedUri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const initiateWhatsAppSMS = () => {
    let url = "whatsapp://send?text=" + whatsAppMsg + "&phone=5930978948486";
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp abierto");
      })
      .catch(() => {
        alert("No tienes instalado WhatsApp en tu dispositivo");
      });
  };

  return (
    <View style={styles.infoContainer}>
      <View style={styles.buttonContainer}>
        <InputButton text={"Descargar detalle"} onPress={handleConfirmar} />
      </View>
      <View style={styles.buttonContainer}>
        <StyleButton
          title={"WhatsApp"}
          name={"logo-whatsapp"}
          onPress={initiateWhatsAppSMS}
        />
      </View>
    </View>
  );
};

export default PdfPedido;

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row", // Alinea los elementos en fila
    justifyContent: "center", // Centra los elementos horizontalmente
    marginTop: 10,
  },
  buttonContainer: {
    marginHorizontal: 5, // Espacio horizontal entre los botones
  },
  infoText: {
    fontSize: 16,
    color: "red",
  },
});
