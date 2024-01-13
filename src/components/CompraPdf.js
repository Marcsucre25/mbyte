import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Platform,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { generateHTML } from "./HtmlPage";
import InputButton from "./Common/inputButton";
import { AuthContext } from "../Context/AuthContext";
import InputTextArea from "./Common/inputTextArea";
import { validateAddress } from "./services/validacion1";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

const CompraPdf = ({
  tableData,
  isChecked,
  setAbrirModal,
  abrirModal,
  total,
}) => {
  const [selectedPrinter, setSelectedPrinter] = useState();
  const { crearPedido } = useContext(AuthContext);
  const [observacion, setObservacion] = useState("");
  const [pagoSeleccionado, setPagoSeleccionado] = useState("");
  const [domicilio, setDomicilio] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const currentDate = new Date();
  useEffect(() => {
    console.log("Pago seleccionado:", pagoSeleccionado);
  }, [pagoSeleccionado]);

  useEffect(() => {
    // Actualizar el valor de domicilio cuando cambia isChecked

    setDomicilio(isChecked ? 1 : 0);
    console.log("Domicilio: ", domicilio);
  }, [isChecked]);

  //obtener hora de compra
  const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  //Obtener fecha de compra
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  const fileName = `DetalleCompra_${formattedDate}.pdf`;

  const html = generateHTML(tableData, formattedDate, formattedTime, total);

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
  const verifyObservacion = (observacion) => {
    setObservacion(observacion);
    //console.log("OBservacion:", observacion);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.infoContainer}>
      {isChecked && (
        <Text style={styles.infoText}>
          Se añadirá un costo adicional según la dirección
        </Text>
      )}

      <InputTextArea
        label={"Observacion:"}
        numberOfLines={5}
        multiline={true}
        placeholder="Especifíque una dirección, detalle o duda que tenga sobre la compra o el valor a pagar."
        onChangeText={verifyObservacion}
        onEndEditing={() => validateAddress(observacion)}
        value={observacion}
      />

      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={pagoSeleccionado === "Transferencia Bancaria"}
          onValueChange={(value) => {
            if (value) {
              setPagoSeleccionado("Transferencia Bancaria");
            } else {
              setPagoSeleccionado(null);
            }
          }}
        />
        <Text style={styles.paragraph}>Transferencia bancaria</Text>
      </View>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={pagoSeleccionado === "Pago en Efectivo"}
          onValueChange={(value) => {
            if (value) {
              setPagoSeleccionado("Pago en Efectivo");
            } else {
              setPagoSeleccionado(null);
            }
          }}
        />
        <Text style={styles.paragraph}>Pago en Efectivo</Text>
      </View>

      <InputButton
        text={"Confirmar pedido"}
        onPress={() => {
          //crearPedido(domicilio, observacion, pagoSeleccionado)
          openModal();
        }}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <ScrollView>
              <TouchableOpacity onPress={() => closeModal()}>
                <Ionicons name="close" size={32} color="#d70000" />
              </TouchableOpacity>
              <View style={styles.box}>
                <Text style={styles.text}>
                  Una vez hecho el pedido no podrá realizar cambios en él y
                  podrá descargar su comprobante y ver el ESTADO del mismo en el
                  apartado de su historial de compras.
                </Text>
                <Text style={styles.text1}>
                  NOTA:{" "}
                  <Text style={styles.text}>
                    Su pedido será atendido dentro las próximas 24 horas
                  </Text>
                </Text>

                <InputButton
                  text={"Aceptar"}
                  onPress={() => {
                    crearPedido(domicilio, observacion, pagoSeleccionado);
                    closeModal();
                    setAbrirModal(!abrirModal);
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CompraPdf;

const styles = StyleSheet.create({
  infoContainer: {},
  infoText: {
    fontSize: 16,

    color: "red",
  },
  modalContainer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(34, 36, 48, 0.66)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modalContent1: {
    padding: 20,
    width: Dimensions.get("window").width,

    //height: 350,
    flexDirection: "column",

    backgroundColor: "#c3e3fb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    //backgroundColor: "red",
    marginTop: 10,
  },
  text: {
    color: "black",
    fontSize: 18,
    textAlign: "left",
    marginBottom: 10,
    fontWeight: "500",
  },
  text1: {
    color: "red",
    fontSize: 18,
    textAlign: "left",
    marginBottom: 10,
    fontWeight: "500",
  },
  section: {
    flexDirection: "row",
    //backgroundColor:"red",
  },
  paragraph: {
    fontSize: 17,
    paddingTop: 8,
  },
  checkbox: {
    margin: 8,
  },
});
