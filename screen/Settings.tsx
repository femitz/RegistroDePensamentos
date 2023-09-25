import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

// Components
import Buttons from "../components/ScreenSettings/Buttons";

const Settings = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const sobre =
    "Para saber mais como seus dados são guardados visite a nossa pagina: \n\ngithub.com/devmitz/RegistroDePensamentos\n\n";

  function loggout() {
    signOut(auth)
      .then(() => {
        AsyncStorage.clear();
        //@ts-ignore
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("Erro ao deslogar: ", error);
      });
  }
  return (
    <SafeAreaView
      style={{ backgroundColor: "#C197D4", flex: 1, paddingHorizontal: 10 }}
    >
      <StatusBar style="dark" />
      <TouchableOpacity
        //botão de voltar...
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 15,
          borderRadius: 30,
          marginBottom: 10,
          backgroundColor: "#fff",
          padding: 10,
          width: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign
          name="left"
          size={24}
          color={"#B859C0"}
          style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Buttons text="Sobre" onPress={() => Alert.alert("Sobre", sobre)} />
          <Buttons text="Help" onPress={() => null} />
          <Buttons text="Contate-nos" onPress={() => null} />
          <Buttons text ="Termos e politica de privacidade" onPress={() => null} />
          <Buttons text ="Deletar conta" onPress={() => null} />
          <Buttons text="Sair" onPress={() => loggout()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C197D4",
    alignItems: "center",
    justifyContent: "center",
  },
});
