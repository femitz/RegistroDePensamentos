import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc, collection, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "./Firebase";
import { useNavigation } from "@react-navigation/native";

const auth = getAuth();
const navigation = useNavigation();


async function isLoggedIn() {
  const user = await getUser();
  return user !== null;
}

async function getUser() {
  try{
    await AsyncStorage.getItem('userData')
  }
  catch (e) {
    console.log("Erro ao pegar o usuario: " + e)
  }
}

async function logout() {
  try {
    await auth.signOut();
    await AsyncStorage.removeItem("userData");
  } catch (error) {
    console.log(error);
  }
}
export function handleLogin(email: string, senha: string) {
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
        console.log("🚀 ~ file: User.tsx:61 ~ .then ~ e:", e);
      }
    })
    .catch((err) => {
      console.log(err.code);
      console.log(err.message);
      return;
    });
}

export function handleReg(email: string, senha: string) {
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
        console.log("🚀 ~ file: User.tsx:83 ~ .then ~ e:", e);
      }
    })
    .catch((e) => {
      console.log("🚀 ~ file: User.tsx:87 ~ handleReg ~ e:", e);
    });
}
