import React from 'react';
import { TextInput,Button,ActivityIndicator } from 'react-native-paper';
import {View,Text,StatusBar,KeyboardAvoidingView} from "react-native"

class Signup extends React.Component{
  
   
    
    state = {
          email: '',
          password: '',
          email:"",
          loading:false
        };
        
render(){
 

    const { name,email,password } = this.state;

const btnHandle=()=>{
  if(!name || !email || !password){
   alert("pls fill the fields")
  }
  else{
    this.setState({loading:true})
      return fetch("https://mobilio1.herokuapp.com/signup",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:this.state.name,
          password:this.state.password,
          email:this.state.email
        })
      }).then(res=>res.json()).catch(err=>{
        console.log(err)
      })
      .then(data=>{
        this.setState({loading:false})
        if(data.error){
          alert(data.error)
        }
        else{
          alert(data.message)
          this.props.navigation.navigate("signin")
         
        }
      }).catch(err=>{
        console.log(err)
      })
  }
}
  
  return (
   
     <View style={{flex:1,padding:10}}>
     <StatusBar hidden/>
     <KeyboardAvoidingView style={{top:"10%"}} behavior={Platform.OS == "android" ? "height" : "padding"} >
     <Text style={{textAlign:"center",top:"18%",letterSpacing:3,fontSize:27,fontWeight:"bold"}}>Signup</Text>
     </KeyboardAvoidingView>
    <View  behavior={Platform.OS == "android" ? "height" : "padding"} style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",alignItems:"center",bottom:"10%"}} >
  
    <TextInput
      label="Name"
      value={name}
      onChangeText={(name)=>this.setState({name})}
      mode="outlined" style={{width:"90%"}}
   
    />
    <TextInput
      label="Email"
      value={email}
      onChangeText={(email)=>this.setState({email})}
      mode="outlined" style={{width:"90%",top:"1%"}}
   
    />
    <TextInput
      label="Password"
      value={password}
    
      onChangeText={(password)=>this.setState({password})}
      mode="outlined"
      style={{width:"90%",top:"2%"}}
     
    />
    

  {this.state.loading?<View style={{top:10,top:"5%",width:"30%",height:40,backgroundColor:"#5d17cf",borderRadius:5}}><ActivityIndicator  style={{top:10,top:"15%",borderRadius:5}} size="small" color="white" /></View>
  :<Button onPress={btnHandle} style={{top:10,top:"5%",width:"90%",height:40}} mode="contained">
    Register
  </Button>}




  <Text style={{top:"10%"}} onPress={()=>this.props.navigation.navigate("signin")}>Already have an account ? Signin</Text>
  
   
    </View>
   
    </View>
  );
};
};

export default Signup;
