import React from "react";
import {
  ScrollView,
  Switch,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

function SettingScreen({ navigation }) {
  const dispatch = useDispatch();
  const { isLowBattery } = useSelector((state) => ({
    isLowBattery: state.isLowBattery,
  }));
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.SetList}>
        <TouchableOpacity>
          <Text style={styles.text}>친구관리</Text>
        </TouchableOpacity>
      </View>
      <View
        style={
          (styles.SetList,
          {
            flexDirection: "row",
            alignItems: "center",
          })
        }
      >
        <Text style={(styles.text, { flex: 5 })}>저전력모드</Text>
        <Switch
          style={{ flex: 1 }}
          onValueChange={() =>
            dispatch({
              type: "switchingBatteryMode",
            })
          }
          value={isLowBattery}
        />
      </View>
      <View style={styles.SetList}>
        <TouchableOpacity>
          <Text style={styles.Logout}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
  },
  SetList: {},
  text: {
    textAlign: "center",
    fontSize: 17,
  },
  Logout: {
    color: "red",
    textAlign: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#bbb",
    paddingVertical: 10,
    fontSize: 20,
  },
});
