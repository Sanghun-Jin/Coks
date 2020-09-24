import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChattingList from "../Chat/ChattingList";
import Chatting from "../Chat/Chat";

const Stack = createStackNavigator();
export default function Chatting_Navigator() {
  return (
    <Stack.Navigator initialRouteName="ChatList">
      <Stack.Screen
        name="ChatList"
        component={ChattingList}
        options={{
          headerTitle: "채팅기록",
        }}
      />
      <Stack.Screen name="Chatting" component={Chatting} />
    </Stack.Navigator>
  );
}
