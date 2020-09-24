import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Button } from "react-native";

import Firebase from "../FirebaseSvc";

const DB = Firebase.DB;

export default function FriendsList({ navigation }) {
  const [Data, setData] = useState({});
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.Content}>
        <Button title="Press" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Content: {
    flex: 1,
  },
});
