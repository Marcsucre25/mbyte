import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useContext } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import DataMByte from "./dataMbyte";
import Canasta from "./canasta";
import Profile from "./profile";
import { DataContext } from "../Context/DataContext";
import ProdutScreen from "./Productos/productScreen";
import { AuthContext } from "../Context/AuthContext";

const Tab = createMaterialBottomTabNavigator();

const Menu = () => {
  const theme = useTheme();
  const { dataCarrito } = useContext(AuthContext);

  theme.colors.secondaryContainer = "#e5e5e5";
  return (
    <Tab.Navigator
      tabBarActivateBackgroundColor="#fff"
      activateColor="#000"
      inactiveColor="#95a5a6"
      barStyle={styles.navigatorBar}
    >
      <Tab.Screen
        name="Inicio"
        component={DataMByte}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color="#000" size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Productos"
        component={ProdutScreen}
        options={{
          tabBarLabel: "Productos",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="laptop" color="#000" size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Mis compras"
        component={Canasta}
        options={{
          tabBarLabel: "Mis compras",
          tabBarIcon: () => (
            <View>
              <MaterialCommunityIcons
                name="cart-outline"
                color="#000"
                size={24}
              />

              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{dataCarrito.items.length}</Text>
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color="#000" size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigatorBar: {
    backgroundColor: "#f0f8fe",
    width: Dimensions.get("window").width,
  },
  badgeContainer: {
    position: "absolute",
    top: -8,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Menu;
