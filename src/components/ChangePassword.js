import React from 'react';
import {View,Text,StatusBar, AsyncStorage} from "react-native";
import {Button,TextInput,ActivityIndicator} from "react-native-paper";

class ChangePassword extends React.Component {

state={
    password:"",
    loading:false,
    users:[]
}

async componentDidMount(){
    const user= await AsyncStorage.getItem("user");
    
   const userr= JSON.parse(user);
  
    this.setState({users:userr})
    
    
 }


    render(){

        const {password}=this.state;

        const btnHandle=()=>{
        if(password===""){
            alert("pls enter password")
        }
        else{
    this.setState({loading:true})
     fetch("https://mobilio1.herokuapp.com/pass",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:this.state.users.email,
            changepassword:password
        })
    }).then(res=>res.json()).catch(err=>console.log(err))
    .then(data=>{
     
        this.setState({loading:false})
      if(data.error){
        
          alert(data.error)
      }
      else{
      
          alert("password changed successfully")
          this.props.navigation.navigate("home")
      }
    }).catch(err=>console.log(err))
}
    }
     


    return (
        <View style={{flex:1}}>
        <StatusBar/>
        <Text style={{textAlign:"center",top:"20%",letterSpacing:3,fontSize:27,fontWeight:"bold"}}>change password</Text>
       <View style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",alignItems:"center",bottom:"10%"}}>
     
  
       <TextInput
         label="enter new password"
         value={password}
       
         onChangeText={password => this.setState({password})}
         mode="outlined"
         style={{width:"90%"}}
        
       />
     {this.state.loading? <View style={{top:10,top:"5%",width:"30%",height:40,backgroundColor:"#5d17cf",borderRadius:5}}><ActivityIndicator  style={{top:"15%"}}  size="small" color="white"/></View>
     :<Button onPress={btnHandle}  style={{top:10,top:"5%",width:"90%",height:40}} mode="contained">
       Submit
     </Button>}
  </View>
   </View>
    )
};
};

export default ChangePassword;
