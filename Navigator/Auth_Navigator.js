import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Register from "../auth/register";
import Login from "../auth/login";

const Stack = createStackNavigator();
export default function Auth_Navigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "로그인" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerTitle: "회원가입" }}
      />
    </Stack.Navigator>
  );
}
