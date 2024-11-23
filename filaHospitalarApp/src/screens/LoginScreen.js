// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import api from "../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        senha,
      });
      const token = response.data.token;

      navigation.replace("Profile", { token });
    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Erro ao fazer login"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <View style={styles.foto} />
        <Text style={styles.texto}>Fila Hospitalar</Text>
      </View>

      <Text style={styles.title}>Seja bem-vindo</Text>
      <Text style={styles.paragraph}>Efetue o seu login</Text>

      <View style={styles.containerInput}>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.redefinir}>
        <Text style={styles.paragraph}>Esqueceu sua senha?</Text>
        <TouchableOpacity
          onPress={() => Alert.alert("Funcionalidade não implementada")}
        >
          <Text style={styles.linkText}>Clique aqui</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerCadastro}>
        <Text style={styles.paragraph}>
          Não tem uma conta?{" "}
          <Text
            style={styles.spanText}
            onPress={() => navigation.navigate("Register")}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const inputWidth = windowWidth >= 768 ? "30%" : "80%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  containerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  foto: {
    width: 40,
    height: 40,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  texto: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
  },
  containerInput: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: inputWidth,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    width: inputWidth,
    padding: 12,
    backgroundColor: "#007aff",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  redefinir: {
    width: inputWidth,
    alignItems: "center",
    paddingTop: 12,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0, 0, 0, 0.158)",
    paddingBottom: 20,
  },
  linkText: {
    color: "#007aff",
    fontSize: 14,
    fontWeight: "bold",
  },
  containerCadastro: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  spanText: {
    color: "#007aff",
    fontWeight: "bold",
  },
});
