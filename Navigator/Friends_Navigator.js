import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FriendList from "../Friends/FriendList";
import FriendInfo from "../Friends/FriendInfo";

const Stack = createStackNavigator();
function Friends_Navigator() {
  return (
    <Stack.Navigator initialRouteName="Friends">
      <Stack.Screen
        name="Friends"
        component={FriendList}
        options={{
          headerTitle: "친구",
        }}
      />
      <Stack.Screen
        name="FriendInfo"
        component={FriendInfo}
        options={{
          headerTitle: "친구이름",
        }}
      />
    </Stack.Navigator>
  );
}

export default Friends_Navigator;
