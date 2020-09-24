import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

import Firebase from "../FirebaseSvc";

const FirebaseSvc = new Firebase.FirebaseSvc();

export default function Login({ navigation }) {
  const [users, setUsers] = useState({
    ID: "sanghun1425@naver.com",
    password: "tkdgns1@",
  });

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.margin}
          label="Email"
          mode="outlined"
          value={users.ID}
          keyboardType="email-address"
          returnKeyType={"next"}
          onChangeText={(text) =>
            setUsers({
              ...users,
              ID: text,
            })
          }
          onSubmitEditing={() => {
            this.SecondTextInput.focus();
          }}
        />
        <TextInput
          style={styles.margin}
          label="Password"
          mode="outlined"
          returnKeyType={"done"}
          value={users.password}
          secureTextEntry={true}
          onChangeText={(text) =>
            setUsers({
              ...users,
              password: text,
            })
          }
          ref={(input) => {
            this.SecondTextInput = input;
          }}
        />
        <Button
          style={styles.margin}
          icon="key"
          mode="contained"
          onPress={() =>
            FirebaseSvc.LogInAccount(navigation, users.ID, users.password)
          }
        >
          Login
        </Button>
        <Button
          style={styles.margin}
          icon="key"
          mode="contained"
          onPress={() => navigation.navigate("Register")}
        >
          Rigister
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  margin: {
    margin: 10,
  },
});
