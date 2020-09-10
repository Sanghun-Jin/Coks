import firebase from "firebase";

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

  Emailverify = async ({ users }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const currentUser = {
          id: userCredential.user.uid,
          email: email,
          name: users.userName,
          phone: users.phone,
          emailVerified: userCredential.user.emailVerified,
        };
        firebase
          .firestore()
          .collection("users")
          .doc(currentUser.id)
          .set({
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone,
          })
          .then(function () {
            console.log("firestore()DB, 유저 추가성공");
          })
          .catch(() => {
            console.log("firestore()DB추가 실패", error);
          });
      })
      .then(() => {
        let user = firebase.auth().currentUser;

        user
          .sendEmailVerification()
          .then(function () {
            console.log("이메일 전송");
          })
          .catch("Email not sent!");
      });
  };
}
