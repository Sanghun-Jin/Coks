import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
// import axios from "axios";
import Firebase from "../FirebaseSvc";

const firebase = new Firebase();

export default function Login({ navigation }) {
  const [users, setUsers] = useState({
    ID: "",
    password: "",
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
            firebase.LogInAccount(navigation, users.ID, users.password)
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
