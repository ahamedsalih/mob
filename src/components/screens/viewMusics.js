import React from 'react';
import {View,Text} from "react-native";
// import TrackPlayer from 'react-native-track-player';

class ViewMusics extends React.Component {
    render(){
        const {musics}=this.props.route.params;
        console.log("musicsssss",musics);
       
   
    
    return (
       <View>
           <Text>musics</Text>
        </View>
    )
};
};


export default ViewMusics;
