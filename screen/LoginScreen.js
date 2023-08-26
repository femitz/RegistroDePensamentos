import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();

  

  return (
    <View style={styles.container} onPress={Keyboard.dismiss}>
      <View style={styles.containerInputs}>
        <TextInput
          style={styles.input}
          placeholder="JoseSilva@gmail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={navigation.navigate("Home")}
          style={styles.buttons}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, styles.buttonOutline]}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Registrar-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C197D4",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  containerInputs: {
    width: "80%",
  },

  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttons: {
    backgroundColor: "#B859C0",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  buttonOutline: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderColor: "#B859C0",
    borderWidth: 2,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutlineText: {
    color: "#B859C0",
    fontWeight: "700",
    fontSize: 16,
  },
});
