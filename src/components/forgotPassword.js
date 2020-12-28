import React from 'react';
import {View,Text,ActivityIndicator,StatusBar} from "react-native";
import { TextInput,Button } from 'react-native-paper';

class ForgotPassword extends React.Component{
  state={
      email:"",
      loading:false
  }
  
render(){
  const btnHandle=()=>{
    this.setState({loading:true})
      if(email===""){
     alert("please enter email");
     this.setState({loading:false})
      }
      else{
           fetch("https://mobilio1.herokuapp.com/forgotpassword",{
              method:"post",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({email:this.state.email})
            }).then(res=>res.json())
            .then(data=>{
               
                if(data.error){
                    this.setState({loading:false})
                    alert("email doesnot exist")
                }
               else if(data.msg){
                this.setState({loading:false})
                   this.props.navigation.navigate("otp", {email:this.state.email})
                   alert("otp sent success check your mail")
               }
            }).catch(err=>{
                console.log(err.data)
                this.setState({loading:false})

            })
      }
  }

  const {email}=this.state;

    return (
        <View style={{flex:1}}>
        <StatusBar hidden/>
        <Text style={{textAlign:"center",top:"20%",letterSpacing:3,fontSize:27,fontWeight:"bold"}}>Enter Your Email</Text>
       <View style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",alignItems:"center",bottom:"10%"}}>
     
       <TextInput
         label="Email"
         value={email}
         onChangeText={email => this.setState({email})}
         mode="outlined" style={{width:"90%",bottom:"2%"}}
      
       />
    {this.state.loading?<ActivityIndicator  style={{top:10,top:"3%"}}  size="large" color="#0000ff"/>: <Button onPress={()=>btnHandle()} style={{top:10,top:"3%"}} mode="contained">
       Get OTP
     </Button>} 
   
    
    </View>
     </View>
    )
};
};

export default ForgotPassword;