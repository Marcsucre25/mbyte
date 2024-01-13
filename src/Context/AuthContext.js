import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-root-toast";

import { CustomToast } from "../components/customToast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [dataCarrito, setDataCarrito] = useState({ items: [] });
  const [dataPedido, setDataPedido] = useState({ pedidosBD: [] });

  //obtener perfil
  const perfil = (token) => {
    setisLoading(true);
    axios
      .get("https://mbytesolucionesapi.onrender.com/api/cliente/perfil", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataUser(res.data);

        setisLoading(false);
      })
      .catch((err) => {
        //console.log("Error al inicar sesion: ", err);
        console.log("Mensaje de perfil: ", err.response.data.msg);
        setisLoading(false);
        Toast.show(
          <CustomToast message={"Cierre sesión y vuelva a ingresar"} />,
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: "red",
          }
        );
      });
  };

  //Inicio de Sesion
  const login = (correo, contrasenia) => {
    setisLoading(true);

    axios
      .post("https://mbytesolucionesapi.onrender.com/api/login", {
        correo,
        contrasenia,
      })
      .then((res) => {
        AsyncStorage.setItem("token", res.data.token);

        let userInfo = res.data;
        setUserInfo(userInfo);
        setUserToken(userInfo.token);

        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", userInfo.token);

        perfil(userInfo.token);
        obtenerItemsCarrito(userInfo.token);
        obtenerPedidos(userInfo.token);

        setisLoading(false);
      })
      .catch((err) => {
        console.log("Mensaje de error: ", err.response.data.msg);
        setisLoading(false);
        Toast.show(<CustomToast message={err.response.data.msg} />, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          backgroundColor: "red",
        });
      });
  };

  //Registrar
  const register = (
    nombre,
    apellido,
    correo,
    direccion,
    telefono,
    contrasenia,
    navigation
  ) => {
    setisLoading(true);
    axios
      .post("https://mbytesolucionesapi.onrender.com/api/registro", {
        nombre,
        apellido,
        correo,
        direccion,
        telefono,
        contrasenia,
      })
      .then((res) => {
        setisLoading(false);
        Toast.show(<CustomToast message={res.data.msg} />, {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: "green",
        });
        navigation.navigate("Login");
      })
      .catch((err) => {
        if (err.response) {
          setisLoading(false);
          Toast.show(<CustomToast message={err.response.data.msg} />, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: "red",
          });
        } else if (err.request) {
          console.log("Error al registrar: No se recibió respuesta");
        } else {
          console.log("Error antes de hacer la solicitud: ", err.message);
        }
      });
  };

  //Actualizar datos cliente
  const actualizarDatos = (
    nombre,
    apellido,
    direccion,
    telefono,
    navigation
  ) => {
    setisLoading(true);
    axios
      .put(
        "https://mbytesolucionesapi.onrender.com/api/cliente/actualizar",
        {
          nombre,
          apellido,
          direccion,
          telefono,
        },
        {
          headers: {
            method: "PUT",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log("Se actualizo correctamente");
        setDataUser({
          ...dataUser,
          clienteBD: {
            ...dataUser.clienteBD,
            nombre,
            apellido,
            direccion,
            telefono,
          },
        });
        perfil(userToken);
        setisLoading(false);
        navigation.navigate("Profile");
        Toast.show(<CustomToast message={res.data.msg} />, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          backgroundColor: "green",
        });
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error al actualizar: ", err.response.data.msg);
          setisLoading(false);
          Toast.show(<CustomToast message={err.response.data.msg} />, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: "red",
          });
        } else if (err.request) {
          console.log("Error al actualizar: No se recibió respuesta");
        } else {
          console.log("Error antes de hacer la solicitud: ", err.message);
        }
      });
  };

  //recuperar contraseña
  const recuperarContraseña = (correo, navigation) => {
    setisLoading(true);
    axios
      .post("https://mbytesolucionesapi.onrender.com/api/recuperar-password", {
        correo,
      })
      .then((res) => {
        setisLoading(false);
        Toast.show(<CustomToast message={res.data.msg} />, {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: "green",
        });
        navigation.navigate("Login");
      })
      .catch((err) => {
        if (err.response) {
          setisLoading(false);
          Toast.show(<CustomToast message={err.response.data.msg} />, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: "red",
          });
        } else if (err.request) {
          console.log("Error al enviar correo: No se recibió respuesta");
        } else {
          console.log("Error antes de hacer la solicitud: ", err.message);
        }
      });
  };

  //Actualizar contraseña
  const actualizarContrasenia = (
    oldercontrasenia,
    nuevaContrasenia,
    confirmcontrasenia,
    navigation
  ) => {
    setisLoading(true);
    axios
      .put(
        "https://mbytesolucionesapi.onrender.com/api/cliente/actualizarpassword",
        {
          oldercontrasenia,
          nuevaContrasenia,
          confirmcontrasenia,
        },
        {
          headers: {
            method: "PUT",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        setisLoading(false);
        Toast.show(<CustomToast message={res.data.msg} />, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          backgroundColor: "green",
        });
        navigation.navigate("Profile");
      })
      .catch((err) => {
        if (err.response) {
          console.log(
            "Error al actualizar cpntraseña: ",
            err.response.data.msg
          );
          setisLoading(false);
          Toast.show(<CustomToast message={err.response.data.msg} />, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: "red",
          });
        } else if (err.request) {
          console.log(
            "Error al actualizar cpntraseña: No se recibió respuesta"
          );
        } else {
          console.log("Error al actualizar cpntraseña: ", err.message);
        }
      });
  };

  //AÑadir producto al carrito
  const anadirProducto = (id_producto, cantidad) => {
    setisLoading(true);
    axios
      .post(
        "https://mbytesolucionesapi.onrender.com/api/carrito/agregar",
        {
          id_producto,
          cantidad,
        },
        {
          headers: {
            method: "PUT",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log("Producto añadido correctamente");
        setisLoading(false);
        // Actualizar el carrito después de agregar el producto
        obtenerItemsCarrito(userToken);
        Toast.show(<CustomToast message={res.data.mensaje} />, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          backgroundColor: "#50ce69",
        });
      })
      .catch((err) => {
        if (err.response) {
          console.log(
            "Error al añadir producto al carrito: ",
            err.response.data.mensaje
          );
          setisLoading(false);
          Toast.show(<CustomToast message={err.response.data.mensaje} />, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: "red",
          });
        } else if (err.request) {
          console.log(
            "Error al añadir producto al carrito: No se recibió respuesta"
          );
        } else {
          console.log("Error al añadir producto al carrito: ", err.mensaje);
        }
      });
  };
  //obtener items del carrito
  const obtenerItemsCarrito = (token) => {
    axios
      .get("https://mbytesolucionesapi.onrender.com/api/carrito/detalle", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log("DETALLES CARRITO: ", res.data.Carrito);
        setDataCarrito(res.data.Carrito);
      })
      .catch((err) => {
        if (err.response) {
          console.log(
            "Error al obtener detalle del carrito 1: ",
            err.response.data.mensaje
          );
          //setisLoading(false);
        } else if (err.request) {
          console.log(
            "Error al obtener detalle del carrito: No se recibió respuesta"
          );
        } else {
          console.log("Error al obtener detalle del carrito 2:  ", err.mensaje);
        }
      });
  };

  //obtener pedidos
  const obtenerPedidos = (token) => {
    setisLoading(true);
    axios
      .get("https://mbytesolucionesapi.onrender.com/api/historial-pedidos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("DETALLES PEDIDO: ", res.data.pedidosBD.length);
        setDataPedido(res.data.pedidosBD);
        setisLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          console.log(
            "Error al obtener pedidos 1: ",
            err.response.data.mensaje
          );
          setisLoading(false);
        } else if (err.request) {
          console.log("Error al obtener pedidos : No se recibió respuesta");
        } else {
          console.log("Error al obtener pedidos  2:  ", err.mensaje);
        }
      });
  };

  //crear pedido
  const crearPedido = (domicilio, observaciones, forma_pago) => {
    setisLoading(true);
    axios
      .post(
        "https://mbytesolucionesapi.onrender.com/api/crear-pedido",
        {
          domicilio,
          observaciones,
          forma_pago,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log("Se creo el pedido correctamente: ", res.data.mensaje);
        obtenerPedidos(userToken);

        setDataCarrito({ items: [] });

        setisLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          Toast.show(<CustomToast message={err.response.data.mensaje} />, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: "#e8a100",
          });

          setisLoading(false);
        } else if (err.request) {
          console.log("Error al crear pedido : No se recibió respuesta");
        } else {
          console.log("Error al eliminar carrito:  ", err.msg);
        }
      });
  };

  //eliminar carrito
  const eliminarCarrito = (token) => {
    setisLoading(true);

    axios
      .delete("https://mbytesolucionesapi.onrender.com/api/carrito/eliminar", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataCarrito({ items: [] });
        console.log("Se vacio el carrito: ", res.data.mensaje);

        setisLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error al eliminar carrito: ", err.response.data.mensaje);
          Toast.show(<CustomToast message={err.response.data.mensaje} />, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: "red",
          });

          setisLoading(false);
        } else if (err.request) {
          console.log("Error al eliminar carrito : No se recibió respuesta");
        } else {
          console.log("Error al eliminar carrito  2:  ", err.msg);
        }
      });
  };

  const logout = () => {
    setisLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userInfo");
    setisLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setisLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
        perfil(userToken);
        obtenerItemsCarrito(userToken);
        obtenerPedidos(userToken);
      }

      setisLoading(false);
    } catch (error) {
      console.log("isLogged error: ", error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        actualizarDatos,
        recuperarContraseña,
        actualizarContrasenia,
        anadirProducto,
        crearPedido,
        logout,
        isLoading,
        userToken,
        userInfo,
        dataUser,
        dataCarrito,
        setDataCarrito,
        dataPedido,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
