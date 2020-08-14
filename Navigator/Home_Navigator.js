import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Home/Home";
import SetLocationScreen from "../Home/SetLocationInfo";
import { Switch, TouchableOpacity, Image } from "react-native";

import { useDispatch, useSelector } from "react-redux";

const Stack = createStackNavigator();
function Home_Navigator() {
  const dispatch = useDispatch();
  const { isEditting } = useSelector((state) => ({
    isEditting: state.isEditting,
  }));
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Switch
              style={{ marginRight: 20 }}
              onValueChange={() =>
                dispatch({
                  type: "switching",
                })
              }
              value={isEditting}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 20 }}>
              <Image
                source={require("../assets/Image/Icon/More.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Linfo"
        component={SetLocationScreen}
        options={{
          headerBackTitle: "뒤로",
        }}
      />
    </Stack.Navigator>
  );
}

export default Home_Navigator;
