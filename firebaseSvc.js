import firebase from "firebase";
import "firebase/firestore";

const Config = {
  apiKey: "AIzaSyBv65DnBNccas_8VimaHDvOjb_xAscuVr8",
  authDomain: "coks-project.firebaseapp.com",
  databaseURL: "https://coks-project.firebaseio.com",
  projectId: "coks-project",
  storageBucket: "coks-project.appspot.com",
  appID: "1:142458364491:web:ff8ad45c31be08c8d3e3ce",
};

export default class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(Config);
    } else {
      console.log("firebase apps already running...");
    }
  }
  CreateAccount = async (navigation, users) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(users.email, users.password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification();
        navigation.navigate("Login");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("이미 사용중인 이메일 입니다.");
            break;
          case "auth/invalid-email":
            alert("유효하지 않은 메일입니다");
            break;
        }
      });
  };

  LogInAccount = (navigation, email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (this.VerifyEmail()) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Drawer" }],
          });
        } else {
          alert("이메일 인증을 해주세요");
        }
      })
      .catch(() => {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      });
  };

  LogOutAccount = () => {
    firebase.auth().signOut();
  };

  VerifyEmail = () => {
    const user = firebase.auth().currentUser;
    if (user != null) return firebase.auth().currentUser.emailVerified;
  };

  FireStoreRead = () => {
    const fs = firebase.firestore();
    fs.collection("UserInfo")
      .doc("Friends")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          alert(JSON.stringify(doc.data()));
        } else {
          alert("No data");
        }
      });
  };
  FireStoreWrite = () => {
    const fs = firebase.firestore();
    fs.collection("UserInfo").add({ name: "asd", PhoneNum: "012312" });
  };
}
