import { StyleSheet, Text, TextInput, View , TouchableOpacity, Keyboard} from 'react-native';
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Firebase } from "./Firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,} from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const navigation = useNavigation()

  useEffect(()=>{
    async function StorageUser() {
      const storageUser = await AsyncStorage.getItem("dataUser")
      storageUser ? setUser(JSON.parse(storageUser)) : null
    }
    StorageUser()
  },[])


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Home')
      }
 
      return unsubscribe
    }, [])	
      
    
    useEffect(()=>{
      async function StorageUser() {
        const storageUser = await AsyncStorage.getItem("dataUser")
        storageUser ? setUser(JSON.parse(storageUser)) : null
      }
      StorageUser()
    },[])


    function handleSingUp(nome, email, senha) {
      createUserWithEmailAndPassword(auth, email, senha)
      .then(async (userCredentials) => {
        const user = userCredentials.user
        console.log('Registered with:', user.email)
        try{
          const userRef = doc(collection(db, "users"), data.uid)
          await setDoc(userRef, 
            {
            id: user.uid,
            nome: nome,
            email: email,
            senha: senha,
            }
          ).then(() => handleSingIn(email, senha))
        } catch (error) {
          console.log(error)
        }
      })
      .catch(error => alert(error.message))
    }


    function handleSingIn(email, senha) {
      signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredentials) => {
        const data = userCredentials.user
        try{
          const userDoc = await getDoc(db, "users", userCredentials.user.uid)
          if (userDoc.exists()) {
            const userData = userDoc.data()
            await AsyncStorage.setItem("dataUser", JSON.stringify(userData))
            setUser(userData)
          } else{
            console.log("Usuario não encontrado")
          }
        } catch( error ) {
          console.log(error)
        }
        console.log('Logged in with:', user.email)
      })
      .catch(error => alert(error.message))
    }
  }, [])

      
  return (
        <View style={styles.container} onPress={Keyboard.dismiss}>

          <View style={styles.containerInputs}>
          <Text style={{fontSize:12, color:'#696969', marginBottom: 10,}}>
            Não é necessario o preenchimento do nome para o login...
          </Text>

            <TextInput 
            style={styles.input}
            placeholder='José Silva'
            value={nome}
            onChangeText={text => setNome(text)}
            />

            <TextInput 
            style={styles.input}
            placeholder='JoseSilva@gmail.com'
            value={email}
            onChangeText={text => setEmail(text)}
            />

            <TextInput 
            style={styles.input}
            placeholder='Senha'
            value={senha}
            onChangeText={text => setSenha(text)}
            secureTextEntry
            />

          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
            onPress={ handleSingIn(email, senha) }
            style={styles.buttons}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={ handleSingUp(nome, email, senha) }
            style={[styles.buttons, styles.buttonOutline]}>
              <Text style={[styles.buttonText, styles.buttonOutlineText]}>Registrar-se</Text>
            </TouchableOpacity>
          </View>

        </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({

  container:{
    backgroundColor: '#C197D4',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },


  containerInputs: {
    width: '80%'
  },

  input:{
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttons:{
    backgroundColor: '#B859C0',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems:'center',
    elevation: 3,
  },

  buttonContainer:{
    width: '60%',
    justifyContent:'center',
    alignItems:'center',
    marginTop: 40,
  },

  buttonOutline:{
    backgroundColor: '#fff',
    marginTop: 5,
    borderColor: '#B859C0',
    borderWidth: 2,
  },

  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutlineText:{
    color: '#B859C0',
    fontWeight: '700',
    fontSize: 16,
  },

})


