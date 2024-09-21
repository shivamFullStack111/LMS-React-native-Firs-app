import { View, Text } from "react-native";
import React from "react";
import Slider from "./Slider";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Register from "./Register";
import OtpVerify from "./OtpVerify";

const Stack = createStackNavigator();

const ForLogin = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="/slider" component={Slider} />
        <Stack.Screen name="/login" component={Login} />
        <Stack.Screen name="/register" component={Register} />
        <Stack.Screen name="/otp" component={OtpVerify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ForLogin;
