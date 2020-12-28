import React from "react";
import { TextInput,Button} from 'react-native-paper';
import {View,Text,StatusBar,ToastAndroid,AsyncStorage,ActivityIndicator} from "react-native"


class Otp extends React.Component{
   
  state={
    otp:"",
    loading:""
   }
  
    render(){

       
        const {email}=this.props.route.params;
      
   
    const btnHandle=()=>{
        this.setState({loading:true})
        if(otp===""){
            alert("please enter OTP");
            this.setState({loading:false})
        }
         fetch("https://mobilio1.herokuapp.com/otp",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({otp:this.state.otp,email:email})
          }).then(res=>res.json()).catch(err=>{console.log(err)})
          .then(data=>{
            this.setState({loading:false})
              if(data.msg){
                  this.props.navigation.navigate("new",{otp:otp,email:email})
                  alert(" otp success")

                  // if(data.error){
                  //   alert("try again")
                  // }
              }
              else{
                alert("incorrect otp try again")
              } 
                
          }).catch(err=>{console.log(err)})
    }
    const {otp,loading}=this.state;
    return(
        <View style={{flex:1}}>
        <StatusBar hidden/>
        <Text style={{textAlign:"center",top:"20%",letterSpacing:3,fontSize:27,fontWeight:"bold"}}>Enter otp</Text>
       <View style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",alignItems:"center",bottom:"10%"}}>
     
  
       <TextInput
         label="OTP"
         value={otp}
       
         onChangeText={otp=>this.setState({otp})}
         mode="outlined"
         style={{width:"90%",top:"2%"}}
        
       />
        {loading?<ActivityIndicator  style={{top:10,top:"5%"}}  size="large" color="#0000ff"/>:<Button testID="otp" style={{top:10,top:"5%"}} mode="contained" onPress={btnHandle}>submit</Button>}
   
   
       </View>
     
      
       </View>
    )
};
};


export default Otp;