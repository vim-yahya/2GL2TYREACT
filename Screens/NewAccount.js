import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View ,TextInput,Button} from 'react-native';
import firebase from '../config';
const auth=firebase.auth();
export default function NewAccount(props) {
  return (
    <ImageBackground style={styles.container}
    source={require("../assets/background.jpeg")}>
<View style={{
  width:'95%',
  alignItems:'center',
  padding:5,
     borderColor:'white',
        borderWidth:2,
        borderRadius:8
}}>
      <Text style={{fontSize:28,
        color:"white",
        fontWeight:"bold",
        fontStyle:"italic",
        marginBottom:15
      }}>Creer un nouveau compte</Text>
      <StatusBar style="auto" />
      <TextInput onChangeText={(ch)=>{email=ch}} keyboardType='email-address' placeholder='email' style={styles.textinput}></TextInput>
        <TextInput onChangeText={(ch)=>{pwd=ch}} secureTextEntry={true} placeholder='password' style={styles.textinput}></TextInput>
        <TextInput onChangeText={(ch)=>{pwdconfirm=ch}} secureTextEntry={true} placeholder='Confirme password' style={styles.textinput}></TextInput>

    <View style={{flexDirection :"row",width:"55%",justifyContent:"space-evenly",marginTop:15}}>
    <Button title="S'inscrire" onPress={()=>{
            if(pwd === pwdconfirm && pwd.length >= 6)
            {
              auth.createUserWithEmailAndPassword(email, pwd)
              .then((userCredential) => {
                // Signed in
                const currentid = auth.currentUser.uid;
                props.navigation.replace("acceuil",{currentid: currentid});
                alert("account created");
            })
              .catch((err)=>{ alert(err) });
            }else{
              alert("verifier pwd");
            }
          }}></Button>
    <Button title="Retour" onPress={()=>{props.navigation.goBack();}} ></Button>
   
   
    </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',//alignement horizontal
    justifyContent: 'center',////alignement horizontal
    
  },
  textinput:{
backgroundColor:'white',
width:'80%'
,height:48,
color:'darkgray',
textAlign:'center',
fontWeight:'bold',
margin:10,
borderRadius:7
  }
});
