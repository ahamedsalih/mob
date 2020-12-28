import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  PermissionsAndroid,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {getTracks, MusicFile} from 'react-native-music-files';
import RNFS from 'react-native-fs';
// import TrackPlayer from 'react-native-track-player';

// import Permissions from "react-native-permissions";

class AudioSample extends Component {
  //   state = {
  //     musics: [],
  //   };

  //   async componentDidMount() {
  //     PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: 'Storage',
  //         message: ' This app would like to access your storage',
  //       },
  //     ).then((permission) => {
  //       if (permission === 'denied') {
  //         console.log('you cannot access');
  //       } else {
  //         console.log('access');
  //         getTracks({minimumSongDuration: 1000})
  //           .then((tracks) => {
  //             console.log('------tracksss---', tracks);
  //             const audiodata = [];
  //             for (let i = 0; i < tracks.length; i++) {
  //               const audio = tracks[i].path;
  //               RNFS.readFile(audio, 'base64').then((res) => {
  //                 // console.log('-----res-------', res);
  //                 audiodata.push(res);
  //                 console.log('------audios-------', audiodata);
  //                 console.log('------audiosLength-------', audiodata.length);
  //               });
  //             }

  //             this.setState({musics: tracks});
  //             console.log('length', this.state.musics.length);
  //           })
  //           .catch((err) => {
  //             console.log('---error----', err);
  //           });
  //       }
  //     });
  //   }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>audiosample</Text>
      </View>
    );
  }
}

export default AudioSample;
