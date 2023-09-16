import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { FIRESTORE_DB } from "../firebase/Firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { EvilIcons } from "@expo/vector-icons";

export function Cards({ item, userId }: any) {
  const ref = doc(FIRESTORE_DB, `/users/${userId}/pensamentos/${item.id}`);
  console.log(item);
  

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
}

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
    borderRadius:50,
    backgroundColor:"#fff",
    padding:10,
    width:45,
    justifyContent: "center",
    alignItems: "center",
  }
});
