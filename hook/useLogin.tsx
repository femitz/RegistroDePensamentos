import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/Firebase";
import { Alert } from "react-native";

export function useLogin(){
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  const sobreNos = "Para saber mais como seus dados são guardados visite a nossa pagina: \n\ngithub.com/devmitz/RegistroDePensamentos\n\n"

  useEffect(() => {
    checkPreviousLogin();
  }, []);

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

          //@ts-ignore
          navigation.navigate("PensamentosAnteriores", { userId: user.uid });
        } else {
          console.log("Usuário não encontrado no banco de dados");
        }
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

  return {
    email, setEmail,
    senha, setSenha,
    secureText, setSecureText,
    emailError,
    senhaError,
    sobreNos,
    handleLogin,
    getErrors,
  }
}