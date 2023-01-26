import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Platform,
} from "react-native";

import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

// Manipulador de eventos de notificação
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  const [dados, setDados] = useState(null);
  useEffect(() => {
    // Em caso de IOS
    async function permissoesIos() {
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
          allowAnnouncements: true,
        },
      });
    }
    permissoesIos();

    /* Ouvinte de evento para as notificações recebidas, ou seja,
    quando a notificação aparece no topo da tela do dispositivo. */
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });

    /* Ouvinte de evento para as respostas dadas às notificações, ou seja,
    quando o usuário interage (toca) na notificação. */
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      console.log(resposta.notification.request.content.data);
      setDados(resposta.notification.request.content.data);
    });
  }, []);

  const enviarMensagem = async () => {
    const mensagem = {
      title: "Lembrete!",
      body: "Não se esqueça de tomar água",
      data: { usuario: "Gabriel 😀", cidade: "São Paulo 🤖" },
      sound: Platform.OS === "ios" ? "default" : "", //Para IOS
    };
    Notifications.scheduleNotificationAsync({
      content: mensagem,
      trigger: { seconds: 1 },
    });
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={estilos.container}>
        <Text>Exemplo de sistema de notificação local</Text>
        <Button title="Disparar notificação" onPress={enviarMensagem} />
        {dados && (
          <View style={estilos.conteudo}>
            <Text>{dados.usuario}</Text>
            <Text>{dados.cidade}</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  conteudo: {
    marginVertical: 8,
    backgroundColor: "yellow",
  },
});
