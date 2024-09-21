import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import CourseDetail from "./CourseDetail";
import Search from "./Search";

const Stack = createStackNavigator();

const StackIndex = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        options={{ headerShown: false }}
        component={Search}
      />
      <Stack.Screen
        name="course"
        component={CourseDetail}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default StackIndex;
