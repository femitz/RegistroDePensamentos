import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { auth } from '../firebase/Firebase'
import { useNavigation } from '@react-navigation/native'


const HomeScreen = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace('Login')
        })
        .catch(error => alert(error.message))
    }

    return(
        <View style={styles.container}>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Pensamentos anteriores</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.replace('Registrar')}
            >
                <Text style={styles.buttonText}>Registrar pensamentos</Text>
            </TouchableOpacity>


            <Text style={{marginTop:100,}}> Email: { auth.currentUser?.email }</Text>
            <TouchableOpacity 
            style={styles.button}
            onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sair da conta</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#C197D4',
        justifyContent:'center',
        alignItems:'center',
    },

    button:{
        borderRadius: 20,
        width: '60%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
        marginBottom: 20,
        backgroundColor: '#B859C0',
        borderBlockColor: '#913BAF',
        borderWidth: 0.1,
        elevation: 2,
    },

    buttonText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})