import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "../Setting/SettingScreen";

const Stack = createStackNavigator();
export default function Setting_Navigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={SettingScreen}
        options={{ headerTitle: "설정" }}
      />
    </Stack.Navigator>
  );
}
