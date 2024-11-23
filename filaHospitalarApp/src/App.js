import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HospitalsScreen from "./src/screens/HospitalsScreen";
import QueueScreen from "./src/screens/QueueScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Cadastro" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Perfil" }}
        />
        <Stack.Screen
          name="Hospitals"
          component={HospitalsScreen}
          options={{ title: "Hospitais" }}
        />
        <Stack.Screen
          name="Queue"
          component={QueueScreen}
          options={{ title: "Fila" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
