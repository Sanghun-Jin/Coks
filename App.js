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
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";

import Bottomtabnavigator from "./Navigator/Bottom-tab_Navigator";
import Settingnavigor from "./Navigator/Setting_Navigator";

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

  useEffect(() => getLocation());

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Bottomtabnavigator} />
        <Drawer.Screen name="Setting" component={Settingnavigor} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
