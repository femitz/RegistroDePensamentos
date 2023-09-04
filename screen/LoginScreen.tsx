import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/Firebase";
import { StatusBar } from "expo-status-bar";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    checkPreviousLogin();
  }, []);

  async function handleLogin(email: string, senha: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(FIRESTORE_DB, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        await AsyncStorage.setItem("dataUser", JSON.stringify(userData));
        await AsyncStorage.setItem("userLoggedIn", "true"); // Armazenar status de login
        await AsyncStorage.setItem("userUID", user.uid); // Armazenar o user UID

        //@ts-ignore
        navigation.navigate("PensamentosAnteriores", { userId: user.uid });
      } else {
        console.log("Usuário não encontrado no banco de dados");
      }
    } catch (e) {
      console.log("Erro handleLogin:", e);
    }
  }

  async function checkPreviousLogin() {
    try {
      const userLoggedIn = await AsyncStorage.getItem("userLoggedIn");
      if (userLoggedIn === "true") {
        const dataUser = await AsyncStorage.getItem("dataUser");
        if (dataUser) {
          const userData = JSON.parse(dataUser);
          console.log("Usuário já logado:", userData);
          //@ts-ignore
          navigation.navigate("PensamentosAnteriores", { userId: userData.id });
        }
      } else {
        console.log("Nenhum usuário logado anteriormente.");
      }
    } catch (e) {
      console.log("Erro ao verificar login anterior:", e);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={{ color: "#fff", fontSize: 26 }}>Bem-vindo!</Text>
      <View style={styles.containerInputs}>
        <Text style={{ color: "#fff" }}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="JoseSilva@gmail.com"
          inputMode="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={{ color: "#fff", marginTop: 5 }}>Senha</Text>
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

        <Text style={{ color: "#fff", marginTop: 5 }}>
          Não tem conta? Registre-se!
        </Text>
        <TouchableOpacity
          // style={[styles.buttons, styles.buttonOutline]}
          style={{ marginTop: 15 }}
          // onPress={() => handleReg(email, senha) }
          //@ts-ignore
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            // style={[styles.buttonText, styles.buttonOutlineText]}
            style={{ color: "#B859C0", fontSize: 20, fontWeight: "700" }}
          >
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
