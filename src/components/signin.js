import React from 'react';
import { TextInput,Button,ActivityIndicator} from 'react-native-paper';
import LottieView from "lottie-react-native";
import {View,Text,StatusBar,AsyncStorage,Animated,ToastAndroid,KeyboardAvoidingView}from "react-native";

//import Oauthgoogle from "./google"



 




class Signin extends React.Component{
  
state={
    email:"",
    password:"",
    loading:false,
    lottie:new Animated.Value(0),
    lotties:false
}


componentDidMount(){
    this.getUser();
 }


render(){

        



this.getUser=async()=>{
        
    const token1=await AsyncStorage.getItem("jwt");
    if(token1){
      this.props.navigation.navigate("home")
    }
    else{
      this.props.navigation.navigate("signin")

    }
   
  } 


  // const responseGoogle = (response) => {
  //   console.log(response);
  // }
  

const btnHandle=()=>{
  if(!email || !password){
    alert("pls enter the email or password")
   }

   else{
    this.setState({loading:true})
   return fetch("https://mobilio1.herokuapp.com/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:this.state.email,password:this.state.password
      })
    }).then(res=>res.json()).catch(err=>console.log(err))
    .then((data)=>{
      console.log(data);
      this.setState({loading:false})
      if(data.error){
       
        ToastAndroid.show(data.error, ToastAndroid.LONG);
      }
      else{
        // alert("logedin success")
        this.setState({lotties:true})
         this.lottieAni();
       
        
         AsyncStorage.setItem("jwt",data.token);
         AsyncStorage.setItem("user",JSON.stringify(data.user));
       
        console.log("signin",data.token)
        setTimeout(()=>{
          this.props.navigation.navigate("home")
        },2000)
 }
    })
  }
}

   this.lottieAni=()=>{
  //  Animated.timing(this.state.lottie, {
  //     toValue: 1,
  //     duration: 2000,
  //     easing: Easing.linear,
  //   }).start();
  this.props.navigation.navigate("lottie")
   
   }


  const {email,password}=this.state;

  return (
      
     <View style={{flex:1}}>
     <StatusBar/>
     <KeyboardAvoidingView style={{top:"15%"}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
     <Text style={{textAlign:"center",top:"20%",letterSpacing:3,fontSize:27,fontWeight:"bold"}}>Signin</Text>
     </KeyboardAvoidingView>
    <KeyboardAvoidingView style={{flex:1,justifyContent:"center",alignItems:"center",bottom:"10%"}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
  
    <TextInput
      label="Email"
      value={email}
      onChangeText={email => this.setState({email})}
      mode="outlined" style={{width:"90%"}}
   
    />
    <TextInput
      label="Password"
      value={password}
    
      onChangeText={password => this.setState({password})}
      mode="outlined"
      style={{width:"90%",top:"2%"}}
     
    />
   
    {/* {this.state.lotties&&<View style={{width:300,height:300,backgroundColor:"white",elevation:10,left:10,justifyContent:"center",alignItems:"center",borderRadius:10}}><LottieView  style={{width:200,height:200}} source={require("../assets/13460-login.json")} progress={this.state.progress} />
      <Text>signed in success</Text></View>} */}
  {this.state.loading?<View style={{top:10,top:"5%",width:"30%",height:40,backgroundColor:"#5d17cf",borderRadius:5}}><ActivityIndicator  style={{top:10,top:"5%",height:30,top:4}}  size="small" color="white"/></View>:<Button  testID="signin" onPress={btnHandle} style={{top:10,top:"5%",width:"90%",height:40}} mode="contained">
    Signin
  </Button>}
  {/* <View style={{position:"absolute",justifyContent:"center",bottom:200}}>
<Google/>
</View> */}

  {/* <View>
  <Button  style={{top:"100%",backgroundColor:"blue"}}  onPress={()=>this.props.navigation.navigate("oauth")}  mode="contained">
    google login
  </Button>
  </View>  */}
  {/* <View>
  <Oauthgoogle/>
  </View> */}

 

  <Text style={{top:"10%"}} onPress={()=>this.props.navigation.push("signup")}>Don't have an account ? Signup</Text>


  <Text style={{top:"13%",letterSpacing:1}} onPress={()=>this.props.navigation.navigate("forgot")}>Forgot Password? Click me</Text>
   </KeyboardAvoidingView>
 
</View>
    
  );
};
};

export default Signin;