import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DataTable } from "react-native-paper"; // Importa DataTable desde react-native-paper
import CompraPdf from "./CompraPdf";


const DetalleCompra = ({ abrirModal, setAbrirModal, carrito, total }) => {
  const [isChecked, setChecked] = useState(false);

  const totalNumber = parseFloat(total);

  return (
    <>
      <Modal visible={abrirModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <TouchableOpacity onPress={() => setAbrirModal(false)}>
                <Ionicons name="close" size={30} color="#d70000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Detalle de compra</Text>

              <View style={styles.containerDetails}>
                <ScrollView vertical={true}>
                  <DataTable>
                    <DataTable.Header style={styles.tableHeader}>
                      <DataTable.Title textStyle={styles.tableHeaderText}>
                        Producto
                      </DataTable.Title>
                      <DataTable.Title textStyle={styles.tableHeaderText}>
                        Cantidad
                      </DataTable.Title>
                      <DataTable.Title textStyle={styles.tableHeaderText}>
                        Precio
                      </DataTable.Title>
                      <DataTable.Title textStyle={styles.tableHeaderText}>
                        Subtotal
                      </DataTable.Title>
                    </DataTable.Header>

                    {carrito.items.map((item) => (
                      <DataTable.Row
                        key={item.id_producto.nombre}
                        style={styles.tableRow}
                      >
                        <DataTable.Cell textStyle={styles.tableCell}>
                          {item.id_producto.nombre}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={styles.tableCell}>
                          {item.cantidad.toString()}
                        </DataTable.Cell>
                        <DataTable.Cell
                          textStyle={styles.tableCell}
                        >{`$ ${item.id_producto.precio_venta}`}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles.tableCell}>{`$ ${(
                          item.cantidad * item.precio
                        ).toFixed(2)}`}</DataTable.Cell>
                      </DataTable.Row>
                    ))}

                    <DataTable.Row style={styles.tableRow}>
                      <DataTable.Cell textStyle={styles.tableCell1}>
                        TOTAL
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.tableCell}></DataTable.Cell>
                      <DataTable.Cell style={styles.tableCell}></DataTable.Cell>
                      <DataTable.Cell
                        textStyle={styles.tableCell1}
                      >{`$ ${totalNumber}`}</DataTable.Cell>
                    </DataTable.Row>
                  </DataTable>
                  <View style={styles.section}>
                    <Checkbox
                      style={styles.checkbox}
                      value={isChecked}
                      onValueChange={setChecked}
                    />
                    <Text style={styles.paragraph}>Pedido a domicilio</Text>
                  </View>

                  <View style={styles.botonCompra}>
                    <CompraPdf
                      tableData={carrito.items}
                      isChecked={isChecked}
                      setAbrirModal={setAbrirModal}
                      abrirModal={abrirModal}
                      total={total}
                    />
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Resto del código de estilos se mantiene igual

export default DetalleCompra;
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
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    //backgroundColor:"red"
  },
  paragraph: {
    fontSize: 17,
  },
  checkbox: {
    margin: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  tableHeader: {
    backgroundColor: "#84cff5", // Color de fondo de la cabecera
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "#000",
  },
  tableRow: {
    height: 50, // Altura de cada fila
    backgroundColor: "#fff", // Color de fondo de cada fila
  },
  tableCell: {
    margin: 6,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  tableCell1: {
    margin: 6,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  botonCompra: {},
  containerDetails: {
    flex: 1,
    width: "100%",
    //backgroundColor: "red",
    //padding: 10,
    marginTop: 10,
  },
  modalTitle: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold"
  },
  modalDescription: {
    maxHeight: 200,
  },

  text: {
    color: "#fff",
    fontSize: 16,
  },

  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: {
    height: 70,
    backgroundColor: "#ddeffc",
    //fontSize: 20,
    //letterSpacing: 1,
  },
  rowStyle: {
    height: 80,
    backgroundColor: "#f0f8fe",
  },
  headText: {
    margin: 6,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  }, // estilo de texto para cabeceras
  rowText: { margin: 6, fontSize: 15, textAlign: "center" },

  parent: {
    backgroundColor: "black",
    width: "100%",
    height: 500,
  },

  subTitle: {
    fontSize: 18,
    marginBottom: 20,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#000",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
  },
});
