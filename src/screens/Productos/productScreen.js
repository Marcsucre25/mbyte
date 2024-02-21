import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ContainerPrinicipal from "../../components/ContainerPrinicipal";
import useProducts from "./useProducts";
import { scale, verticalScale } from "react-native-size-matters";
import axios from "axios";
import DetalleProduct from "../../components/DetalleProduct";
import { ActivityIndicator } from "react-native-paper";
import { Menu, MenuItem } from "react-native-material-menu";
import { Ionicons } from "@expo/vector-icons";

const ProductScreen = () => {
  const { products, categorys } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  useEffect(() => {}, []);

  //Funcion para obtener detalle
  useEffect(() => {
    const obtenerDetallesProducto = async (productId) => {
      try {
        const response = await axios.get(
          `https://mbytesolucionesapi.onrender.com/api/producto/detalle/${productId}`
        );

        if (response.status === 200) {
          setModalVisible(true);
        } else {
          console.error(
            "Error al obtener los detalles del producto:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    if (selectedProduct) {
      obtenerDetallesProducto(selectedProduct._id);
    }
  }, [selectedProduct]);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCategorySelect = (category, index) => {
    setSelectedCategory(category);
    setSelectedCategoryIndex(index);
    hideMenu();
  };

  const filteredProducts = selectedCategory
    ? products.productos.filter(
        (product) =>
          product.categoria && product.categoria._id === selectedCategory._id
      )
    : products?.productos;

  const isSelectedCategory = (categoryId) =>
    selectedCategory && selectedCategory._id === categoryId;

  return (
    <ContainerPrinicipal>
      <ScrollView>
        <View>
          <Menu
            style={styles.menu}
            visible={visible}
            anchor={
              <Text onPress={showMenu} style={styles.bar}>
                <Ionicons name="menu" size={50} color="#e8e6ff" />
              </Text>
            }
            onRequestClose={hideMenu}
          >
            <MenuItem
              key="all"
              onPress={() => handleCategorySelect(null, null)}
              textStyle={[
                styles.barItems,
                {
                  backgroundColor: !selectedCategory
                    ? "#000"
                    : "rgba(34, 36, 48, 0.66)",
                  color: !selectedCategory ? "#68bbf2" : "#FFF",
                },
              ]}
            >
              Todos los productos
            </MenuItem>
            {categorys?.categorias.map((categoria, index) => (
              <MenuItem
                key={categoria._id}
                onPress={() => handleCategorySelect(categoria, index)}
                textStyle={[
                  styles.barItems,
                  {
                    backgroundColor: isSelectedCategory(categoria._id)
                      ? "#000"
                      : "rgba(34, 36, 48, 0.66)",
                    color: isSelectedCategory(categoria._id)
                      ? "#68bbf2"
                      : "#FFF",
                  },
                ]}
              >
                {categoria.nombre}
              </MenuItem>
            ))}
          </Menu>
        </View>
        <View style={styles.container}>
          {filteredProducts && filteredProducts.length ? (
            filteredProducts.map((producto) => (
              <TouchableOpacity
                key={producto._id}
                onPress={() => openModal(producto)}
                style={[styles.button, styles.buttonOpen]}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: producto.imagen.secure_url }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />
                </View>
                <Text style={styles.textStyle}>{producto.nombre}</Text>
                <Text style={styles.price}>$ {producto.precio_venta}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.indicatorWrapper}>
              <ActivityIndicator
                size="large"
                color="blue"
                style={styles.indicator}
              />
              <Text style={styles.indicatorText}>Cargando productos...</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <DetalleProduct
        abrirModal={isModalVisible}
        setAbrirModal={setModalVisible}
        product={selectedProduct}
        setProduct={setSelectedProduct}
      />
    </ContainerPrinicipal>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flexDirection: "row", // Esto alinea los productos en una fila
    flexWrap: "wrap", // Esto permite que los productos se envuelvan a la siguiente fila si no hay suficiente espacio
    justifyContent: "space-around", // Esto distribuye los productos de manera uniforme en la fila
    paddingHorizontal: 10, // Añade un pequeño espacio horizontal entre los productos
    width: "100%",
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    marginVertical: 10,
    width: "47%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  buttonOpen: {
    backgroundColor: "#ffffff",
  },

  textStyle: {
    // height: verticalScale(20),
    color: "#404852",
    //width: 190,
    fontSize: scale(12),
    fontWeight: "700",
    letterSpacing: -0.36,
  },
  barItems: {
    width: "100%",
    height: 50,
    //backgroundColor: "#000",
    color: "#FFF",
    //borderRadius: 15,
    textAlign: "center",
    lineHeight: 50,
  },
  bar: {
    width: "100%",
    height: 50,
    //backgroundColor: "#FFA87D",
    //backgroundColor: "#fff",
    paddingLeft: 15,
  },
  menu: {
    top: 105,
    backgroundColor: "rgba(34, 36, 48, 0.66)",
    width: 200,
    //borderRadius: 20,

    marginLeft: 20,
  },
  price: {
    color: "#535bfe",
    // height: verticalScale(20),
    //width: 190,
    fontSize: scale(12),
    fontWeight: "700",
    letterSpacing: -0.36,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: 10,
    width: "100%",
    height: "70%",
    //backgroundColor: "red",
  },

  botonCompra: {
    backgroundColor: "#000",
    padding: 8,
    width: 150,
    marginTop: 8,
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  menu: {
    top: 105,
    backgroundColor: "rgba(34, 36, 48, 0.66)",
    width: 200,
    //borderRadius: 20,

    marginLeft: 20,
  },
  barItems: {
    width: "100%",
    height: 50,
    //backgroundColor: "#000",
    color: "#FFF",
    //borderRadius: 15,
    textAlign: "center",
    lineHeight: 50,
  },
  dialog: {
    margin: 0,
    justifyContent: "flex-end",
  },

  indicatorWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "red",
    marginTop: Dimensions.get("window").height / 4,
  },
  indicatorText: {
    fontSize: 19,
    marginTop: 12,
    fontWeight: "bold",
  },
});
