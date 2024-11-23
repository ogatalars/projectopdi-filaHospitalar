import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import api from "../services/api";

export default function HospitalsScreen({ navigation, route }) {
  const { token } = route.params;
  const [hospitais, setHospitais] = useState([]);

  useEffect(() => {
    const fetchHospitais = async () => {
      try {
        const response = await axios.post(
          "http://SEU_IP_LOCAL:3000/auth/login",
          {
            email,
            senha,
          }
        );

        setHospitais(response.data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar a lista de hospitais");
      }
    };
    fetchHospitais();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.hospitalCard}>
      <Text style={styles.hospitalName}>{item.nome}</Text>
      <Text>{item.endereco}</Text>
      <Button
        title="Ver Fila"
        onPress={() =>
          navigation.navigate("Queue", { hospitalId: item.id, token })
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hospitais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
