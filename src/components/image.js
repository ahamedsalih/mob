import React from 'react';
import {View,Text,PermissionsAndroid, Platform ,Image} from "react-native";
import CameraRoll from '@react-native-community/cameraroll';


class Images extends React.Component {
state={
    photos:[]
}

 async  componentDidMount () {
        try {
          const permission = await PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
         PermissionsAndroid.request(permission);
         Promise.resolve();
          if(permission==="denied"){
              console.log("not granted")
          }
          else{
       CameraRoll.getPhotos({first:2,assetType:"Photos"})
       .then(r=>{
           this.setState({photos:r.edges})
          
            console.log(r.edges)
          
       })
          }
        } catch (error) {
          Promise.reject(error);
        }

      
        
    };







    render(){


  
    return (
       <View>
        <View style={{width:"100%",height:"100%",flexDirection:"column",left:"10%"}}>
        {this.state.photos.map((data,index)=>{
                 console.log("imagessssss",data)
            return <View style={{width:300,height:200,backgroundColor:"blue",elevation:10,marginTop:10}} key={index}>
            <Image  style={{width:300,height:200,padding:5}} source={{uri:data.node.image.uri}}/>
            </View>
        })}
      
       </View>
       </View>
    )
};
};

export default Images;
