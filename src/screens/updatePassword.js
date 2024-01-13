import React, { useContext, useEffect, useState } from "react";
import ContainerPrinicipal from "../components/ContainerPrinicipal";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Colors } from "../components/Common/styles";
import { Ionicons } from "@expo/vector-icons";
import MyTextInput from "../components/Common/MyTextInput";
import InputButton from "../components/Common/inputButton";
import { messages } from "../components/Common/messages";
import { AuthContext } from "../Context/AuthContext";
import {
  letter,
  number,
  specialCaracter,
} from "../components/services/validacion1";
import Toast from "react-native-root-toast";
import { CustomToast } from "../components/customToast";

const UpdatePassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errorOldPassword, setErrorOldPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMathPassword, setErrorMathPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const { actualizarContrasenia } = useContext(AuthContext);

  const verifyPassword = (password) => {
    if (password.length < 8) {
      setErrorPassword(messages.PASSWORD_MIN);
    } else if (!number(password)) {
      setErrorPassword(messages.PASSWORD_NUMBER);
      //validarIgualdad(oldPassword, password);
    } else if (!letter(password)) {
      setErrorPassword(messages.PASSWORD_LETTER);
      //validarIgualdad(oldPassword, password);
    } else if (!specialCaracter(password)) {
      setErrorPassword(messages.PASSWORD_CARACTER);
      //validarIgualdad(oldPassword, password);
    } else {
      setErrorPassword(null);
      validarIgualdad(oldPassword, password);
    }
    setPassword(password);
  };

  const confirmOfPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    matchPassword(password, confirmPassword);
  };

  const verifyOldPassword = (oldPassword) => {
    if (oldPassword.length < 8) {
      setErrorOldPassword(messages.PASSWORD_MIN);
    } else {
      setErrorOldPassword(null);
    }
    setOldPassword(oldPassword);
  };

  const matchPassword = (value1, value2) => {
    if (value1 == value2) {
      setErrorMathPassword(null);
    } else {
      setErrorMathPassword(messages.PASSWORDS_DONT_MATCH);
    }
  };

  const validarIgualdad = (value1, value2) => {
    if (value1 == value2) {
      setErrorPassword("La contraseña debe ser diferente a la actual");
      return false;
    } else {
      setErrorPassword(null);
      return true;
    }
  };

  const validate = () => {
    if (
      oldPassword.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setErrorPassword(messages.PASSWORDS_NOTSECURITY);
      setErrorMathPassword(messages.PASSWORDS_DONT_MATCH);
      setErrorOldPassword("Debe ingresar su contraseña actual");
      return false;
    }

    return true;
  };

  return (
    <ContainerPrinicipal>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#d70000" />
              </TouchableOpacity>

              <View style={styles.datos}>
                <ScrollView>
                  <View style={styles.body}>
                    <Text style={styles.modalTitle}>ACTUALIZAR CONTRASEÑA</Text>
                    <MyTextInput
                      label="Contraseña actual"
                      placeholder="************"
                      placeholderTextColor={Colors.darkLight}
                      icon="lock-closed"
                      onChangeText={verifyOldPassword}
                      value={oldPassword}
                      isPassword={true}
                      hidePassword={hidePassword}
                      setHidePassword={setHidePassword}
                      secureTextEntry={hidePassword}
                    />
                    <Text style={styles.msg}>{errorOldPassword}</Text>
                    <MyTextInput
                      label="Nueva Contraseña"
                      placeholder="*************"
                      placeholderTextColor={Colors.darkLight}
                      icon="lock-closed"
                      onChangeText={verifyPassword}
                      value={password}
                      isPassword={true}
                      hidePassword={hidePassword}
                      setHidePassword={setHidePassword}
                      secureTextEntry={hidePassword}
                    />
                    <Text style={styles.msg}>{errorPassword}</Text>

                    <MyTextInput
                      label="Confirmar contraseña"
                      placeholder="************"
                      placeholderTextColor={Colors.darkLight}
                      icon="lock-closed"
                      onChangeText={confirmOfPassword}
                      value={confirmPassword}
                      isPassword={true}
                      hidePassword={hidePassword}
                      setHidePassword={setHidePassword}
                      secureTextEntry={hidePassword}
                    />
                    <Text style={styles.msg}>{errorMathPassword}</Text>
                    <InputButton
                      onPress={() => {
                        validate() &&
                        validarIgualdad(oldPassword, password) &&
                        !errorPassword &&
                        !errorMathPassword &&
                        !errorOldPassword
                          ? actualizarContrasenia(
                              oldPassword,
                              password,
                              confirmPassword,
                              navigation
                            )
                          : Toast.show(
                              <CustomToast
                                message={
                                  "Debe llenar correctamente todos los campos"
                                }
                              />,
                              {
                                duration: Toast.durations.LONG,
                                position: Toast.positions.TOP,
                                backgroundColor: "red",
                              }
                            );
                      }}
                      text={"Actualizar contraseña"}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ContainerPrinicipal>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  modalContainer: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(34, 36, 48, 0.66)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modalContent: {
    //backgroundColor: "#c3e3fb",
    padding: 20,
    //marginTop: "33%",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 10,
    //borderRadius: 20,
    flexDirection: "column",
    marginTop: 30,
  },
  modalTitle: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    //backgroundColor: "red",
    height: Dimensions.get("window").height - 250,
  },
  datos: {
    //backgroundColor: "green",
    //height: "85%"
    height: Dimensions.get("window").height - 185,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  msg: {
    color: "red",
    //marginBottom: 4,
    marginTop: -10,
  },
  extraView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  extraText: {
    justifyContent: "center",
    alignContent: "center",
    color: Colors.tertiary,
    fontSize: 15,
  },
  textLinkContent: {
    color: Colors.brand,
    fontSize: 15,
  },
  boton: {
    //backgroundColor: "blue",
    marginLeft: -90,
  },
});
