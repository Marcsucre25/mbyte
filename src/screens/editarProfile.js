import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import MyTextInput from "../components/Common/MyTextInput";
import { Colors } from "../components/Common/styles";
import { StyleButton } from "../components/Common/StyleButton";
import { messages } from "../components/Common/messages";
import {
  validateAddress,
  validateEmail,
  validateLastName,
  validateName,
  validatePhone,
} from "../components/services/validacion1";
import ContainerPrinicipal from "../components/ContainerPrinicipal";
import { AuthContext } from "../Context/AuthContext";
import InputButton from "../components/Common/inputButton";
import Toast from "react-native-root-toast";
import { CustomToast } from "../components/customToast";
import { StatusBar } from "expo-status-bar";

const EditarProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const { dataUser, actualizarDatos } = useContext(AuthContext);

  useEffect(() => {
    viewData();
  }, []);

  const verifyName = (name) => {
    if (validateName(name)) {
      setErrorName(null);
    } else {
      setErrorName(messages.INCORRECT_NAME);
    }
    setName(name);
  };

  const verifyLastName = (lastName) => {
    if (validateLastName(lastName)) {
      setErrorLastName(null);
    } else {
      setErrorLastName(messages.INCORRECT_LASTNAME);
    }
    setLastName(lastName);
  };

  const verifyPhone = (phone) => {
    if (validatePhone(phone)) {
      setErrorPhone(null);
    } else {
      setErrorPhone(messages.PHONE_INCORRECT);
    }
    setPhone(phone);
  };

  const verifyAdrees = (address) => {
    // if (validateAddress(address)) {
    //   setErrorAddress(null);
    // } else {
    //   setErrorAddress(messages.ADDRESS_INCORRECT);
    // }
    setAddress(address);
  };

  const validate = () => {
    if (!name) {
      setErrorName(messages.INCORRECT_NAME);
      return false;
    }
    if (!lastName) {
      setErrorLastName(messages.INCORRECT_LASTNAME);
      return false;
    }
    if (!phone) {
      setErrorPhone(messages.PHONE_INCORRECT);
      return false;
    }
    if (!address) {
      setErrorAddress(messages.ADDRESS_INCORRECT);
      return false;
    }

    return true;
  };

  viewData = () => {
    setName(dataUser.clienteBD.nombre);
    setLastName(dataUser.clienteBD.apellido);
    setAddress(String(dataUser.clienteBD.direccion));
    setPhone(String(dataUser.clienteBD.telefono));
  };

  return (
    <ContainerPrinicipal>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.modalContainer}>
            <StatusBar style="dark" />
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#d70000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>EDITAR PERFIL</Text>
              <View style={styles.datos}>
                <ScrollView>
                  <View style={styles.body}>
                    <MyTextInput
                      label="Nombre"
                      placeholder="Marcos"
                      placeholderTextColor={Colors.darkLight}
                      keyboardType="email-address"
                      icon="person"
                      onChangeText={verifyName}
                      onEndEditing={() => validateName(name)}
                      value={name}
                    />
                    <Text style={styles.msg}>{errorName}</Text>
                    <MyTextInput
                      label="Apellido"
                      placeholder="Moreira"
                      placeholderTextColor={Colors.darkLight}
                      keyboardType="email-address"
                      icon="person"
                      onChangeText={verifyLastName}
                      onEndEditing={() => validateLastName(lastName)}
                      value={lastName}
                    />
                    <Text style={styles.msg}>{errorLastName}</Text>
                    <MyTextInput
                      label="Dirección"
                      placeholder="La argelia"
                      placeholderTextColor={Colors.darkLight}
                      keyboardType={"email-address"}
                      icon="location"
                      onChangeText={verifyAdrees}
                      onEndEditing={() => validateAddress(address)}
                      value={address}
                    />
                    <Text style={styles.msg}>{errorAddress}</Text>

                    <MyTextInput
                      label="Teléfono"
                      placeholder="09XXXXXXXX"
                      placeholderTextColor={Colors.darkLight}
                      keyboardType={"numeric"}
                      icon="phone-portrait"
                      onChangeText={verifyPhone}
                      onEndEditing={() => validatePhone(phone)}
                      value={phone}
                    />
                    <Text style={styles.msg}>{errorPhone}</Text>

                    <View style={styles.extraView}>
                      <Text style={styles.extraText}>Actualizar </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Update")}
                      >
                        <Text style={styles.textLinkContent}>contraseña</Text>
                      </TouchableOpacity>
                    </View>
                    <InputButton
                      text={"Editar Perfil"}
                      onPress={() => {
                        validate() && !errorPhone
                          ? actualizarDatos(
                              name,
                              lastName,
                              address,
                              phone,
                              navigation
                            )
                          : Toast.show(
                              <CustomToast
                                message={
                                  "Debe llenar todos los campos correctamentes"
                                }
                              />,
                              {
                                duration: Toast.durations.LONG,
                                position: Toast.positions.TOP,
                                backgroundColor: "red",
                              }
                            );
                      }}
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

export default EditarProfile;

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
    marginBottom: 20,
    //backgroundColor: "red",
    height: "100%",
  },
  datos: {
    //backgroundColor: "green",
    //height: "85%"
    height: Dimensions.get("window").height - 140,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  textLinkContent: {
    color: Colors.brand,
    fontSize: 18,
    fontWeight: "bold",
  },
});
