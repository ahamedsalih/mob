import React from 'react';
import {View,Text, AsyncStorage,Image} from "react-native";
import {Button} from "react-native-paper";

class Profile extends React.Component {

    state={
        users:[]
    }

   async componentDidMount(){
       const user= await AsyncStorage.getItem("user");
       
      const userr= JSON.parse(user);
      console.log("userr",userr)
       this.setState({users:userr})
       
    }

    render(){

       



    return (
        <View style={{flex:1}}>

            <View style={{flexDirection:"column",width:"100%",justifyContent:"center",alignItems:"center"}}>

                <View style={{width:"70%",height:300}}>
                    <Image  style={{width:"70%",height:"70%",top:30,borderRadius:150,left:36}}  source={{uri:"https://cdn1.vectorstock.com/i/1000x1000/66/60/avatar-business-man-graphic-vector-9646660.jpg"}}/>
                </View>
                <View>
    <Text style={{fontSize:30,bottom:30,letterSpacing:3}}>{this.state.users.name}</Text>
                </View>
                <View>
    <Text style={{fontSize:20,bottom:20,letterSpacing:1}}>{this.state.users.email}</Text>
                </View>

            </View>

            <Button  onPress={()=>this.props.navigation.navigate("changepassword")} style={{top:"0%",width:"60%",left:76}} mode="contained">
    Change password
  </Button>
          
        </View>
    )
};
};
export default Profile;
