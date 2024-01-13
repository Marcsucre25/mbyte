import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ContainerPrinicipal = ({ children }) => {
  return (
    <View style={styles.principal}>
      <LinearGradient
        colors={['#f0f8fe', "#1F4172"]}
        start={{ x: 1.3, y: 0.3 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>{children}</View>
      </LinearGradient>
    </View>
  );
};

export default ContainerPrinicipal;

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    //backgroundColor: "green",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    
  },
  contentContainer: {
    flex: 1,
    
  },
});
