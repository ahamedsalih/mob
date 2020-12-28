import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
// import {triggerBase64Download} from 'react-base64-downloader';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';

export default class SingleImage extends Component {
  render() {
    const {image} = this.props.route.params;

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: '100%', height: '80%', top: 40}}>
          <Image
            style={{
              width: '100%',
              height: '70%',
              padding: 5,
              marginBottom: 5,
            }}
            resizeMode="cover"
            source={{uri: `data:image/jpg;base64,${image}`}}
          />
        </View>
        {/* <Button
         onPress={imageDownload}
          style={{width: '70%', height: 40, bottom: '10%'}}
          mode="contained">
          Download
        </Button> */}
      </View>
    );
  }
}
