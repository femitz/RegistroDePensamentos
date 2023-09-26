import React from "react";
import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ backgroundColor: "#C197D4" }}>
      <TouchableOpacity
        //botão de voltar...
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 40,
          marginLeft: 16,
          borderRadius: 30,
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
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24 }}>Política de Privacidade</Text>

        <Text style={{ fontSize: 20 }}>
          Aplicativo: Registro de pensamentos
        </Text>
        <Text>Data de vigência: 2023</Text>

        <Text>
          Esta política de privacidade descreve como o aplicativo Registro de
          pensamentos coleta, usa e compartilha dados pessoais dos usuários.
        </Text>

        <Text style={{ fontSize: 18 }}>1. Coleta de dados</Text>
        <Text>
          O aplicativo Registro de pensamentos coleta dados pessoais dos
          usuários apenas quando necessário para fornecer o serviço. Esses dados
          podem incluir:
        </Text>
        <Text>- Nome e endereço de e-mail</Text>
        <Text>
          - Informações sobre o dispositivo do usuário, como o número de série,
          o modelo e o sistema operacional
        </Text>
        <Text>
          - Informações sobre o uso do aplicativo, como as páginas visitadas e
          os recursos usados
        </Text>

        <Text style={{ fontSize: 18 }}>2. Uso de dados</Text>
        <Text>
          O aplicativo Registro de pensamentos usa dados pessoais dos usuários
          para:
        </Text>
        <Text>- Fornecer o serviço</Text>
        <Text>- Melhorar o serviço</Text>
        <Text>- Enviar notificações aos usuários</Text>

        <Text style={{ fontSize: 18 }}>3. Compartilhamento de dados</Text>
        <Text>
          O aplicativo Registro de pensamentos não compartilha dados pessoais
          dos usuários com terceiros, exceto nas seguintes situações:
        </Text>
        <Text>- Quando necessário para fornecer o serviço</Text>
        <Text>- Quando exigido por lei</Text>
        <Text>- Com o consentimento do usuário</Text>

        <Text style={{ fontSize: 18 }}>4. Seus direitos</Text>
        <Text>
          Você tem o direito de acessar, corrigir ou excluir seus dados
          pessoais. Você também pode optar por não receber notificações do
          aplicativo Registro de pensamentos.
        </Text>

        <Text style={{ fontSize: 18 }}>5. Segurança</Text>
        <Text>
          O aplicativo Registro de pensamentos toma medidas de segurança para
          proteger seus dados pessoais. Essas medidas incluem:
        </Text>
        <Text>- Criptografia de dados</Text>
        <Text>- Acesso restrito aos dados</Text>

        <Text style={{ fontSize: 18 }}>6. Alterações a esta política</Text>
        <Text>
          O aplicativo Registro de pensamentos pode alterar esta política a
          qualquer momento. As alterações entrarão em vigor a partir da data de
          publicação.
        </Text>

        <Text style={{ fontSize: 18 }}>7. Contato</Text>
        <Text>
          Se você tiver alguma dúvida sobre esta política, entre em contato
          conosco pelo e-mail
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("mailto:contato.felipeschmitz@gmail.com")
            }
          >
            {" contato.felipeschmitz@gmail.com"}
          </Text>
          .
        </Text>

        <Text style={{ fontSize: 18 }}>8. Informações armazenadas online</Text>
        <Text>
          As informações armazenadas online pelo aplicativo Registro de
          pensamentos são criptografadas e acessíveis apenas aos funcionários
          autorizados. Essas informações são usadas para melhorar o serviço e
          fornecer notificações aos usuários.
        </Text>
        <Text>
          Nenhuma informação pessoal dos usuários é compartilhada com terceiros,
          exceto nas seguintes situações:
        </Text>
        <Text>- Quando necessário para fornecer o serviço</Text>
        <Text>- Quando exigido por lei</Text>
        <Text>- Com o consentimento do usuário</Text>
        <Text>
          Você pode optar por não receber notificações do aplicativo Registro de
          pensamentos a qualquer momento. Para fazer isso, siga as instruções
          nas configurações do aplicativo.
        </Text>
        <Text>
          Acreditamos que a privacidade é importante e estamos comprometidos em
          proteger seus dados.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
