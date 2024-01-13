import React, { useState, useContext, useEffect } from "react";
import Constants from "expo-constants";
import ContainerPrinicipal from "../components/ContainerPrinicipal";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Dimensions } from "react-native";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DetalleCompra from "../components/DetalleCompra";
import { StyleButton } from "../components/Common/StyleButton";
import { DataContext } from "../Context/DataContext";
import InputButton from "../components/Common/inputButton";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import LoadingModal from "../components/loadingModal";
import Toast from "react-native-root-toast";
import { CustomToast } from "../components/customToast";

let screenWidth = Dimensions.get("window").width;

const Canasta = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const { dataCarrito, userToken, setDataCarrito } = useContext(AuthContext);
  const [loadingEliminar, setLoadingEliminar] = useState(false);
  const [loadingActualizar, setLoadingActualizar] = useState(false);

  const aumentarCantidad = async (productId) => {
    const selectedItem = dataCarrito.items.find(
      (item) => item.id_producto._id === productId
    );

    // Verificar si la cantidad ya es igual al stock del producto
    if (
      selectedItem &&
      selectedItem.cantidad === selectedItem.id_producto.cantidad
    ) {
      // Mostrar mensaje de cantidad máxima alcanzada
      console.log("Has llegado al máximo de cantidad de este producto");
      Toast.show(<CustomToast message={"Cantidad en stock alcanzada"} />, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: "red",
      });
    } else {
      const updatedCarrito = dataCarrito.items.map((item) =>
        item.id_producto._id === productId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );

      setDataCarrito({ items: updatedCarrito });
      await actualizarCantidad(productId, updatedCarrito);
    }
  };

  const disminuirCantidad = async (productId) => {
    const updatedCarrito = dataCarrito.items.map((item) =>
      item.id_producto._id === productId && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    );

    setDataCarrito({ items: updatedCarrito });
    await actualizarCantidad(productId, updatedCarrito);
  };

  //funcion cambiar cantidad
  const actualizarCantidad = async (productId, updatedCarrito) => {
    try {
      setLoadingActualizar(true);
      const response = await axios.put(
        `https://mbytesolucionesapi.onrender.com/api/carrito/actualizar-cantidad/${productId}`,
        {
          cantidad: updatedCarrito.find(
            (item) => item.id_producto._id === productId
          ).cantidad,
        },
        {
          headers: {
            method: "PUT",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Cantidad actualizada correctamente");
      setLoadingActualizar(false);
    } catch (err) {
      console.error("Error al actualizar la cantidad", err);
      setLoadingActualizar(false);
    }
  };

  //funcion eliminar producto
  const eliminarProducto = async (productId) => {
    try {
      setLoadingEliminar(true);
      const response = await axios.delete(
        `https://mbytesolucionesapi.onrender.com/api/carrito/eliminar-producto/${productId}`,
        {
          headers: {
            method: "DELETE",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Producto eliminardo correctamente");

      const updatedCarrito = dataCarrito.items.filter(
        (item) => item.id_producto._id !== productId
      );

      // Asegurarse de que siempre estás actualizando el estado con un array
      setDataCarrito(
        updatedCarrito.length > 0 ? { items: updatedCarrito } : { items: [] }
      );
      setLoadingEliminar(false);
    } catch (err) {
      console.error("Error de red al eliminar el producto", err);
      setLoadingEliminar(false);
    }
  };

  //calcular total
  const total =
    dataCarrito && dataCarrito.items
      ? dataCarrito.items
          .reduce((acc, el) => acc + el.cantidad * el.precio, 0)
          .toFixed(2)
      : 0;

  //Para generar detalle de compra
  const handleRealizarCompra = () => {
    setAbrirModal(true);
  };

  return (
    <ContainerPrinicipal>
      <Text style={styles.name2}>CARRITO DE COMPRAS</Text>
      {dataCarrito.items && dataCarrito.items.length > 0 ? (
        <>
          <Text style={styles.name1}>
            TOTAL: <Text style={styles.textTotal}>$ {total}</Text>
          </Text>
          <View style={styles.container}>
            <FlatList
              data={dataCarrito.items}
              renderItem={({ item }) => (
                <View style={styles.principal}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{ uri: item.id_producto.imagen.secure_url }}
                      borderRadius={23}
                      style={styles.image}
                    />

                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        padding: 10,
                      }}
                    >
                      <Text style={styles.name}>{item.id_producto.nombre}</Text>
                      <Text style={styles.textPrecio}>Precio</Text>
                      <Text style={styles.price}>
                        $ {item.id_producto.precio_venta}
                      </Text>
                      <Text style={styles.textPrecio}>Cantidad:</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.delete}
                      onPress={() => eliminarProducto(item.id_producto._id)}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={30}
                        color="#d70000"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.quanty}>
                    <TouchableOpacity
                      style={styles.menos}
                      onPress={() => disminuirCantidad(item.id_producto._id)}
                      disabled={item.cantidad === 1}
                    >
                      <Text
                        sstyle={{
                          height: verticalScale(10),
                          width: scale(10),
                          backgroundColor: "#535bfe",
                        }}
                      >
                        -
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.mas}>{item.cantidad}</Text>
                    <TouchableOpacity
                      style={{
                        height: verticalScale(30),
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => aumentarCantidad(item.id_producto._id)}
                    >
                      <Text
                        sstyle={{
                          height: verticalScale(10),
                          width: scale(10),
                          backgroundColor: "#535bfe",
                        }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item._id}
              ListFooterComponent={() => (
                <InputButton
                  text={"Realizar compra"}
                  onPress={handleRealizarCompra}
                />
              )}
            />
          </View>
          {loadingEliminar && <LoadingModal abrirModal={loadingEliminar} />}
          {loadingActualizar && <LoadingModal abrirModal={loadingActualizar} />}
          <Text>
            {abrirModal && (
              <DetalleCompra
                abrirModal={abrirModal}
                setAbrirModal={setAbrirModal}
                carrito={dataCarrito}
                total={total}
              />
            )}
          </Text>
        </>
      ) : (
        <Text style={styles.emptyCartMessage}>El carrito está vacío</Text>
      )}
    </ContainerPrinicipal>
  );
};

export default Canasta;

const styles = StyleSheet.create({
  name1: {
    fontSize: 20,
    marginBottom: 0,
    textAlign: "left",
    marginLeft: 10,
    letterSpacing: 1,
    color: "#000",

    fontWeight: "700",
    letterSpacing: -0.36,
  },
  name2: {
    fontSize: 21,
    marginBottom: 10,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#1a2f51",
    textAlign: "center",
    letterSpacing: -0.36,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,

    padding: 8,
  },
  principal: {
    margin: scale(10),
    alignSelf: "flex-end",
    width: screenWidth - scale(80),
    height: verticalScale(130),
    shadowColor: "#000",
    shadowOpacity: 0.16,
    borderRadius: 12,
    elevation: 2,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  image: {
    borderRadius: 23,
    width: verticalScale(98),
    height: verticalScale(98),
    marginLeft: -verticalScale(98 / 2),
    alignSelf: "center",
  },
  delete: {
    marginTop: 8,
  },

  textTotal: {
    color: "#c2e4fb",
    fontSize: 22,
  },
  botonCompra: {
    backgroundColor: "#99d3f7",
    width: 170,
    marginTop: 8,
    borderRadius: 40,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "black",
    borderWidth: 2,
    marginLeft: Dimensions.get("window").width / 3.5,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  name: {
    height: verticalScale(20),
    color: "#404852",
    width: 190,
    fontSize: scale(12),
    fontWeight: "700",
    letterSpacing: -0.36,
  },
  price: {
    height: verticalScale(22),
    color: "#535bfe",
    fontSize: scale(12),
    fontWeight: "bold",
    letterSpacing: -0.29,
    lineHeight: verticalScale(22),
  },
  textPrecio: {
    height: 16,
    color: "#adb3bf",
    fontSize: scale(12),
    fontWeight: "400",
    letterSpacing: -0.29,
    lineHeight: verticalScale(16),
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  quanty: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    width: scale(100),
    height: verticalScale(30),
    borderRadius: 15,
    backgroundColor: "#f3f5f9",
    position: "absolute",
    bottom: verticalScale(10),
    right: scale(16),
    flexDirection: "row",
  },
  mas: {
    width: scale(20),
    color: "#535bfe",
    fontSize: scale(15),
    fontWeight: "500",
    letterSpacing: -0.36,
    lineHeight: scale(22),
    textAlign: "center",
  },
  menos: {
    height: verticalScale(30),
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyCartMessage: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#000",
    fontWeight: "900",
  },
});
