import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
} from "react-native";

import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    /* Ouvinte de evento para as notificações recebidas */
    Notifications.addNotificationReceivedListener();

    /* Ouvinte de evento para as respostas dadas às notificações */
    Notifications.addNotificationResponseReceivedListener();
  }, []);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={estilos.container}>
        <Text>Exemplo de sistema de notificação local</Text>
        <Button title="Disparar notificação" />
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
  conteudo: {
    marginVertical: 8,
    backgroundColor: "yellow",
    padding: 8,
  },
});
