import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import {
  TextInput,
  Avatar,
  Button,
  Portal,
  Dialog,
  Paragraph,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import FirebaseSvc from "../firebaseSvc";

const firebase = new FirebaseSvc();

export default function Register({ navigation }) {
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setUsers({
      ...users,
      profile: pickerResult.uri,
    });
  };

  const CheckEmail = () => {
    const emailval = users.email;
    var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    return emailval.match(reg_email);
  };

  const CheckPW = () => {
    const pwval = users.password;
    var reg_pw = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return pwval.match(reg_pw);
  };

  const CheckPn = () => {
    const pnval = users.phone;
    var reg_pn = /^[0-9]{10,11}/;

    return pnval.match(reg_pn);
  };

  const [users, setUsers] = useState({
    email: "",
    name: "",
    password: "",
    phone: "010",
    profile: "",
  });

  const ChangeVal = (TargetName, e) => {
    setUsers({
      ...users,
      [TargetName]: e.nativeEvent.text.replace(/(\s*)/g, ""),
    });
  };

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const OnRegister = async () => {
    setVisible(false);
    if (!CheckEmail()) {
      alert("이메일형식을 맞춰주세요.");
      return;
    }
    if (!CheckPW()) {
      alert(
        "비밀번호는 8자 이상이어야 하며, 숫자/소문자/특수문자를 모두 포함해야 합니다. "
      );
      return;
    }
    if (!CheckPn()) {
      alert("전화번호를 입력해주세요. (-제외)");
      return;
    }
    firebase.Emailverify(users);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <TextInput
          style={styles.inputs}
          mode="outlined"
          label="User_Email"
          name="email"
          value={users.email}
          keyboardType="email-address"
          returnKeyType={"next"}
          onChange={(e) => ChangeVal("email", e)}
          onSubmitEditing={() => {
            this.SecondTextInput.focus();
          }}
          ref={(input) => {
            this.FirstTextInput = input;
          }}
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.inputs}
          mode="outlined"
          label="User_Name"
          name="name"
          value={users.name}
          returnKeyType={"next"}
          onChange={(e) => ChangeVal("name", e)}
          onSubmitEditing={() => {
            this.ThirdTextInput.focus();
          }}
          ref={(input) => {
            this.SecondTextInput = input;
          }}
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.inputs}
          mode="outlined"
          name="password"
          label="PassWord"
          value={users.password}
          secureTextEntry={true}
          returnKeyType={"next"}
          onChange={(e) => ChangeVal("password", e)}
          onSubmitEditing={() => {
            this.FourthTextInput.focus();
          }}
          ref={(input) => {
            this.ThirdTextInput = input;
          }}
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.inputs}
          mode="outlined"
          name="phone"
          label="Phone_Number"
          keyboardType="number-pad"
          value={users.phone}
          returnKeyType={"done"}
          onChange={(e) => ChangeVal("phone", e)}
          ref={(input) => {
            this.FourthTextInput = input;
          }}
        />
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.inputs,
          { justifyContent: "center", alignItems: "center" },
        ]}
        onPress={openImagePickerAsync}
      >
        <Avatar.Image
          size={50}
          source={
            users.profile === ""
              ? {
                  uri:
                    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcAnr18%2FbtqGkhtqJ0z%2FMxovNWgkQPY7sPr5OA3JJ1%2Fimg.jpg",
                }
              : { uri: users.profile }
          }
        />
      </TouchableOpacity>
      <Button
        style={styles.inputs}
        icon="check"
        mode="contained"
        onPress={showDialog}
      >
        Register!
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>로그인 알림</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              현재 상태 닉네임 : {users.name} , 핸드폰 번호 : {users.phone} 및
              해당 프로필 사진으로 결정 하시겠습니까??
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={OnRegister}>회원가입</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  inputs: {
    margin: 10,
  },
});
