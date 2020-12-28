import React from 'react';
import { Animated, Easing,View,Text} from 'react-native';   
import LottieView from "lottie-react-native";

export default class Lottie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  render() {
    return (
        <View style={{flex:1,backgroundColor:"lightgrey"}}>
        <View style={{width:350,height:350,backgroundColor:"white",elevation:10,left:20,
        justifyContent:"center",alignItems:"center",borderRadius:10,top:"23%"}}>
      
      <LottieView  style={{width:200,height:200}} source={require('../../assets/13460-login.json')} progress={this.state.progress} />
      <Text style={{fontSize:24}}>Signed in Success</Text>
    </View>
    </View>
    );
  }
}