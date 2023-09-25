import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FIRESTORE_DB } from "../firebase/Firebase";
import { Pensamentos } from "./RegistrarScreen";
import { collection, onSnapshot } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons'; 

import { Cards } from "../components/Cards";

const PensamentosAnterioresScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  //@ts-ignore
  const { userId } = route.params;

  useEffect(() => {
    const pensamentosRef = collection(
      FIRESTORE_DB,
      `/users/${userId}/pensamentos`
    );

    const subscriber = onSnapshot(pensamentosRef, {
      next: (snapshot) => {
        console.log("Updated");

        const pensamentos: Pensamentos[] = [];
        snapshot.docs.forEach((doc) => {
          pensamentos.push({
            id: doc.id,
            ...doc.data(),
          } as Pensamentos);
        });
        setPensamentos(pensamentos);
      },
    });
    return () => subscriber();
  },[]);

  const [pensamentos, setPensamentos] = useState<Pensamentos[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Botão sair. */}
      <TouchableOpacity
      style={styles.exit}
      //@ts-ignore
      onPress={() => navigation.navigate("Settings")}>
        <Ionicons name="settings-outline" size={24} color="#B859C0" />
        {/* <Ionicons name="exit-outline" size={24} color="#B859C0"  /> */}
      </TouchableOpacity>
       {/*Botão Adicionar novos pensamentos  */}
      

      {pensamentos.length > 0 ? (
          <FlatList
            data={pensamentos}
            renderItem={(item)=><Cards item={item.item} userId={userId}/>}
            keyExtractor={(pensamentos: Pensamentos) => pensamentos.id}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{ paddingBottom: 120 }}
            inverted={pensamentos.length === 1 ? false : true}
          />
      ) : (
        <View style={{flex:1,justifyContent:"center"}}>
          <Text>Adicione novos pensamentos para aparecer por aqui...</Text>
        </View>
      )}
      <TouchableOpacity
        style={{
          width: "100%",
          borderRadius: 30,
          backgroundColor: "#B859C0",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          marginVertical: 10,
          elevation: 1,
        }}
        //@ts-ignore
        onPress={() => navigation.navigate("Registrar", {userId})}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Adicionar novos pensamentos
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PensamentosAnterioresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C197D4",
    paddingHorizontal: 20,
  },
  pensamentosContainer: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    elevation: 2,
  },
  pensamentosTitle: {
    color: "#B859C0",
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 5,
  },
  pensamentosText: {
    flex: 1,
    paddingHorizontal: 4,
    fontSize: 16,
    fontStyle: "italic",
  },
  exit:{
    marginTop:20,
    marginBottom:10,
    borderRadius:50,
    backgroundColor:"#fff",
    padding:10,
    width:45,
    justifyContent: "center",
    alignItems: "center",
  }
});
