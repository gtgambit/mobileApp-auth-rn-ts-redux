import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/AntDesign";

const AuthStack = createStackNavigator();
const MainTab = createMaterialTopTabNavigator();

import { LoginScreen } from "./screens/auth/LoginScreen";
import { RegisterScreen } from "./screens/auth/RegisterScreen";
import { FeedsScreen } from "./screens/mainScreen/FeedsScreen";
import { ProfileScreen } from "./screens/mainScreen/ProfileScreen";
import { useSelector } from "react-redux";

export const useRoute = () => {
  const { token } = useSelector((state) => state.user);

  if (!token) {
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 15,
          color: "grey",
        },
      }}>
      <MainTab.Screen
        name="Feeds"
        component={FeedsScreen}
        options={{
          tabBarIcon: () => <Icon name="home" size={15} style={styles.icon} />,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Icon name="user" size={15} style={styles.icon} />,
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  icon: {
    color: "grey",
    marginTop: 32,
    position: "absolute",
    marginLeft: -35,
  },
});
