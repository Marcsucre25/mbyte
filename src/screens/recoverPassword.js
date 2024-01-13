import React, { useContext, useState } from "react";
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
import { validateEmail } from "../components/services/validacion1";
import { messages } from "../components/Common/messages";
import { AuthContext } from "../Context/AuthContext";
import Toast from "react-native-root-toast";
import { CustomToast } from "../components/customToast";

const RecoverPassword = ({ navigation }) => {
  const [errorEmail, setErrorEmail] = useState("");
  const [email, setEmail] = useState("");
  const { recuperarContraseña } = useContext(AuthContext);

  const verifyEmail = (email) => {
    if (validateEmail(email)) {
      setErrorEmail(null);
    } else {
      setErrorEmail(messages.EMAIL_INCORRECT);
    }
    setEmail(email);
  };

  const validate = () => {
    if (!email) {
      setErrorEmail(messages.EMAIL_INCORRECT);
      return false;
    }

    return true;
  };
  return (
    <ContainerPrinicipal>
      <SafeAreaView>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="#d70000" />
            </TouchableOpacity>

            <View style={styles.datos}>
              <ScrollView>
                <View style={styles.body}>
                  <Image
                    style={styles.pageLogo}
                    resizeMode="contain"
                    source={require("../../assets/mascota.png")}
                  />
                  <Text style={styles.modalTitle}>REESTABLECER CONTRASEÑA</Text>
                  <MyTextInput
                    label="Correo Electronico"
                    placeholder="ejemploandres@@gmail.com"
                    placeholderTextColor={Colors.darkLight}
                    keyboardType={"email-address"}
                    icon="mail"
                    onChangeText={verifyEmail}
                    onEndEditing={() => validateEmail(email)}
                    value={email}
                  />
                  <Text style={styles.msg}>{errorEmail}</Text>

                  <InputButton
                    onPress={() => {
                      validate() && !errorEmail
                        ? recuperarContraseña(email, navigation)
                        : Toast.show(
                            <CustomToast
                              message={"Ingrese un email correcto"}
                            />,
                            {
                              duration: Toast.durations.LONG,
                              position: Toast.positions.TOP,
                              backgroundColor: "red",
                            }
                          );
                    }}
                    text={"Enviar email"}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ContainerPrinicipal>
  );
};

export default RecoverPassword;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",

    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modalContent: {
    padding: 20,

    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 10,

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

    height: "100%",
  },
  pageLogo: {
    width: 180,
    height: 180,
    marginBottom: 20
  },
  datos: {
    height: Dimensions.get("window").height - 140,
  },

  msg: {
    color: "red",

    marginTop: -5,
    fontWeight: "bold",
  },
});
