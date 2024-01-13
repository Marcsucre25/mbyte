import React, { useContext, useEffect, useState } from "react";
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
import { ListItem } from "@rneui/themed";
import InputButton from "./Common/inputButton";
import { AuthContext } from "../Context/AuthContext";

const DetalleProduct = ({ abrirModal, setAbrirModal, product }) => {
  const { anadirProducto } = useContext(AuthContext);
  const [cantidad, setCantidad] = useState("1");

  const handleComprarProducto = (product, cantidad) => {
    anadirProducto(product._id, cantidad);
    setAbrirModal(false);
  };

  return (
    <>
      <Modal visible={abrirModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setAbrirModal(false)}>
              <Ionicons name="close" size={30} color="#d70000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Detalles del producto</Text>

            <ScrollView>
              {product && (
                <>
                  <ListItem key={product._id}>
                    <View style={styles.parent}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: product.imagen.secure_url }}
                          style={{
                            width: 200,
                            height: 200,
                            borderRadius: 10,
                          }}
                        />
                      </View>
                      <View style={styles.containerDetails}>
                        <Text style={styles.subTitle}>{product.nombre}</Text>
                        <Text style={styles.name1}>
                          STOCK:{" "}
                          <Text style={styles.textTotal}>
                            {product.cantidad}
                          </Text>
                        </Text>
                        <Text style={styles.name1}>
                          MARCA:{" "}
                          <Text style={styles.textTotal}>{product.marca}</Text>
                        </Text>
                        <Text style={styles.name1}>
                          DESCRIPCIÓN:{" "}
                          
                        </Text>
                        <ScrollView style={styles.modalDescription}>
                          <Text style={styles.buttonText}>
                            {product.descripcion}
                          </Text>
                        </ScrollView>
                        <Text style={styles.price}>
                          $ {product.precio_venta}
                        </Text>
                      </View>
                    </View>
                  </ListItem>
                </>
              )}
            </ScrollView>
            <InputButton
              text={"Añadir al carrito"}
              onPress={() => {
                handleComprarProducto(product, cantidad);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

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
    padding: 15,
    marginTop: "33%",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "column",
  },
  modalTitle: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },

  parent: {
    backgroundColor: "#c3e3fb",
    //backgroundColor: "red",
    width: "110%",
    //height: 500,
    padding: 10,
    margin: -16,
    justifyContent: "center",
    alignItems: "center",
  },
  name1: {
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 10,
    color: "#1a2f51",
  },
  textTotal: {
    color: "#459dec",
  },
  containerDetails: {
    flex: 1,
    width: "100%",
    //height: 100,
    //backgroundColor: "red",
    padding: 10,
    marginTop: 10,
  },
  imageContainer: {
    //flex: 1,
    //width: "100%",
    //height: 150,
    //backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#000",
  },

  buttonText: {
    color: "#1a2f51",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    color: "#68bbf2",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "right",
  },
});

export default DetalleProduct;
