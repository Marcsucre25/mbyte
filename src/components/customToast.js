import * as Animatable from "react-native-animatable";
import { FlatList, Text } from "react-native";
export const CustomToast = (props) => (
  <Animatable.View
    animation="slideInDown" // Puedes utilizar cualquier animación de react-native-animatable
    duration={500} // Duración de la animación en milisegundos
    style={{ padding: 10, borderRadius: 5, width: 200 }}
  >
    <Text
      style={{
        color: "#000",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
      }}
    >
      {props.message}
    </Text>
  </Animatable.View>
);
