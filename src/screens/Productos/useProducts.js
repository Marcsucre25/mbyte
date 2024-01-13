import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const useProducts = () => {
  const { userToken } = useContext(AuthContext);
  const [products, setProducts] = useState(null);
  const [categorys, setCategorys] = useState(null);

  //categorias
  useEffect(() => {
    // Función asincrónica para realizar la solicitud
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get(
          "https://mbytesolucionesapi.onrender.com/api/categorias"
        );

        // Verifica si la respuesta es exitosa (código 200)
        if (response.status === 200) {
          //console.log("Respuesta categorias: ", response.data);
          setCategorys(response.data);
        } else {
          console.error("Error al obtener categorias:", response.status);
        }
      } catch (error) {
        console.error("Error de red de categoria:", error);
      }
    };

    // Llama a la función para realizar la solicitud cuando el componente se monta
    obtenerCategorias();
  }, []);

  //productos
  useEffect(() => {
    // Función asincrónica para realizar la solicitud
    const obtenerProductos = async () => {
      try {
        const response = await axios.get(
          "https://mbytesolucionesapi.onrender.com/api/productos"
        );

        // Verifica si la respuesta es exitosa (código 200)
        if (response.status === 200) {
          setProducts(response.data);
          //console.log("productos: ", products);
        } else {
          console.error("Error al obtener los datos:", response.status);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    obtenerProductos();
  }, []);

  //useEffect(() => {}, [categorys]);
  //useEffect(() => {}, [products]);

  return {
    categorys,
    products,
  };
};

export default useProducts;
