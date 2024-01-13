import React, { useContext } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../Context/AuthContext";

const ServicesNavigations = () => {
  const { logout, userInfo } = useContext(AuthContext);
  return (
    <View>
      <Text style={{ textAlign: "center", color: "#000" }}>
        Has iniciado sesion correctamente
      </Text>
      <TouchableOpacity
        onPress={() => {
          logout();
          //navigation.navigate("Login");
        }}
      >
        <Text>Cerrar sesion</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", color: "#000", fontWeight: "bold" }}>
        Bienvenido {userInfo.nombre}
      </Text>
    </View>
  );
};

export default ServicesNavigations;
