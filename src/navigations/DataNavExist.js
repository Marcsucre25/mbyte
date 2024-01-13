import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "../screens/menu";
import ProductScreen from "../screens/Productos/productScreen";
import UpdatePassword from "../screens/updatePassword";
import EditarProfile from "../screens/editarProfile";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Context/AuthContext";
import HistorialPedidos from "../screens/historialPedidos";
const Stack = createNativeStackNavigator();

const DataNavExist = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          title: "MBYTE",
          headerTitleAlign: "left",
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 0 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Historial");
                }}
              >
                <Ionicons
                  name="list"
                  size={28}
                  color="blue"
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Ionicons
                  name="exit"
                  size={28}
                  color="#F10F0F"
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerBackground: () => (
            <LinearGradient
              colors={["#f0f8fe", "#1F4172"]}
              start={{ x: 1.3, y: 0.3 }}
              end={{ x: 0, y: 0.5 }}
              style={{ flex: 1 }}
            />
          ),
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Productos"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update"
        component={UpdatePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Editar"
        component={EditarProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Historial"
        component={HistorialPedidos}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DataNavExist;

const styles = StyleSheet.create({});
