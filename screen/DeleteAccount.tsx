import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";

const DeleteAccount = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const deleteAccount = () => {
    console.log("delete account");
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 23,
          marginHorizontal: 3,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Você deseja deletar a sua conta?
      </Text>

      <View style={{ width: "95%", marginTop: 20 }}>
        <Text>Email:</Text>
        <TextInput
          style={[styles.input, {marginBottom: 5,}]}
          placeholder="seuemail@email.com"
          inputMode="email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="***********"
          secureTextEntry
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={[styles.buttons, styles.buttonCancel]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textButtons}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, styles.buttonDelete]}
          onPress={() => deleteAccount()}
        >
          <Text style={styles.textButtons}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#C197D4",
  },
  containerButtons: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  buttons: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "45%",
    elevation: 3,
  },
  textButtons: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  buttonDelete: {
    backgroundColor: "red",
  },
  buttonCancel: {
    backgroundColor: "grey",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});
