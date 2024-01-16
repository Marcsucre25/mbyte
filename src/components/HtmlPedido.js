export const generateHTMLPedido = (tableData, formattedDate, total) => {
  const tableRows = tableData.map((item) => {
    return `
        <tr>
          <td>${item.id_producto.nombre}</td>
          <td>${item.cantidad.toString()}</td>
          <td>${`$ ${item.precio}`}</td>
          <td>${`$ ${(item.cantidad * item.precio).toFixed(2)}`}</td>
        </tr>
      `;
  });

  return `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          </head>
          <body style="text-align: center; margin: 20px; background-color: #f4f4f4;">
            <h1 style="font-size: 40px; font-family: Helvetica Neue; font-weight: normal;">
              MBYTE SOLUCIONES TECNOLÓGICAS
            </h1>
            <p style="font-size: 20px; margin-top: 10px;"><strong>Teléfono:</strong> +593 97 894 8486 </p>
            <p style="font-size: 20px; margin-top: 10px;"><strong>Dirección:</strong> Quito, Rosa Campuzano y Camilo Guachamín (Norte de Quito)</p>
            <img src="https://www.mbytesoluciones.com/img/logo_mbyte.png" alt="Your Image" style="width: 150px; margin-top: 10px;" />
            <p style="font-size: 18px; margin-top: 10px;"><strong>DETALLE DE COMPRA</strong>  </p>
            <div style="display: flex; justify-content: center;">
              <table border="1" style="width: 90%; border-collapse: collapse; margin-top: 20px; background-color: #ffffff;">
                <tr style="background-color: #f0f8fe;">
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
                ${tableRows.join("")}
              </table>
            </div>
            <p style="font-size: 20px; margin-top: 10px;"><strong>Total a pagar: </strong>${`$ ${total}`}</p>
        
            <p style="font-size: 20px; margin-top: 10px;"><strong>Fecha de pedido: </strong>${formattedDate} </p>
            
          </body>
        </html>
      `;
};
