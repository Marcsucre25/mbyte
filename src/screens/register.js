import React, { useContext, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Colors } from "../components/Common/styles";
import { Formik } from "formik";
import MyTextInput from "../components/Common/MyTextInput";
import { AuthContext } from "../Context/AuthContext";
import ContainerPrinicipal from "../components/ContainerPrinicipal";
import InputButton from "../components/Common/inputButton";
import {
  letter,
  number,
  specialCaracter,
  validateAddress,
  validateEmail,
  validateLastName,
  validateName,
  validatePhone,
} from "../components/services/validacion1";
import { messages } from "../components/Common/messages";
import Toast from "react-native-root-toast";
import { CustomToast } from "../components/customToast";

const Register = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const { register } = useContext(AuthContext);

  const [nombre, setNombre] = useState(null);
  const [errorName, setErrorName] = useState("");
  const [apellido, setApellido] = useState(null);
  const [errorLastName, setErrorLastName] = useState("");
  const [correo, setCorreo] = useState(null);
  const [errorEmail, setErrorEmail] = useState("");
  const [contrasenia, setContrasenia] = useState(null);
  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMathPassword, setErrorMathPassword] = useState("");

  const verifyName = (name) => {
    if (validateName(name)) {
      setErrorName(null);
    } else {
      setErrorName(messages.INCORRECT_NAME);
    }
    setNombre(name);
  };

  const verifyLastName = (lastName) => {
    if (validateLastName(lastName)) {
      setErrorLastName(null);
    } else {
      setErrorLastName(messages.INCORRECT_LASTNAME);
    }
    setApellido(lastName);
  };

  const verifyEmail = (email) => {
    if (validateEmail(email)) {
      setErrorEmail(null);
    } else {
      setErrorEmail(messages.EMAIL_INCORRECT);
    }
    setCorreo(email);
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
    if (!nombre) {
      setErrorName(messages.INCORRECT_NAME);
      return false;
    }
    if (!apellido) {
      setErrorLastName(messages.INCORRECT_LASTNAME);
      return false;
    }
    if (!correo) {
      setErrorEmail(messages.EMAIL_INCORRECT);
      return false;
    }
    if (!address) {
      setErrorAddress(messages.ADDRESS_INCORRECT);
      return false;
    }
    if (!phone) {
      setErrorPhone(messages.PHONE_INCORRECT);
      return false;
    }

    if (!contrasenia) {
      setErrorPassword(messages.PASSWORDS_NOTSECURITY);
      return false;
    }

    return true;
  };

  const confirmOfPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    matchPassword(contrasenia, confirmPassword);
  };
  const matchPassword = (value1, value2) => {
    if (value1 == value2) {
      setErrorMathPassword(null);
    } else {
      setErrorMathPassword(messages.PASSWORDS_DONT_MATCH);
    }
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

  return (
    <ContainerPrinicipal>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Text style={styles.pageTitle}>MBYTE</Text>
            <Text style={styles.subTitle}>Registrarse</Text>

            <Formik
              initialValues={{
                name: "",
                email: "",
                dateOfBirth: "",
                password: "",
                confirmPassword: "",
              }}
            >
              {({}) => (
                <View style={styles.formArea}>
                  <MyTextInput
                    label="Nombre"
                    placeholder="Marcos Mauricio"
                    placeholderTextColor={Colors.darkLight}
                    icon="person"
                    value={nombre}
                    onChangeText={verifyName}
                    onEndEditing={() => validateLastName(nombre)}
                  />
                  <Text style={styles.msg}>{errorName}</Text>
                  <MyTextInput
                    label="Apellido"
                    placeholder="Moreira Mala"
                    placeholderTextColor={Colors.darkLight}
                    icon="person"
                    value={apellido}
                    onChangeText={verifyLastName}
                    onEndEditing={() => validateName(apellido)}
                  />
                  <Text style={styles.msg}>{errorLastName}</Text>

                  <MyTextInput
                    label="Correo Electrónico"
                    placeholder="example@hotmail.com"
                    placeholderTextColor={Colors.darkLight}
                    icon="mail"
                    keyboardType="email-address"
                    value={correo}
                    onChangeText={verifyEmail}
                    onEndEditing={() => validateEmail(correo)}
                  />
                  <Text style={styles.msg}>{errorEmail}</Text>
                  <MyTextInput
                    label="Dirección"
                    placeholder="La Floresta"
                    placeholderTextColor={Colors.darkLight}
                    icon="location"
                    keyboardType="email-address"
                    value={address}
                    onChangeText={verifyAdrees}
                    onEndEditing={() => validateAddress(correo)}
                  />
                  <Text style={styles.msg}>{errorAddress}</Text>
                  <MyTextInput
                    label="Teléfono"
                    placeholder="09XXXXXXXX"
                    placeholderTextColor={Colors.darkLight}
                    icon="phone-portrait"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={verifyPhone}
                    onEndEditing={() => validatePhone(correo)}
                  />
                  <Text style={styles.msg}>{errorPhone}</Text>

                  <MyTextInput
                    label="Contraseña"
                    placeholder="* * * * * * * *"
                    placeholderTextColor={Colors.darkLight}
                    icon="lock-open"
                    isPassword={true}
                    value={contrasenia}
                    onChangeText={verifyPassword}
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
                      !errorPassword &&
                      !errorEmail &&
                      !errorPhone &&
                      !errorMathPassword
                        ? register(
                            nombre,
                            apellido,
                            correo,
                            address,
                            phone,
                            contrasenia,
                            navigation
                          )
                        : Toast.show(
                            <CustomToast
                              message={
                                "Debe llenar correctamente todos los campos"
                              }
                            />,
                            {
                              duration: Toast.durations.SHORT,
                              position: Toast.positions.TOP,
                              backgroundColor: "red",
                            }
                          );
                    }}
                    text={"Registrarse"}
                  />

                  <View style={styles.line} />

                  <View style={styles.extraView}>
                    <Text style={styles.extraText}>Ya tienes una cuenta? </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={styles.textLinkContent}>Inicia Sesión</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </ContainerPrinicipal>
  );
};

export default Register;

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
    width: 250,
    height: 200,
  },
  pageTitle: {
    fontSize: 30,
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
  styledTextInput: {
    backgroundColor: Colors.secondary,
    padding: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 5,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 10,
    color: Colors.tertiary,
  },
  styledInputLabel: {
    color: Colors.tertiary,
    fontSize: 13,
    textAlign: "left",
  },
  leftIcon: {
    left: 15,
    top: 38,
    position: "absolute",
    zIndex: 1,
  },
  rightIcon: {
    right: 15,
    top: 38,
    position: "absolute",
    zIndex: 1,
  },
  styledButton: {
    padding: 15,
    backgroundColor: Colors.brand,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
    marginTop: 15,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
  },
  msg: {
    color: "red",
    //marginBottom: 4,
    marginTop: -5,
    fontWeight: "bold",
  },
  msgBox: {
    textAlign: "center",
    fontSize: 13,
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
    padding: 10,
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
