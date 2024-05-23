import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dialog, Button } from "react-native-paper";

import firebase from "../../config";
import { DataSnapshot } from "firebase/database";
const database = firebase.database();

export default function ListProfils(props) {
  const currentid = props.route.params.currentid;
  const [isDialogVisible, setDialogvisible] = useState(false);
  const [itemSelected, setItemSelected] = useState([]);
  const [data, setdata] = useState([]);
  const reflistProfiles = database.ref("profils");
  const handleCall = (phoneNumber) => {
    let phoneURL = '';
    if (Platform.OS === 'android') {
      phoneURL = `tel:${phoneNumber}`;
    } else {
      phoneURL = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneURL);
  };


  useEffect(() => {
    reflistProfiles.on("value", (DataSnapshot) => {
      let d = [];
      DataSnapshot.forEach((un_profil) => {
        if (un_profil.val().idProfile != currentid) {
          d.push(un_profil.val());
        }
      });
      setdata(d);
    });
    return () => { };
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/background.jpeg")}
      style={styles.container}
    >
      <Text
        style={{
          fontSize: 24,
          textAlign: "center",
          color: "#555",
          fontWeight: "bold",
        }}
      >
        List Profils
      </Text>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                backgroundColor: "#0004",
                margin: 2,
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setDialogvisible(true);
                  setItemSelected(item);
                }}
              >
                <Image
                  source={item.url ? { uri: item.url } : require("../../assets/icon.png")}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                ></Image>
              </TouchableOpacity>
              <Text>{item.Pseudo}</Text>
              {item.connected ? (
      <View style={{  height: 10,

        width: 10,
        backgroundColor: "green",// ou red selon la ref Connected

        borderRadius: 15,

        marginleft: 10,
}}>
        <Text style={{ marginRight: 5, color: 'green' }}>Connected</Text>
      
      </View>
    ) : (
      <View style={{ height: 17,

        width: 17,
        backgroundColor: "red",// ou red selon la ref Connected

        borderRadius: 15,

        marginleft: 10, }}>
        <Text style={{ marginRight: 5, color: 'red' }}>Disconnected</Text>
      </View>
    )}
            </View>
          );
        }}
        style={{ backgroundColor: "#AED6F1", margin: 5 }}
      ></FlatList>

      <Dialog visible={isDialogVisible}>
        <Dialog.Title> Details</Dialog.Title>
        <Dialog.Content>
          <Image
            source={itemSelected.url ? { uri: itemSelected.url } : require("../../assets/icon.png")}
            style={{
              height: 50,
              width: 50,
            }}
          ></Image>
          <Text>{itemSelected.Nom}</Text>
          <Text>{itemSelected.Prenom}</Text>
          <Text>{itemSelected.Telephone}</Text>
          


        </Dialog.Content>
        <Dialog.Actions>
          <Button
         
              onPress={() => handleCall(itemSelected.Telephone)}
            
          >
            call
          </Button>
          <Button onPress={() => {
            props.navigation.navigate("Chat",
              {
                currentid: currentid,
                destinataire: itemSelected.idProfile,

              });
          }
          }>chat</Button>
          <Button
            onPress={() => {
              setDialogvisible(false);
            }}
          >
            cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});