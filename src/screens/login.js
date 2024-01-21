import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Colors } from "../components/Common/styles";
import Constants from "expo-constants";
import MyTextInput from "../components/Common/MyTextInput";
import { AuthContext } from "../Context/AuthContext";
import ContainerPrinicipal from "../components/ContainerPrinicipal";
import InputButton from "../components/Common/inputButton";
import {
  letter,
  number,
  specialCaracter,
  validateEmail,
} from "../components/services/validacion1";
import { messages } from "../components/Common/messages";
import Toast from "react-native-root-toast";
import { CustomToast } from "../components/customToast";
import { StatusBar } from "expo-status-bar";

const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  const [hidePassword, setHidePassword] = useState(true);
  const [correo, setCorreo] = useState(null);
  const [errorEmail, setErrorEmail] = useState("");
  const [contrasenia, setContrasenia] = useState(null);
  const [errorPassword, setErrorPassword] = useState("");

  const verifyEmail = (email) => {
    if (validateEmail(email)) {
      setErrorEmail(null);
    } else {
      setErrorEmail(messages.EMAIL_INCORRECT);
    }
    setCorreo(email);
  };

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
    }
    setContrasenia(password);
  };

  const validate = () => {
    if (!correo) {
      setErrorEmail(messages.EMAIL_INCORRECT);
      return false;
    }

    if (!contrasenia) {
      setErrorPassword(messages.PASSWORDS_NOTSECURITY);
      return false;
    }

    return true;
  };

  return (
    <ContainerPrinicipal>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <View style={styles.innerContainer}>
            <Image
              style={styles.pageLogo}
              resizeMode="contain"
              source={require("../../assets/logo_mbyte.png")}
            />
            <Text style={styles.pageTitle}>Soluciones Tecnológicas</Text>

            <Text style={styles.subTitle}>Inicio de Sesión</Text>

            <Formik initialValues={{ email: "", password: "" }}>
              {({}) => (
                <View style={styles.formArea}>
                  <MyTextInput
                    label="Correo Electrónico"
                    placeholder="ejemplo@gmail.com"
                    placeholderTextColor={Colors.darkLight}
                    keyboardType="email-address"
                    icon="mail"
                    value={correo}
                    onChangeText={verifyEmail}
                    onEndEditing={() => validateEmail(correo)}
                  />

                  <MyTextInput
                    label="Contraseña"
                    placeholder="* * * * * * * *"
                    placeholderTextColor={Colors.darkLight}
                    icon="lock-closed"
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                    secureTextEntry={hidePassword}
                    value={contrasenia}
                    onChangeText={verifyPassword}
                  />

                  <InputButton
                    onPress={() => {
                      validate()
                        ? login(correo, contrasenia)
                        : Toast.show(
                            <CustomToast
                              message={"Ingrese correctamente sus credenciales"}
                            />,
                            {
                              duration: Toast.durations.SHORT,
                              position: Toast.positions.TOP,
                              backgroundColor: "red",
                            }
                          );
                    }}
                    text={"Iniciar Sesión"}
                  />

                  <View style={styles.line} />

                  <View style={styles.extraView}>
                    <Text style={styles.extraText}>
                      Aún no tienes una cuenta?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Register")}
                    >
                      <Text style={styles.textLinkContent}>Registrate</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.extraView}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("RecoverPassword")}
                    >
                      <Text style={styles.textLinkContent}>
                        Olvidaste tu contraseña ?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </ContainerPrinicipal>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: Constants.statusBarHeight + 30,
    //backgroundColor: Colors.primary,
    height: Dimensions.get("window").height,
    //backgroundColor: "red"
  },
  innerContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    //backgroundColor: "rgba(34, 36, 48, 0.66)",
  },
  pageLogo: {
    width: 180,
    height: 180,
  },
  pageTitle: {
    fontSize: 27,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.brand,
    padding: 10,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
    letterSpacing: 1,
    fontWeight: "bold",
    color: Colors.tertiary,
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.darkLight,
    marginVertical: 10,
  },
  formArea: {
    width: "90%",
  },
  extraView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    //backgroundColor:"red"
  },
  extraText: {
    justifyContent: "center",
    alignContent: "center",
    color: Colors.cuartiary,
    fontSize: 15,
  },
  textLinkContent: {
    color: Colors.tertiary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
