import { Card } from "@rneui/themed";
import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { productList } from "../components/ProductList";
import ContainerPrinicipal from "../components/ContainerPrinicipal";
import { Ionicons } from "@expo/vector-icons";
import SwiperFlatList from "react-native-swiper-flatlist";
import useProducts from "./Productos/useProducts";

const DataMByte = ({ navigation }) => {
  const data = productList;
  const { products } = useProducts();

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity
          key={item._id}
          onPress={() => navigation.navigate("Productos")}
          style={[styles.button, styles.buttonOpen]}
          activeOpacity={0.7}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.imagen.secure_url }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          </View>
          <Text style={styles.textStyle}>{item.nombre}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ContainerPrinicipal>
      <ScrollView>
        <View>
          <Card.Title>
            <Text style={styles.name}>MByte Soluciones Técnologicas</Text>
          </Card.Title>
          <Card.Divider />
          <Card.Image
            source={require("../../assets/logo_mbyte.png")}
            style={{ width: "100%", height: 100, marginBottom: 10 }}
            resizeMode="contain"
          />
          <Text style={styles.name}>
            MBYTE OFRECE INSUMOS TECNOLÓGICOS, TELEFONÍA CELULAR, LAPTOPS, PC'S.
            ADICIONAMOS A NUESTROS CLIENTES ASESORAMIENTO Y ATENCIÓN
            PERSONALIZADA
          </Text>

          <View style={styles.line} />

          <Text style={styles.pageTitle}>Productos</Text>
          <View style={styles.line} />
          {!products ? (
            <Text style={styles.name1}>Cargando productos...</Text>
          ) : (
            <View style={styles.container}>
              <SwiperFlatList
                autoplayLoop
                index={2}
                data={products.productos.slice(0, 10)}
                renderItem={_renderItem}
              />
            </View>
          )}
          <View style={styles.line} />

          <Text style={styles.pageTitle}>Contactos</Text>
          <View style={styles.line} />
          <View style={styles.margin}>
            <View style={[styles.leftIcon, styles.leftIcon1]}>
              <Ionicons name="location-outline" size={27} color="#0087CC" />
            </View>
            <TouchableOpacity
              onPress={() => {
                const address = "Quito, Rosa Campuzano y Camilo Guachamín";
                const formattedAddress = address.replace(/\s/g, "+");
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
                Linking.openURL(mapsUrl);
              }}
            >
              <Text style={styles.name1}>Quito, Rosa Campuzano y</Text>
              <Text style={styles.name1}>Camilo Guachamín</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.margin}>
            <View style={styles.leftIcon}>
              <Ionicons name="logo-whatsapp" size={24} color="#0087CC" />
            </View>
            <TouchableOpacity
              onPress={() => {
                const phoneNumber = "+593978948486";
                const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
                Linking.openURL(whatsappUrl).catch(() => {
                  alert("WhatsApp no está instalado en tu dispositivo.");
                });
              }}
            >
              <Text style={styles.name1}>+593 97 894 8486</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.margin}>
            <View style={styles.leftIcon}>
              <Ionicons name="mail-outline" size={24} color="#0087CC" />
            </View>
            <Text style={styles.name1}>mbytesoluciones@gmail.com</Text>
          </View>
        </View>
      </ScrollView>
    </ContainerPrinicipal>
  );
};
export default DataMByte;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(34, 36, 48, 0.66)",
    height: 200,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: 20,

    width: 150,
    //marginLeft: 20,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  margin: {
    marginTop: 15,
    marginBottom: 10,
  },
  leftIcon: {
    position: "absolute",
    zIndex: 1,
    left: 17,
  },
  leftIcon1: {
    marginTop: 15,
  },
  styledInputLabel: {
    color: "red",
    fontSize: 20,
    textAlign: "left",
  },

  name: {
    fontSize: 22,
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
    //fontFamily:"Roboto"
  },
  name1: {
    fontSize: 20,
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  card: {
    //backgroundColor: "#1a2f51",
    //borderRadius: 10,
    //borderColor: "#1a2f51",
    backgroundColor: "rgba(34, 36, 48, 0.66)",
    borderColor: "rgba(34, 36, 48, 0.66)",
  },
  pageTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#004E9A",
    padding: 10,
  },
  line: {
    height: 1,
    width: "80%",
    backgroundColor: "#9CA3AF",
    marginVertical: 15,
    marginLeft: 40,
  },
  product: {
    //width: Dimensions.get("window").width,
    height: 200,
    //backgroundColor: "#fff",
    //marginTop: 10,
    overflow: "hidden",
  },

  button: {
    //borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpen: {
    //backgroundColor: "#000",
    backgroundColor: "rgba(34, 36, 48, 0.66)",
  },
});
