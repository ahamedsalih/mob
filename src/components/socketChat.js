import React from 'react';
import io from "socket.io-client";
import {View,Text,TextInput} from "react-native";
//import {Button} from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons"


class Socketchat extends React.Component {

  state={
      chatMessage:"",
      chatMessages:[]
  }
 
     componentDidMount(){
    this.socket = io("https://mobilio1.herokuapp.com");
    this.socket.on("chat message", msg => {
     
               this.setState({ chatMessages: [...this.state.chatMessages, msg]});
       });
     }
   
     render() {
      const {chatMessage}=this.state;
        const btnHandle=()=> {
          const msg=this.state.chatMessage;
          if(msg===""){
            alert("pls type a msg")
          }
            this.socket.emit('chat message',this.state.chatMessage);
            this.setState({chatMessage: ''});
         
          }
      
        const chatMessages = this.state.chatMessages.map((chatMessage,index )=> (
        <Text key={index} style={{ top: 500,width:100,left:10,marginTop:10,backgroundColor:"blue",color:"white",textAlign:"center",height:30}}>{chatMessage}</Text>
        ));
      
        return (
          <View>
            {chatMessages}
     <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
        
        <View>
        <TextInput  placeholder="type a message"
        style={{height:40,borderWidth:2,borderRadius:10,borderColor:"grey",left:35,top:650,width:270,textAlign:"center"}}
        autoCorrect={false}
        value={chatMessage}
        onChangeText={chatMessage=>this.setState({chatMessage})}
        />
        </View>
        <View>
     <Ionicons name="md-send-sharp" size={34} onPress={btnHandle} color="grey" style={{width:100,top:650,left:45}}/>
     </View>
 </View>
 </View>
        );
      
};
};





export default Socketchat;
