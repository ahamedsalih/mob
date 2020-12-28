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
// import TrackPlayer from 'react-native-track-player';

// import Permissions from "react-native-permissions";

class Musics extends Component {
  state = {
    musics: [],
    loading: true,
  };

  async componentDidMount() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage',
        message: ' This app would like to access your storage',
      },
    ).then((permission) => {
      if (permission === 'denied') {
        console.log('you cannot access');
      } else {
        console.log('access');
        getTracks({minimumSongDuration: 1000})
          .then(async (tracks) => {
            this.setState({loading: false});
            console.log(tracks);
            this.setState({musics: await tracks});
            console.log('length', this.state.musics.length);
          })
          .catch((err) => {
            console.log('---error----', err);
          });
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {this.state.loading ? (
          <View style={{bottom: 50}}>
            <ActivityIndicator
              style={{height: 30, top: 10}}
              size="medium"
              color="black"
            />
            <Text style={{textAlign: 'center', top: 20, left: 5}}>
              Musics Loading...
            </Text>
          </View>
        ) : (
          <ScrollView
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                top: 10,
              }}>
              {this.state.musics.map((data, index) => {
                const datas = data.title;
                return (
                  <TouchableWithoutFeedback
                    style={{
                      width: '100%',
                      height: 100,
                      backgroundColor: 'white',
                      elevation: 8,
                      flexDirection: 'row',
                    }}
                    key={index}
                    onPress={() =>
                      this.props.navigation.navigate('samplemusics', {
                        musicdata: data,
                      })
                    }>
                    <View
                      style={{
                        width: '95%',
                        height: 100,
                        backgroundColor: 'white',
                        elevation: 8,
                        flexDirection: 'row',
                      }}>
                      {data.cover ? (
                        <Image
                          style={{
                            width: 100,
                            height: 80,
                            top: 10,
                            borderRadius: 10,
                            left: 10,
                          }}
                          resizeMode="contain"
                          source={{uri: `${data.cover}`}}
                        />
                      ) : (
                        <Image
                          style={{
                            width: 80,
                            height: 80,
                            top: 10,
                            borderRadius: 10,
                            left: 10,
                          }}
                          source={{
                            uri:
                              'https://webstockreview.net/images/clipart-music-muzik-18.png',
                          }}
                        />
                      )}
                      <Text
                        style={{
                          fontSize: 16,
                          left: 30,
                          alignSelf: 'center',
                        }}>
                        {data.album.replace('- Tamil - MassTamilan.com', '')}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',

                          position: 'absolute',
                          top: 0,
                          fontSize: 17,
                          left: '35%',
                          top: 8,
                        }}>
                        {datas.replace('- MassTamilan.com', '')}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',

                          position: 'absolute',
                          // top: 0,
                          fontSize: 14,
                          left: '35%',
                          top: '64%',
                        }}>
                        {data.artist.replace('- MassTamilan.com', '')}
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          backgroundColor: 'black',
                          height: 0.5,
                          position: 'absolute',
                          borderRadius: 30,
                        }}></View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

export default Musics;
