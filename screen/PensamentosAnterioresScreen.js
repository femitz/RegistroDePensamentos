import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../firebase/Firebase";
import { useNavigation } from "@react-navigation/native";

const PensamentosAnterioresScreen = () => {
  const navigation = useNavigation();

  const [pensamentos, setPensamentos] = useState([]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        //botão de voltar...
        onPress={() => navigation.replace("Home")}
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

      <FlatList
        data={pensamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Data: </Text>
            <Text>Situação de humor: {item.situacaoHumor}</Text>
            <Text>Estado de humor: {item.estadoHumor}</Text>
            <Text>Pensamento automatico: {item.pensamentoAutomatico}</Text>
            <Text>
              Evidencias que APOIAM o pensamento automatico:{" "}
              {item.evidenciasApoiam}
            </Text>
            <Text>
              Evidencias que NAO APOIAM o pensamento automatico:{" "}
              {item.evidenciasNaoApoiam}
            </Text>
            <Text>Pensamentos alternativos: {item.pensamentoAlternativo}</Text>
            <Text>
              Avaliação do pensamento alternativo:{" "}
              {item.avaliacaoPensamentoAlternativo}
            </Text>
            <Text>
              Avaliação do estado de humor: {item.avaliacaoEstadoHumor}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default PensamentosAnterioresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C197D4",
    justifyContent: "center",
    alignItems: "center",
  },
});
