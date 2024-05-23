import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import firebase from "../config";

export default function Chat(props) {
  const currentid = props.route.params.currentid;
  const secondid = props.route.params.destinataire;
  const [msg, setmsg] = useState();
  const [messages, setmessages] = useState([]);
  const [isTyping, setisTyping] = useState(false);

  const database = firebase.database();
  const ref_lesdiscussions = database.ref("les_discussions");
  const iddisc = currentid > secondid ? currentid + secondid : secondid + currentid;
  const ref_une_discussion = ref_lesdiscussions.child(iddisc);

  const ref_currentistyping = ref_une_discussion.child(currentid + "_isTyping");
  const ref_secondistyping = ref_une_discussion.child(secondid + "_isTyping");

  useEffect(() => {

    ref_une_discussion.child("chat").on("value", (DataSnapshot) => {
      let d = [];
      DataSnapshot.forEach((child) => {
        d.push(child.val());
      });
      setmessages(d);
    });


    return () => {
      ref_une_discussion.off("value");
    };
  }, []);

  useEffect(() => {
    ref_secondistyping.on("value", (DataSnapshot) => {
      let x = DataSnapshot.val();
      setisTyping(x);
    });

    return () => {
      ref_secondistyping.off("value");
    }
  }
    , []);


  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/background.jpeg")}
    >
      <FlatList
        style={{ margin: 5 }}
        data={messages}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: "70%",
                margin: 5,
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 5,
                padding: 5,
                backgroundColor: item.Sender === currentid ? "#0005" : "#0008",
                alignSelf: item.Sender === currentid ? "flex-end" : "flex-start",
              }}
            >
              <Text style={{ color: "white" }}>{item.Message}</Text>
              <Text>{item.Time}</Text>
            </View>
          );
        }}
      >

      </FlatList>

      {isTyping ? (
      <Text style={{ color: "white", textAlign: "center", fontSize: 24 }}>
         istyping...
      </Text>):null }
      <View
        style={{
          flexDirection: "row",
          margin: 5,
          borderColor: "black",
          borderWidth: 2,
          borderRadius: 5,
          padding: 5,
        }}
      >
        <TextInput
          onFocus={() => {
            ref_currentistyping.set(true);
          }}
          onBlur={() => {
            ref_currentistyping.set(false);
          }}
          onChangeText={(ch) => {
            setmsg(ch);
          }}
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
            backgroundColor: "#0005",
            width: "85%",
            marginRight: 10,
          }}
        ></TextInput>
        <TouchableHighlight
          onPress={() => {
            // envoie du message
            const key = ref_une_discussion.push().key;
            const ref_unmessage = ref_une_discussion.child("chat").child(key);
            ref_unmessage.set({
              Message: msg,
              Time: new Date().toLocaleString(),
              Sender: currentid,
              Receiver: secondid,
            });
          }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={{ width: 40, height: 40 }}
          ></Image>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});