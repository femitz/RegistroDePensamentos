import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/Firebase"
import Checkbox from "expo-checkbox";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Pensamentos {
  id: string,
  date: string,
  situacaoHumor: string,
  estadoHumor: string,
  pensamentoAutomatico: string,
  evidenciasApoiam: string,
  evidenciasNaoApoiam: string,
  pensamentoAlternativo: string,
  avaliacaoPensamentoAlternativo: string,
  avaliacaoEstadoHumor: string,
}

export default function RegistrarScreen() {
  const [situacaoHumor, setSituacaoHumor] = useState("")
  const [estadoHumor, setEstadoHumor] = useState("")
  const [pensamentoAutomatico, setPensamentoAutomatico] = useState("")
  const [evidenciasApoiam, setEvidenciasApoiam] = useState("")
  const [evidenciasNaoApoiam, setEvidenciasNaoApoiam] = useState("")
  const [pensamentoAlternativo, setPensamentoAlternativo] = useState("")
  const [avaliacaoPensamentoAlternativo, setAvaliacaoPensamentoAlternativo] = useState("")
  const [avaliacaoEstadoHumor, setAvaliacaoEstadoHumor] = useState("")
  const date = new Date().toLocaleDateString("pt-BR")
  const [pensamentos, setPensamentos] = useState<Pensamentos[]>([])
  const navigation = useNavigation()
  const [isChecked, setChecked] = useState(false);
  const [user,setUser]=useState<any>()

  useEffect(() =>{

    async function StorageUser() {
      const storageUser = await AsyncStorage.getItem("dataUser")
      storageUser ? setUser(JSON.parse(storageUser)) : null
    }
    StorageUser()

    const pensamentosRef = collection(FIRESTORE_DB, `pensamentos`)
    const subscriber = onSnapshot(pensamentosRef, {
      next: (snapshot) => {
        console.log('Updated')

        const pensamentos: Pensamentos[] = [] 
        snapshot.docs.forEach(doc =>{
          pensamentos.push({
            id: doc.id,
            ...doc.data(),
          } as Pensamentos)
        })
        setPensamentos(pensamentos)
      }
    })
    return () => subscriber()
  },[])

  const addNewPensamento = async () => {
    if(isChecked){
      const doc = await addDoc(collection(FIRESTORE_DB,  `pensamentos`), { 
        date: date, 
        situacaoHumor: situacaoHumor,
        estadoHumor: estadoHumor,
        pensamentoAutomatico: pensamentoAutomatico,
        evidenciasApoiam: evidenciasApoiam,
        evidenciasNaoApoiam: evidenciasNaoApoiam,
        pensamentoAlternativo: pensamentoAlternativo,
        avaliacaoPensamentoAlternativo: avaliacaoPensamentoAlternativo,
        avaliacaoEstadoHumor: avaliacaoEstadoHumor,
      })
      setSituacaoHumor('')
      setEstadoHumor('')
      setPensamentoAutomatico('')
      setEvidenciasApoiam('')
      setEvidenciasNaoApoiam('')
      setPensamentoAlternativo('')
      setAvaliacaoPensamentoAlternativo('')
      setAvaliacaoEstadoHumor('')
      Alert.alert('Pensamentos foram salvos com sucesso')
      setChecked(false)
      Keyboard.dismiss()
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView
    style={{ backgroundColor: "#C197D4", flex: 1, paddingHorizontal: 12 }}
    >
      <StatusBar style="dark" />
      <TouchableOpacity
        //botão de voltar...
        onPress={() => navigation.goBack()}
        style={{
          width: 24,
          height: 24,
          marginTop: 50,
          marginLeft: 15,
          borderRadius: 30,
          marginBottom: 10,
        }}
      >
        <AntDesign
          name="left"
          size={24}
          color={"black"}
          style={{ marginRight: 5 }}
        />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 12, color: "#696969", marginBottom: 10 }}>
              Tente completar todas as box se possivel...
            </Text>

            <Text style={{ fontSize: 12, color: "#696969", marginBottom: 10 }}>
              {" "}
              Data de registro: {date}
            </Text>

            <Text style={styles.texts}>Situação de humor:</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Com quem você estava? O que estava fazendo? Quando foi? Onde foi?"
              onChangeText={(text) => setSituacaoHumor(text)}
              value={situacaoHumor}
            />

            <Text style={styles.texts}>Estado de humor:</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Ex: 0-100%"
              onChangeText={(text) => setEstadoHumor(text)}
              value={estadoHumor}
            />

            <Text style={styles.texts}>Pensamento Automatico (P.A)</Text>
            <TextInput
              style={styles.inputs}
              placeholder="O que estava passando pela minha cabeça antes de começar a me sentir desse modo?"
              editable
              multiline
              numberOfLines={4}
              onChangeText={(text) => setPensamentoAutomatico(text)}
              value={pensamentoAutomatico}
            />

            <Text style={styles.texts}>Evidencias que apoiam o P.A:</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Escreva evidências factuais para apoiar seu pensamento (Evite leitura de pensamentos ou interpretações de fatos)"
              editable
              multiline
              numberOfLines={4}
              onChangeText={(text) => setEvidenciasApoiam(text)}
              value={evidenciasApoiam}
            />

            <Text style={styles.texts}>Evidencias que NÃO apoiam o P.A:</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Escreva evidências factuais que não apoiam seu pensamento (Evite leitura de pensamentos ou interpretações de fatos)"
              editable
              multiline
              numberOfLines={4}
              onChangeText={(text) => setEvidenciasNaoApoiam(text)}
              value={evidenciasNaoApoiam}
            />

            <Text style={styles.texts}>Pensamentos alternativo:</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Escreva um pensamento alternativo a partir da conclusão das evidências"
              editable
              multiline
              numberOfLines={4}
              onChangeText={(text) => setPensamentoAlternativo(text)}
              value={pensamentoAlternativo}
            />

            <Text style={styles.texts}>Avalie o pensamento alternativo:</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Quanto você acredita no pensamento alternativo? 0-100%"
              onChangeText={(text) => setAvaliacaoPensamentoAlternativo(text)}
              value={avaliacaoPensamentoAlternativo}
            />

            <Text style={styles.texts}>Avalie o estado de humor:</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Ex: 0-100%"
              onChangeText={(text) => setAvaliacaoEstadoHumor(text)}
              value={avaliacaoEstadoHumor}
            />

          </View>

          <TouchableOpacity style={{flexDirection: 'row', marginTop: 15}}
          onPress={() => setChecked(true)}>
            <Checkbox
            style={{marginRight: 5}}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#4630EB' : undefined}
            />
            <Text>Você deseja realmente salvar?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={addNewPensamento}
            style={styles.buttonEnviar}
          >
            <Text style={{ fontSize: 16, color: "white" }}>
              Salvar novo pensamento
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C197D4",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 5,
  },

  containerInputs: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },

  inputs: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 16,
    height: 100,
    textAlign: "center",
    elevation: 5,
  },

  texts: {
    marginBottom: 10,
    marginTop: 15,
    fontSize: 19,
  },
  buttonEnviar:{
    borderRadius: 30,
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#B859C0",
    borderBlockColor: "#913BAF",
    borderWidth: 0.1,
    elevation: 2,
  }
});
