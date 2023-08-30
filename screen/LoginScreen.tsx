import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, collection, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/Firebase";

const auth = getAuth();

function handleLogin(email: string, senha: string) {
  signInWithEmailAndPassword(auth, email, senha)
    .then(async (user) => {
      const data = user.user;
      try {
        const userDoc = await getDoc(doc(FIRESTORE_DB, "users", data.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          await AsyncStorage.setItem("dataUser", JSON.stringify(userData));
        } else {
          console.log("Usuario não encontrado no banco de dados");
        }
      } catch (e) {
        console.log("Error handleLogin:", e);
      }
    })
    .catch((err) => {
      console.log(err.code);
      console.log(err.message);
      return;
    });
}

function handleReg(email: string, senha: string) {
  createUserWithEmailAndPassword(auth, email, senha)
    .then(async (user) => {
      const data = user.user;
      console.log("Usuario logado: ", data);
      console.log(data.uid);
      try {
        const userRef = doc(collection(FIRESTORE_DB, "users"), data.uid);
        await setDoc(userRef, {
          id: data.uid,
          email: email,
        }).then(() => handleLogin(email, senha));
      } catch (e) {
        console.log("Error handleReg 1:", e);
      }
    })
    .catch((e) => {
      console.log("Error handleReg 2:", e);
    });
}

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
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
          onPress={() => handleLogin(email, senha)}
          style={styles.buttons}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, styles.buttonOutline]}
          onPress={() => handleReg(email, senha) }
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
