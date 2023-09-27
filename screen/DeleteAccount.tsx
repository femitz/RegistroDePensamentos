import { useNavigation } from "@react-navigation/native";
import { deleteUser, getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/Firebase";

const DeleteAccount = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  const getErrors = (email: string , senha: string) => {
    const errors = [];

    //reset erros
    setEmailError("");
    setSenhaError("");

    //verifica se o camp do email já possui algum erro
    if (!email) {
      setEmailError("Digite um email.");
      errors.push("email: digite um email.");
    } else if (!email.includes("@") || !email.includes(".com")) {
      setEmailError("Digite um email valido");
      errors.push("email: digite um email valido");
    }

    //verifica se o campo da senha tem algum erro
    if (!senha) {
      setSenhaError("Digite uma senha.");
      errors.push("senha: digite uma senha.");
    }
    return errors;
  };

  async function handleLogin(email: string, senha: string) {
    const errors = getErrors(email, senha);

    if (Object.keys(errors).length > 0) {
      console.log("tem erros no form");
    } else {
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
        } else {
          console.log("Usuário não encontrado no banco de dados");
        }
        return user
      } catch (error) {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          console.log("Usuario não encontrado");
        } else if (errorCode === "auth/wrong-password") {
          Alert.alert(
            "Senha incorreta",
            "A senha está incorreta, verifique a senha e tente novamente."
          );
        } else if (errorCode === "auth/invalid-email") {
          Alert.alert(
            "Email invalido",
            "O email digitado é invalido, verifique novamente"
          );
        } else {
          console.log("Erro desconhecido.", errorCode);
        }
      }
    }
  }

  const deleteID = async (email: string, senha: string) => {
    const user = handleLogin(email, senha)
    deleteUser(await user)
      .then(async () => {
        await signOut(auth);
        await AsyncStorage.clear().then(() => {
          console.log("Conta deletada.");
        });
        Alert.alert("Conta deletada.", "Sua conta foi deletada com sucesso.")
        // @ts-ignore
        navigation.navigate("Login")
      })
      .catch((error) => {
        Alert.alert("Error", "Houve um erro: " + error);
      });
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
          style={[styles.input, { marginBottom: 5 }]}
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
          onPress={() => deleteID(email, senha)}
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
