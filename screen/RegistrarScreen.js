import { StyleSheet, Text, TextInput, View , ScrollView, SafeAreaView, TouchableOpacity, Keyboard} from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RegistrarScreen() {


  const [situacaoHumor, setSituacaoHumor] = useState('')
  const [estadoHumor, setEstadoHumor] = useState('')
  const [pensamentoAutomatico, setPensamentoAutomatico] = useState('')
  const [evidenciasApoiam, setEvidenciasApoiam] = useState('')
  const [evidenciasNaoApoiam, setEvidenciasNaoApoiam] = useState('')
  const [pensamentoAlternativo, setPensamentoAlternativo] = useState('')
  const [avaliacaoPensamentoAlternativo, setAvaliacaoPensamentoAlternativo] = useState('')
  const [avaliacaoEstadoHumor, setAvaliacaoEstadoHumor] = useState('')
  const date = new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'})

  const navigation = useNavigation()

  async function handleNewPensamentos(){

    const newData = {
      date,
      situacaoHumor,
      estadoHumor,
      pensamentoAutomatico,
      evidenciasApoiam,
      evidenciasNaoApoiam,
      pensamentoAlternativo,
      avaliacaoPensamentoAlternativo,
      avaliacaoEstadoHumor,

    }
    
    // await AsyncStorage.setItem('@savepensamentos:pensamentos', JSON.stringify(newData))

    console.log(newData)

  }

  return (
    <SafeAreaView style={{backgroundColor:'#C197D4', flex: 1, paddingHorizontal: 12,}}>

      <TouchableOpacity
      //botão de voltar...
        onPress={() => navigation.replace('Home')}
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
          color={'black'}
          style={{ marginRight: 5 }}
        />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.container} onPress={Keyboard.dismiss}>

          <View style={{width:'100%', justifyContent:'center', alignItems:'center', marginTop:10,}}>

            <Text style={{fontSize:12, color:'#696969', marginBottom: 10,}}>Tente completar todas as box se possivel...</Text>

            <Text style={{fontSize:12, color:'#696969', marginBottom: 10,}}> Data de registro: { date }</Text>

            <Text style={styles.texts}>Situação de humor:</Text>
            <TextInput 
            style={styles.inputs}
            placeholder='Com quem você estava? O que estava fazendo? Quando foi? Onde foi?'
            padding={10}
            onChangeText={(text) => setSituacaoHumor(text)}
            value={situacaoHumor}
            />

            <Text style={styles.texts}>Estado de humor:</Text>
            <TextInput 
            style={styles.inputs}
            placeholder='Ex: 0-100%'
            padding={10}
            onChangeText={(text) => setEstadoHumor(text)}
            value={estadoHumor}
            />

            <Text style={styles.texts}>Pensamento Automatico (P.A)</Text>
            <TextInput 
            style={styles.inputs}
            placeholder='O que estava passando pela minha cabeça antes de começar a me sentir desse modo?'
            editable
            multiline
            numberOfLines={4}
            padding={10}
            onChangeText={(text) => setPensamentoAutomatico(text)}
            value={pensamentoAutomatico}
            
            />

            <Text style={styles.texts}>Evidencias que apoiam o P.A:</Text>
            <TextInput 
            style={styles.inputs}
            placeholder='Escreva evidências factuais para apoiar seu pensamento (Evite leitura de pensamentos ou interpretações de fatos)'
            editable
            multiline
            numberOfLines={4}
            padding={10}
            onChangeText={(text) => setEvidenciasApoiam(text)}
            value={evidenciasApoiam}
            />
          
          
            <Text style={styles.texts}>Evidencias que NÃO apoiam o P.A:</Text>
            <TextInput 
            style={styles.inputs}
            placeholder='Escreva evidências factuais que não apoiam seu pensamento (Evite leitura de pensamentos ou interpretações de fatos)'
            editable
            multiline
            numberOfLines={4}
            padding={10}
            onChangeText={(text) => setEvidenciasNaoApoiam(text)}
            value={evidenciasNaoApoiam}
            />
          
            <Text style={styles.texts}>Pensamentos alternativo:</Text>
            <TextInput 
            style={styles.inputs}
            placeholder='Escreva um pensamento alternativo a partir da conclusão das evidências'
            editable
            multiline
            numberOfLines={4}
            padding={10}
            onChangeText={(text) => setPensamentoAlternativo(text)}
            value={pensamentoAlternativo}
            />

            <Text style={styles.texts}>Avalie o pensamento alternativo:</Text>
            <TextInput 
            style={styles.inputs}
            placeholder='Quanto você acredita no pensamento alternativo? 0-100%'
            padding={10}
            onChangeText={(text) => setAvaliacaoPensamentoAlternativo(text)}
            value={avaliacaoPensamentoAlternativo}
            />
          
            <Text style={styles.texts}>Avalie o estado de humor:</Text>
            <TextInput 
            style={styles.inputs}
            placeholder="Ex: 0-100%"
            padding={10}
            onChangeText={(text) => setAvaliacaoEstadoHumor(text)}
            value={avaliacaoEstadoHumor}
            />


          </View>
          
            <TouchableOpacity 
            onPress={handleNewPensamentos}
            style={{
              backgroundColor: '#fff',
              borderBlockColor: '#000',
              borderRadius: 30,
              width: '90%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop:20,
              marginBottom: 20,
              backgroundColor: '#B859C0',
              borderBlockColor: '#913BAF',
              borderWidth: 0.1,
              elevation: 2,
            }}>
              <Text style={{fontSize:16, color:'white',}}>Salvar novo pensamento</Text>
            </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({

  container:{
    backgroundColor: '#C197D4',
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
    height: '100%',
    padding: 5,
  },


  containerInputs: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },

  inputs:{
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 16,
    height: 100,
    textAlign:'center',
    elevation: 5,
  },

  texts:{
    marginBottom:10, 
    marginTop:15,
    fontSize: 19,
  },

})
