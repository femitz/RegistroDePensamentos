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
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

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

  const renderPensamentos = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `/users/${userId}/pensamentos/${item.id}`);

    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.pensamentosContainer}>
        <Text style={styles.pensamentosTitle}>Data:</Text>
        <Text style={styles.pensamentosText}>{item.date}</Text>

        <Text style={styles.pensamentosTitle}>Situação do humor:</Text>
        <Text style={styles.pensamentosText}>{item.situacaoHumor}</Text>

        <Text style={styles.pensamentosTitle}>Estado do humor:</Text>
        <Text style={styles.pensamentosText}>{item.estadoHumor}</Text>

        <Text style={styles.pensamentosTitle}>Pensamento automatico:</Text>
        <Text style={styles.pensamentosText}>{item.pensamentoAutomatico}</Text>

        <Text style={styles.pensamentosTitle}>Evidencias que apoiam: </Text>
        <Text style={styles.pensamentosText}>{item.evidenciasApoiam}</Text>

        <Text style={styles.pensamentosTitle}>Evidencias que não apoiam: </Text>
        <Text style={styles.pensamentosText}>{item.evidenciasNaoApoiam}</Text>

        <Text style={styles.pensamentosTitle}>Pensamento alternativo: </Text>
        <Text style={styles.pensamentosText}>{item.pensamentoAlternativo}</Text>

        <Text style={styles.pensamentosTitle}>
          Avaliação pensamento alternativo:{" "}
        </Text>
        <Text style={styles.pensamentosText}>
          {item.avaliacaoPensamentoAlternativo}
        </Text>

        <Text style={styles.pensamentosTitle}>Avaliação estado de humor: </Text>
        <Text style={styles.pensamentosText}>{item.avaliacaoEstadoHumor}</Text>

        <TouchableOpacity
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
          onPress={() => deleteItem()}
        >
          <EvilIcons name="trash" size={36} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <TouchableOpacity
        style={{
          width: "100%",
          borderRadius: 30,
          backgroundColor: "#B859C0",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          marginTop: 30,
          marginBottom: 10,
          elevation: 1,
        }}
        //@ts-ignore
        onPress={() => navigation.navigate("Registrar", {userId})}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Adicionar novos pensamentos
        </Text>
      </TouchableOpacity>

      {pensamentos.length > 0 ? (
        <View>
          <FlatList
            data={pensamentos}
            renderItem={renderPensamentos}
            keyExtractor={(pensamentos: Pensamentos) => pensamentos.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 90 }}
          />
        </View>
      ) : (
        <Text>Adicione novos pensamentos para aparecer por aqui...</Text>
      )}
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
});
