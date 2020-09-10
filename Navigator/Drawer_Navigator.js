import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Bottomtabnavigator from "./Bottom-tab_Navigator";
import Settingnavigor from "./Setting_Navigator";

export default function Drawer_Navigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Bottomtabnavigator} />
      <Drawer.Screen name="Setting" component={Settingnavigor} />
    </Drawer.Navigator>
  );
}
