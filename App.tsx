import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas
import LoginScreen from "./screen/LoginScreen"
import RegistrarScreen from "./screen/RegistrarScreen";
import PensamentosAnterioresScreen from "./screen/PensamentosAnterioresScreen";
import RegisterScreen from "./screen/RegisterScreen";
import Settings from "./screen/Settings";

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="PensamentosAnteriores" component={PensamentosAnterioresScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Registrar" component={RegistrarScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}