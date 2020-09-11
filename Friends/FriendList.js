import React from "react";
import { View, StyleSheet, StatusBar, Button } from "react-native";

import Firebase from "../FirebaseSvc";

const firebase = new Firebase();

export default function FriendsList({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.Content}>
        <Button title="Press" onPress={() => firebase.FireStoreWrite()} />
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
