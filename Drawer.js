import React from "react";
import { TouchableOpacity, Image } from "react-native";

export default function MyDrawer() {
  return (
    <TouchableOpacity style={{ marginLeft: 20 }}>
      <Image
        source={require("./assets/Image/Icon/More.png")}
        style={{ width: 50, height: 50 }}
      />
    </TouchableOpacity>
  );
}
