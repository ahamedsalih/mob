import React from 'react';
import {View,Text,Image} from "react-native";
//import ImgToBase64 from 'react-native-image-base64';

class ViewVideos extends React.Component {



    state={
        videos:[]
    }
 async componentDidMount(){
     
  await this.videos();
//  await this.pics();
   }
  

render(){
      
    const {videos}=this.props.route.params;

    
    
   console.log("-----route----->>>>>",videos)

   console.log("-----routtype----",videos.length)

   console.log("----type-----",typeof videos )
  

    this.videos=async()=>{
          
        // const pics= await photos;
        // console.log("picssss",typeof pics)
       this.setState({videos: await videos})
    //    console.log("dataaaa",this.state.videos)
    //    console.log("datassss",this.state.photos)
    //    console.log("length",this.state.photos.length)
    //    console.log("datassssttttt",typeof this.state.photos)
       
    //uri:`data:image/jpg;base64,${data.imagess}`
      }

     
    return (
 

    <View style={{flex:1}}>
    <View style={{width:"100%",height:"100%",flexDirection:"column",left:"10%"}}>
    {this.state.videos.map((data,index)=>{
            console.log("videossssss",data)
       return <View style={{width:300,height:200,backgroundColor:"white",elevation:10,marginTop:10}} key={index}>
       <Image  style={{width:"100%",height:"100%",padding:5}} source={{uri:`data:image/jpg;base64,${data.videoss}`}}/>
       </View>
   })}
  
   </View>
   </View>
    )
};
};

export default ViewVideos;
