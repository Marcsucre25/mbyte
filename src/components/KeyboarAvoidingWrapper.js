import React from "react";

// keyboard avoiding view
import {
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <View style={styles.principal}>
      <LinearGradient
        colors={["#15161D", "#1F4172"]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 0.8 }}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>{children}</View>
      </LinearGradient>
    </View>
    // <KeyboardAvoidingView style={styles.principal}>
    //   <ScrollView>
    //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //       {children}
    //     </TouchableWithoutFeedback>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    //backgroundColor: "blue",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1
  }
});
