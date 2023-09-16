import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native"
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../hook/useLogin";
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  // custon hook, serve para separar a parte logica do conteudo em si, bem simples
  const {
    email, setEmail,
    senha, setSenha,
    secureText, setSecureText,
    emailError,
    senhaError,
    sobreNos,
    handleLogin
  } = useLogin()

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={{ color: "#fff", fontSize: 26, marginBottom:16 }}>Bem-vindo!</Text>

      <View style={styles.containerInputs}>
        <Text style={{ color: "#fff" }}>Email:</Text>
        {emailError.length > 0 && (
          <Text style={styles.textError}>{emailError}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="JoseSilva@gmail.com"
          inputMode="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={{ color: "#fff", marginTop: 5 }}>Senha</Text>
        {senhaError.length > 0 && (
          <Text style={styles.textError}>{senhaError}</Text>
        )}
        <View style={{flexDirection:"row"}}>
          <TextInput
            style={[styles.input,{flex:1}]}
            placeholder="Senha"
            value={senha}
            onChangeText={(text) => setSenha(text)}
            secureTextEntry={secureText}
          />
          <TouchableOpacity
            style={styles.eye}
            onPress={()=>setSecureText(!secureText)}
          >
            <Ionicons name={secureText? "eye" : "eye-off"} size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleLogin(email, senha)}
          style={styles.buttons}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>Login</Text>
        </TouchableOpacity>

        <Text style={{ color: "#fff", marginTop: 50 }}>
          Não tem conta? Registre-se!
        </Text>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          //@ts-ignore
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ color: "#B859C0", fontSize: 20, fontWeight: "700" }}>
            Registrar-se
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{position:'relative', bottom: -140,}}
        onPress={() => Alert.alert("Sobre nós", sobreNos)}>
          <Text style={{color: '#fff',textDecorationLine:"underline"}}>Sobre nós</Text>
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
    height: 50,
  },

  buttons: {
    backgroundColor: "#B859C0",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
    elevation: 2,
    height: 55,
  },

  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonOutline: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderColor: "#B859C0",
    borderWidth: 2,
  },

  buttonOutlineText: {
    color: "#B859C0",
    fontWeight: "700",
    fontSize: 19,
  },
  textError: {
    color: "#db0f46",
    fontWeight: "600",
  },
  eye:{
    backgroundColor:"#B859C0",
    marginTop:5,
    marginLeft:-10,
    zIndex:-1,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft:20, // mais 10 para compensar a margem negativa
    paddingRight:10,
    borderRadius:10,
  }
});
