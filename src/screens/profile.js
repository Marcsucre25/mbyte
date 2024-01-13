import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ContainerPrinicipal from "../components/ContainerPrinicipal";
import MyTextInput from "../components/Common/MyTextInput";
import { Colors } from "../components/Common/styles";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Context/AuthContext";
import InputProfile from "../components/Common/inputProfile";
import { StatusBar } from "expo-status-bar";

const Profile = ({ navigation }) => {
  const { dataUser } = useContext(AuthContext);

  return (
    <ContainerPrinicipal>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <View style={styles.header}>
            <View style={styles.editar}>
              <TouchableOpacity onPress={() => navigation.navigate("Editar")}>
                <Ionicons name="create" color="#99d3f7" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerContent}>
              <View style={styles.username}>
                <Text style={styles.name}>
                  {dataUser.clienteBD
                    ? `${dataUser.clienteBD.nombre} ${dataUser.clienteBD.apellido}`
                    : "Cargando información..."}
                </Text>
              </View>
              <View>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/mascota.png")}
                />
              </View>
            </View>
          </View>

          <View style={styles.body}>
            {dataUser.clienteBD ? (
              <>
                <InputProfile
                  label={"Correo electrónico"}
                  text={dataUser.clienteBD.correo}
                  icon={"mail"}
                />
                <InputProfile
                  label={"Dirección"}
                  text={dataUser.clienteBD.direccion}
                  icon={"location"}
                />
                <InputProfile
                  label={"Teléfono"}
                  text={dataUser.clienteBD.telefono}
                  icon={"phone-portrait"}
                />
              </>
            ) : (
              <Text style={styles.headtText}>Cargando información...</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </ContainerPrinicipal>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    height: 200,
    position: "relative",
    //backgroundColor: "#1F4172",
    backgroundColor: "rgba(34, 36, 48, 0.66)",
    width: "95%",
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  headerContent: {
    padding: 50,
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  editar: {
    position: "absolute",
    left: 10,
    top: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
  },
  headtText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 10,
    fontSize: 30,
    marginTop: 150,
  },
  body: {
    alignItems: "center",
  },
  text: {
    color: "white",
    margin: 10,
  },
  username: {
    flex: 1,
    padding: 10,
  },
});
