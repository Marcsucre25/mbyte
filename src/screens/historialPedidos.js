import React, { useContext, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from "react-native";
import { DataTable } from "react-native-paper";
import ContainerPrinicipal from "../components/ContainerPrinicipal";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Context/AuthContext";
import PdfPedido from "../components/pdfPedido";

const HistorialPedidos = ({ navigation }) => {
  const { dataPedido } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  return (
    <ContainerPrinicipal>
      <SafeAreaView>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="#d70000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>HISTORIAL DE PEDIDOS</Text>
            {!dataPedido || dataPedido.length < 1 ? (
              <Text style={styles.emptyCartMessage}>
                {dataPedido
                  ? "No tienes pedidos solicitados."
                  : "Cargando pedidos..."}
              </Text>
            ) : (
              <View style={styles.datos}>
                <DataTable>
                  <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title textStyle={styles.tableHeaderText}>
                      Fecha
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles.tableHeaderText}>
                      {" "}
                      Estado
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles.tableHeaderText}>
                      Detalles
                    </DataTable.Title>
                  </DataTable.Header>

                  {dataPedido.map((item) => (
                    <DataTable.Row key={item._id} style={styles.tableRow}>
                      <DataTable.Cell
                        textStyle={[styles.tableCell, styles.dateCell]}
                      >
                        {new Date(item.fecha).toISOString().split("T")[0]}
                      </DataTable.Cell>
                      <DataTable.Cell
                        textStyle={[
                          styles.tableCell1,
                          {
                            backgroundColor:
                              item.estado === "Pendiente"
                                ? "#fe780b"
                                : item.estado === "Finalizado"
                                ? "#1acd81"
                                : "red",
                            color: "#000",
                          },
                        ]}
                      >
                        {item.estado}
                      </DataTable.Cell>
                      <DataTable.Cell textStyle={styles.tableCell}>
                        <TouchableOpacity onPress={() => openModal(item)}>
                          <Ionicons name="reader" size={34} color={"blue"} />
                        </TouchableOpacity>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        {selectedOrder && (
          <View style={styles.modalContainer1}>
            <View style={styles.modalContent1}>
              <ScrollView>
                <TouchableOpacity onPress={() => closeModal()}>
                  <Ionicons name="close" size={30} color="#d70000" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Detalles del Pedido</Text>

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

                  {selectedOrder.items.map((product) => (
                    <DataTable.Row key={product._id} style={styles.tableRow}>
                      <DataTable.Cell textStyle={styles.tableCell}>
                        {product.id_producto.nombre}
                      </DataTable.Cell>
                      <DataTable.Cell textStyle={styles.tableCell}>
                        {product.cantidad}
                      </DataTable.Cell>
                      <DataTable.Cell textStyle={styles.tableCell}>
                        $ {product.precio}
                      </DataTable.Cell>
                      <DataTable.Cell textStyle={styles.tableCell}>
                        $ {product.total}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}

                  <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell textStyle={styles.tableCell1}>
                      Total
                    </DataTable.Cell>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell textStyle={styles.tableCell1}>
                      ${selectedOrder.total}
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
                <PdfPedido selectedOrder={selectedOrder} />
              </ScrollView>
            </View>
          </View>
        )}
      </Modal>
    </ContainerPrinicipal>
  );
};

export default HistorialPedidos;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  modalContainer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(34, 36, 48, 0.66)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modalContent: {
    padding: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 10,
    flexDirection: "column",
    marginTop: 30,
    //backgroundColor: "#fff",
    borderRadius: 10,
  },
  tableHeader: {
    backgroundColor: "#84cff5",
  },
  modalContent1: {
    padding: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
    flexDirection: "column",
    marginTop: "33%",
    backgroundColor: "#c3e3fb",
    borderRadius: 10,
  },
  datos: {
    //backgroundColor: "green",
    height: Dimensions.get("window").height - 140,
  },
  dateCell: {
    //backgroundColor: "red",
    width: 100,
    height: 30,
  },
  tableRow: {
    height: 50,
    backgroundColor: "#fff",
  },
  modalTitle: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },

  tableCell1: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",

    height: 40,
    width: 100,
    paddingTop: 6,
  },
  tableCell: {
    //margin: 6,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  emptyCartMessage: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#000",
    fontWeight: "900",
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",

    color: "#000",
  },
});
