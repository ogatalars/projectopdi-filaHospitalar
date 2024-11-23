import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import api from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://SEU_IP_LOCAL:3000/auth/register", {
        nome,
        email,
        senha,
      });
      Alert.alert("Sucesso", "Usuário registrado com sucesso");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", error.response?.data?.message || "Erro ao registrar");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({});
