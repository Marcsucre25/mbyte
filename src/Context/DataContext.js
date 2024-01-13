import React, { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  //funcion para comprar productos
  const comprarProducto = (product) => {
    const productRepetido = carrito.find((item) => item._id === product._id);
    if (productRepetido) {
      setCarrito(
        carrito.map((item) =>
          item._id === product._id
            ? { ...product, cantidad: productRepetido.cantidad + 1 }
            : item
        )
      );
    } else {
      //setCarrito([...carrito, product]);
      setCarrito([...carrito, { ...product, cantidad: 1 }]);
    }
  };

  return (
    //valores que quiero usar en mis demas componentes
    <DataContext.Provider value={{ carrito, setCarrito, comprarProducto }}>
      {children}
    </DataContext.Provider>
  );
};
export { DataContext, DataProvider };
