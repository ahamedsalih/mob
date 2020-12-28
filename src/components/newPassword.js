import React from "react";
import { TextInput,Button,Snackbar } from 'react-native-paper';
import {View,Text,StatusBar,ToastAndroid,AsyncStorage,ActivityIndicator} from "react-native"


class NewPassword extends React.Component{
    // const [newpassword,setNewpassord]=useState("");
    // const {email}=route.params;

    state={
        newpassword:"",
        loading:false
    }

   render(){
       const {email}=this.props.route.params;
    const btnHandle=()=>{
        this.setState({loading:true})
        if(newpassword===""){
            alert("please enter the new password");
            this.setState({loading:false})
        }

        fetch("https://mobilio1.herokuapp.com/newpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email,newpassword:newpassword})
        }).then(data=>{
            if(data.error){
                this.setState({loading:false})
                alert(data.error)

            }
            this.setState({loading:false})
          
            alert("successfully updated new password");
            this.props.navigation.navigate("signin")
        })
    }
    const {newpassword,loading}=this.state;
    return(
        <View style={{flex:1}}>
        <StatusBar hidden/>
        <Text style={{textAlign:"center",top:"20%",letterSpacing:3,fontSize:27,fontWeight:"bold"}}>Create new password</Text>
       <View style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",alignItems:"center",bottom:"10%"}}>
     
  
       <TextInput
         label="create new password"
         value={newpassword}
       
         onChangeText={newpassword=>this.setState({newpassword})}
         mode="outlined"
         style={{width:"90%",top:"2%"}}
        
       />
   {loading?<ActivityIndicator  style={{top:10,top:"5%"}}  size="large" color="#0000ff"/>:<Button style={{top:10,top:"5%"}} mode="contained" onPress={btnHandle}>submit</Button>}
   
   
       </View>
     
      
       </View>
    )
};
};


export default NewPassword;