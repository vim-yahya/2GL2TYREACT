import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import firebase from '../config';
import Groups from './AcceuilScreen/Groups';
import ListProfils from './AcceuilScreen/ListProfils';
import MonCompte from './AcceuilScreen/MonCompte';
//import AddGroups from "./AcceuilScreen/AddGroups";

const Tab = createMaterialBottomTabNavigator();

export default function Acceuil(props) {
  const [Name, setNom] = useState("");
  const [LastName, setPrenom] = useState("");
  const [Tel, setTelephone] = useState("");
  const [Pseud, setPseudo] = useState("");
  const [urlImage, setUrlImage] = useState(null);

  const currentid = props.route.params.currentid;
  const auth = firebase.auth();
  const database = firebase.database();
  const refProfiles = database.ref("profils");
  const unProfile = refProfiles.child("unProfil" + currentid);
  unProfile.update({
    idProfile: currentid,

    connected: true
  });
  const fetchData = async () => {
    unProfile.on("value", (snapshot) => {
      snapshot.forEach((un_profil) => {
        if (un_profil.val().idProfile == currentid) {
          setNom(un_profil.val().Nom);
          setPrenom(un_profil.val().Prenom);
          setPseudo(un_profil.val().Pseudo);
          setUrlImage(un_profil.val().url);
          setTelephone(un_profil.val().Telephone);
        }
      });
    });
  };

 

  const handleLogout = () => {
    auth.signOut().then(() => {
      props.navigation.replace("Auth");
      unProfile.update({
        idProfile: currentid,
      
        connected: false
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Logout" color="#fa8072" onPress={handleLogout} />
      </View>
      <Tab.Navigator activeColor="#fa8072" inactiveColor="#9e9e9e">
        <Tab.Screen name="listprofils" component={ListProfils} initialParams={{ currentid: currentid }} />
        <Tab.Screen name="groups" component={Groups} initialParams={{ currentid: currentid }} />
        <Tab.Screen name="moncompte" component={MonCompte} initialParams={{ currentid: currentid }} />

      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
