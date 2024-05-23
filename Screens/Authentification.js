import { StatusBar } from 'expo-status-bar';
import { BackHandler, ImageBackground } from 'react-native';
import { StyleSheet, Text, View ,TextInput,Button} from 'react-native';
import firebase from '../config';
const auth=firebase.auth();
//const [email ,setemail]=useState("") 

export default function Authentification(props) {
    function Login() {
      auth
        .signInWithEmailAndPassword(email, pwd)
        .then((userCredential) => {
          // Signed in
          const currentid = auth.currentUser.uid;
          props.navigation.replace("acceuil", {
            currentid: currentid,
          });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
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
      <Text style={{fontSize:34,
        color:"white",
        fontWeight:"bold",
        fontStyle:"italic",
        
      }}>BienVenue</Text>
      <StatusBar style="auto" />
      <TextInput placeholder='Email' onChangeText={(ch)=>{email=ch}} keyboardType='email-address' style={styles.textinput}></TextInput>
      <TextInput secureTextEntry={true} onChangeText={(ch)=>{pwd=ch}} placeholder='password' style={styles.textinput}></TextInput>
    <View style={{flexDirection :"row",width:"55%",justifyContent:"space-evenly",marginTop:15}}>
    
    <Button title="Quitter" onPress={()=>{BackHandler.exitApp();}}>Quitter</Button>
    <Button title="Connecter" onPress={()=>{Login();}}>Quitter</Button>

    </View>
    <Text onPress={()=>{props.navigation.navigate("NewAccount")}}style={{width:'95%',textAlign:'center',fontSize:14,fontStyle:'italic',color:'grey',marginTop:15}}>Créer un nouveau compte</Text>
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
