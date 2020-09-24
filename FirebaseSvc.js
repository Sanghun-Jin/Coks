import firebase from "firebase";

const Config = {
  apiKey: "AIzaSyBv65DnBNccas_8VimaHDvOjb_xAscuVr8",
  authDomain: "coks-project.firebaseapp.com",
  databaseURL: "https://coks-project.firebaseio.com",
  projectId: "coks-project",
  storageBucket: "coks-project.appspot.com",
  appID: "1:142458364491:web:ff8ad45c31be08c8d3e3ce",
};

const DB = firebase.initializeApp(Config);

class FirebaseSvc {
  CreateAccount = (navigation, users) => {
    DB.auth()
      .createUserWithEmailAndPassword(users.email, users.password)
      .then(() => {
        DB.auth().currentUser.sendEmailVerification();

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
    DB.auth()
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
    DB.auth().signOut();
  };

  VerifyEmail = () => {
    const user = DB.auth().currentUser;
    if (user != null) return DB.auth().currentUser.emailVerified;
  };

  UserLocationData = (position) => {
    const Cuser = DB.auth().currentUser;
    DB.database()
      .ref("UsersLocation/" + Cuser.uid)
      .set({
        username: "Name",
        email: Cuser.email,
        position: position,
      });
  };

  UserMarkAdd = (title, desc, share, position) => {
    const fs = DB.firestore();
    fs.collection(DB.auth().currentUser.email)
      .doc("Marker")
      .collection(title)
      .doc(share)
      .set({
        Title: title,
        Description: desc,
        Latitude: position.latitude,
        Longitude: position.longitude,
      });
  };
}

export default { DB, FirebaseSvc };
