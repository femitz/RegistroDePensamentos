import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';


const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TouchableOpacity style={styles.button}
      //@ts-ignore
        onPress={() => navigation.navigate('PensamentosAnteriores')}
      >
        <Text style={styles.buttonText}>Pensamentos anteriores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        //@ts-ignore
        onPress={() => navigation.navigate("Registrar")}
      >
        <Text style={styles.buttonText}>Registrar pensamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C197D4",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    borderRadius: 20,
    width: "60%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#B859C0",
    borderBlockColor: "#913BAF",
    borderWidth: 0.1,
    elevation: 2,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
