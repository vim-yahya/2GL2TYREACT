import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";

import firebase from "../../config";
const database = firebase.database();

export default function MonCompte(props) {
  const currentid = props.route.params.currentid;
  const [Nom, setNom] = useState();
  const [Prenom, setPrenom] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [Pseudo, setPseudo] = useState("");
  const [urlImage, setUrlImage] = useState(null);
  const [connected, setConnected] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);
  // Add a state to manage the key
  const reflistProfiles = database.ref("profils");

  useEffect(() => {
    reflistProfiles.on("value", (DataSnapshot) => {
      DataSnapshot.forEach((un_profil) => {
        
        if (un_profil.val().idProfile == currentid) {
          //d.push(un_profil.val());

          setNom(un_profil.val().Nom);
          setPrenom(un_profil.val().Prenom);
          setPseudo(un_profil.val().Pseudo);
          setUrlImage(un_profil.val().url);
          setTelephone(un_profil.val().Telephone);
          setConnected(un_profil.val().connected);
        }
        
      });

    });
    return () => { };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });


    if (!result.canceled) {
      setUrlImage(result.assets[0].uri);
    }
  };
  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob"; //bufferArray
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    return blob;
  };
  const uploadLocalToStorage = async (url) =>{
    const storage = firebase.storage();
    const ref_photos_des_profils = storage.ref("photos_des_profils");
    const ref_unphoto = ref_photos_des_profils.child(currentid);
    const blob = await imageToBlob(url);
    await ref_unphoto.put(blob);
    const lien = await ref_unphoto.getDownloadURL();
    return lien;
  }
  return (
    <ImageBackground
      source={require("../../assets/background.jpeg")}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <Text style={styles.textstyle}>Mon compte</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            urlImage ? { uri: urlImage } : require("../../assets/icon.png")
          }
          style={{
            height: 150,
            width: 150,
          }}
        ></Image>
      </TouchableOpacity>

      <TextInput
        onChangeText={(text) => {
          setNom(text);
        }}
        textAlign="center"
        placeholderTextColor="#0005"
        placeholder="Nom"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setPrenom(text);
        }}
        textAlign="center"
        placeholderTextColor="#0005"
        placeholder="Prenom"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setTelephone(text);
        }}
        placeholderTextColor="#0005"
        textAlign="center"
        placeholder="Telephone"
        keyboardType="phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setPseudo(text);
        }}
        placeholderTextColor="#0005"
        textAlign="center"
        placeholder="Pseudo"
        style={styles.textinputstyle}
      ></TextInput>

      <TouchableOpacity
      
        onPress={async () => {
          if (!urlImage && !Nom && !Prenom && !Telephone && !Pseudo) {
            Alert.alert("Error", "Please fill in all fields and select an image.");
            return;
          } else {
            if (!urlImage) {
              Alert.alert("Error", "Please select an image.");
              return;
            }
            if (!Nom) {
              Alert.alert("Error", "Please fill in the Nom field.");
              return;
            }
            if (!Prenom) {
              Alert.alert("Error", "Please fill in the Prenom field.");
              return;
            }
            if (!Telephone) {
              Alert.alert("Error", "Please fill in the Telephone field.");
              return;
            }
            if (!Pseudo) {
              Alert.alert("Error", "Please fill in the Pseudo field.");
              return;
            }
            if (Pseudo.length < 5) {
              Alert.alert("Error", "Pseudo must be at least 5 characters long.");
              return;
            }
          }
          if (urlImage && Nom.length >0){
            const link = await uploadLocalToStorage(urlImage)
            const refProfiles = database.ref("profils")
            const key = currentid
            const unProfile = refProfiles.child("unProfil" + key)
            unProfile.set({
              idProfile: currentid,
              Nom,
              Prenom,
              Telephone,
              Pseudo,
              url: link,
              connected:true
            }).then(() => {
              setRefreshKey(1);
              alert("Profile saved");
             // setNom("");
             // setPrenom("");
             // setTelephone("");
             // setPseudo("");
            //  setUrlImage(null);
              
            }).catch((error) => {
              alert(error)
            })
          }
        }}
        disabled={false}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        style={{
          marginBottom: 10,
          backgroundColor: "#4682a0",
          textstyle: "italic",
          fontSize: 24,
          height: 40,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textinputstyle: {
    fontStyle: "italic",
    backgroundColor: "#0002",
    fontSize: 13,
    width: "70%",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  textstyle: {
    fontSize: 32,
    fontFamily: "serif",
    color: "#4682b4",
    fontWeight: "bold",
  },
  container: {
    paddingTop: 40,
    color: "blue",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
