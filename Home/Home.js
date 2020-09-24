import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, StatusBar, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import Firebase from "../FirebaseSvc";

const DB = Firebase.DB;
const FirebaseSvc = new Firebase.FirebaseSvc();
export default function Home({ navigation }) {
  const { isLowBattery } = useSelector((state) => ({
    isLowBattery: state.isLowBattery,
  }));

  const { isEditting } = useSelector((state) => ({
    isEditting: state.isEditting,
  }));

  const [Current_Location, setCurrent_Location] = useState({});

  StartWatchLocation = () => {
    Location.watchPositionAsync(
      {
        timeInterval: 10000,
        distanceInterval: 10,
        mayShowUserSettingsDialog: isLowBattery,
      },
      (position) => {
        //FirebaseSvc.UserLocationData(position);
      }
    );
  };

  ReadCurrentLocation = () => {
    DB.database()
      .ref("UsersLocation/" + DB.auth().currentUser.uid + "/position/coords")
      .once("value", function (snapshot) {
        const position = snapshot.val();
        setCurrent_Location({
          latitude: position.latitude,
          longitude: position.longitude,
        });
      });
  };

  useEffect(() => {
    StartWatchLocation();
    ReadCurrentLocation();
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.Map}>
        <MapView
          style={styles.Map}
          initialRegion={{
            latitude: Current_Location.latitude,
            longitude: Current_Location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={"google"}
          onPress={(e) => {
            if (isEditting) {
              navigation.navigate("Linfo", {
                coordinate: [
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude,
                ],
              });
            }
          }}
        >
          <Marker
            coordinate={{
              latitude: Current_Location.latitude,
              longitude: Current_Location.longitude,
            }}
          >
            <View style={styles.marker}>
              <Image
                style={styles.markImage}
                source={require("../assets/Image/Icon/MapMarker.png")}
              />
            </View>
            <View style={styles.namebar}>
              <Text style={styles.nametext}>나</Text>
            </View>
          </Marker>
          {/* {markers.map((marker) => {
            return (
              <Marker
                coordinate={{
                  latitude: marker.coordinate.lati,
                  longitude: marker.coordinate.long,
                }}
                title={marker.title}
                description={marker.description}
              >
                <View style={styles.marker}>
                  <Image
                    style={styles.markImage}
                    source={require("../assets/Image/Icon/MapMarker.png")}
                  />
                </View>
              </Marker>
            );
          })} */}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Map: {
    flex: 1,
    marginHorizontal: 10,
  },
  marker: {
    width: 50,
    height: 50,
  },
  markImage: {
    width: 50,
    height: 50,
  },
  namebar: {
    width: 50,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  nametext: {
    color: "blue",
  },
});
