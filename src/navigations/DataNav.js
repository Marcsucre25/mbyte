import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "../screens/login";
import Register from "../screens/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecoverPassword from "../screens/recoverPassword";
const Stack = createNativeStackNavigator();

const DataNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DataNav;

const styles = StyleSheet.create({});
