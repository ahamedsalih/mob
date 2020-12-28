import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  Image,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import io from 'socket.io-client';
import {Button} from 'react-native-paper';
// import {TouchableOpacity} from 'react-native-gesture-handler';

class SampleChat extends React.Component {
  state = {
    messages: [],
    message: '',
    contact: [],
    photos: [],
    musics: [],
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
      } else if (
        !message.text.includes('imagess') &&
        !message.text.includes('phoneNumbers') &&
        !message.text.includes('videoss') &&
        !message.text.includes('musicss')
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
    // const {clickedUser} = this.props.route.params;
    // console.log(clickedUser);

    const {uname, roomname} = this.props.route.params;
    console.log(uname, roomname);

    this.getUsers = async () => {
      var userData = await AsyncStorage.getItem('user');
      userData = JSON.parse(userData);
      //   alert(userData.name);
      this.socket.emit('join', {name: userData.name, room: roomname});
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

    return (
      <View style={{flex: 1}}>
        <View style={{top: '5%'}}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              top: '15%',
              left: 5,
            }}>
            <TouchableOpacity
              style={{
                width: 180,
                height: 170,
                right: 10,
                borderRadius: 15,
                elevation: 7,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  width: 180,
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
                      contacts
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  width: 180,
                  height: 170,
                  backgroundColor: 'white',
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
                      photos
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                top: '30%',
                left: 5,
              }}>
              <View
                style={{
                  width: 180,
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
                  <View style={{top: '105%', position: 'absolute', left: 35}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 24,
                        letterSpacing: 2,
                      }}>
                      messages
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: 180,
                  height: 170,
                  backgroundColor: 'white',
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
                      width: '65%',
                      height: '80%',
                      left: 30,
                      top: 10,
                      opacity: 0.75,
                    }}
                    source={{
                      uri:
                        'https://www.pngfind.com/pngs/m/56-568764_message-png-message-icon-png-white-transparent-png.png',
                    }}
                  />
                  <View style={{top: '105%', position: 'absolute', left: 53}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 24,
                        letterSpacing: 2,
                      }}>
                      email
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: 350,
              height: 160,
              backgroundColor: 'white',
              elevation: 7,
              top: '30%',
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
        </View>
      </View>
    );
  }
}

export default SampleChat;
