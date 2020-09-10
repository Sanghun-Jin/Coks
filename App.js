/*
설치 모듈
@react-navigation/native
@react-navigation/stack
react-native-gesture-handler
react-native-screens
@react-native-community/masked-view
redux
react-redux
expo-location
*/

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Auth_Navigator from "./Navigator/Auth_Navigator";
import Drawer_Navigator from "./Navigator/Drawer_Navigator";

function App() {
  const dispatch = useDispatch();

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      dispatch({
        type: "changeLocation",
        latitude: latitude,
        longitude: longitude,
      });
    } catch (error) {
      alert(
        "위치정보를 찾지 못했습니다.",
        "설정에서 위치권한을 허용해 주세요."
      );
    }
  };

  //useEffect(() => getLocation());

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={Auth_Navigator} />
        <Stack.Screen name="Drawer" component={Drawer_Navigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
