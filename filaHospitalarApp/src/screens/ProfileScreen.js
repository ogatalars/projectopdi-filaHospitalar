import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import api from "../services/api";

export default function ProfileScreen({ navigation, route }) {
  const { token } = route.params;
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          "http://SEU_IP_LOCAL:3000/auth/login",
          {
            email,
            senha,
          }
        );
        setNome(response.data.nome);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil");
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(
        "http://SEU_IP_LOCAL:3000/user/profile",
        { nome, senha },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Sucesso", "Perfil atualizado com sucesso");
      setSenha("");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("http://SEU_IP_LOCAL:3000/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert("Sucesso", "Conta deletada com sucesso");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar a conta");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome:</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      <Text>Nova Senha:</Text>
      <TextInput
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Atualizar Perfil" onPress={handleUpdate} />
      <Button title="Deletar Conta" onPress={handleDeleteAccount} color="red" />
      <Button
        title="Hospitais"
        onPress={() => navigation.navigate("Hospitals", { token })}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
