import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import axios from "axios";
import api from "../services/api";

export default function QueueScreen({ route }) {
  const { hospitalId, token } = route.params;
  const [fila, setFila] = useState(null);

  useEffect(() => {
    const fetchFila = async () => {
      try {
        const response = await axios.post("http://SEU_IP_LOCAL:3000/auth/login", {
            email,
            senha,
          });
        setFila(response.data[0]);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar as informações da fila");
      }s
    };
    fetchFila();
  }, []);

  if (!fila) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hospital {fila.hospital.nome}</Text>
      <Text>Tempo de Espera: {fila.tempoEspera} minutos</Text>
      <Text>Pacientes na Fila: {fila.pacientesNaFila}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
