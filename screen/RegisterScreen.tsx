import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, collection, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/Firebase";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [emailNovamente, setEmailNovamente] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaNovamente, setSenhaNovamente] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState('')
  const [senhaError, setSenhaError] = useState('')
  const navigation = useNavigation();
  const auth = getAuth();

  async function handleReg(
    email: string,
    senha: string,
    nome: string,
    sobrenome: string
  ) {
    const errors = getErrors(email, emailNovamente, senha, senhaNovamente);
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      setErrors(showErrors && errors);
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          senha
        );
        const user = userCredential.user;

        console.log("Usuário logado");
        const userRef = doc(collection(FIRESTORE_DB, "users"), user.uid);
        await setDoc(userRef, {
          id: user.uid,
          nome: nome,
          sobrenome: sobrenome,
          email: email,
        });
        //@ts-ignore
        navigation.navigate("Login");
      } catch (e) {
        console.log("Erro handleReg:", e);
      }
    }
  }

  
  const getErrors = (email, emailNovamente, senha, senhaNovamente) => {
    const errors = [];
    //erros do email
    if (!email) {
      setEmailError("Digite seu email.")
      errors.push("email: digite um email")
    } else if (!email.includes("@") || !email.includes(".com")) {
      setEmailError("Digite um email valido")
      errors.push("email: digite um email valido")
    } else if(email !== emailNovamente){
        setEmailError("Os emails não estão iguais, confira e tente novamente")
        errors.push("email: os emails não estão iguais, confira e tente novamente")
    }

    //erros da senha
    if(!senha){
        setSenhaError("Digite uma senha.")
        errors.push("senha: digite uma senha")
    }else if(senha.length < 8 ){
        setSenhaError("Digite uma senha com pelo menos 8 caracteres.")
        errors.push("senha: digite uma senha com pelo menos 8 caracteres")
    }else if(senha !== senhaNovamente){
        setSenhaError("As senhas não são iguais, digite as senhas novamente.")
        errors.push("senha: as senhas não batem, digite as senhas novamente.")
    }
    return errors;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TouchableOpacity
        //botão de voltar...
        onPress={() => navigation.goBack()}
        style={{
          width: 24,
          height: 24,
          position: "relative",
          top: -40,
          left: -130,
        }}
      >
        <AntDesign
          name="left"
          size={24}
          color={"black"}
          style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
      <View style={styles.containerInputs}>
        <Text style={styles.textsInputs}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <Text style={styles.textsInputs}>Sobrenome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Sobrenomes"
          value={sobrenome}
          onChangeText={(text) => setSobrenome(text)}
        />

        <Text style={styles.textsInputs}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="seuemail@email.com"
          inputMode="email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.textsInputs}>Email novamente:</Text>
        <TextInput
          style={styles.input}
          placeholder="seuemail@email.com"
          inputMode="email"
          keyboardType="email-address"
          value={emailNovamente}
          onChangeText={(text) => setEmailNovamente(text)}
        />

        <Text style={styles.textsInputs}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="***********"
          secureTextEntry
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />

        <Text style={styles.textsInputs}>Senha novamente:</Text>
        <TextInput
          style={styles.input}
          placeholder="***********"
          secureTextEntry
          value={senhaNovamente}
          onChangeText={(text) => setSenhaNovamente(text)}
        />

        <TouchableOpacity
          style={styles.buttons}
          onPress={() => handleReg(email, senha, nome, sobrenome)}
        >
          <Text style={{ color: "#fff" }}>Registrar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
  textsInputs: {
    color: "#fff",
    marginTop: 5,
  },
  buttons: {
    backgroundColor: "#B859C0",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    marginTop: 10,
  },
});
