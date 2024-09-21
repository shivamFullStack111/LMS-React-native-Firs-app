import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import Profile from "./Profile";
import Login from "../forlogin/Login";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import Home from "./Home";
import Search from "./Search";
import StackIndex from "./Stack";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CourseDetail from "./CourseDetail";
import EnrolledCourses from "./EnrolledCourses";
import DashboardIndex from "./admin/DashboardIndex";
import CreateCourse from "./admin/CreateCourse";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const NotForLogin = ({ route }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="main"
          component={Main}
        />
        <Stack.Screen
          options={{ presentation: "modal" }}
          name="courseDetail"
          component={CourseDetail}
        />
        <Stack.Screen
          options={{ presentation: "card", headerShown: false }}
          name="dashboard"
          component={DashboardIndex}
        />
        <Stack.Screen
          options={{ presentation: "card", headerShown: false }}
          name="createcourse"
          component={CreateCourse}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          width: "93%",
          left: responsiveScreenWidth(3.5),
          bottom: responsiveScreenWidth(3),
          height: responsiveScreenHeight(7.4),
          borderRadius: responsiveScreenWidth(3),
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="home"
                size={28}
                color={focused ? "#56DCBB" : "gray"}
              />
            );
          },
        }}
        component={Home}
        name="Home"
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Fontisto
                name="search"
                size={28}
                color={focused ? "#56DCBB" : "gray"}
              />
            );
          },
        }}
        component={Search}
        name="Search"
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="book"
                size={28}
                color={focused ? "#56DCBB" : "gray"}
              />
            );
          },
        }}
        component={EnrolledCourses}
        name="EnrolledCourses"
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="user"
                size={28}
                color={focused ? "#56DCBB" : "gray"}
              />
            );
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default NotForLogin;
