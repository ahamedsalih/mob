import React from 'react';
import {View, TextInput, Button, AsyncStorage, Text, Image} from 'react-native';
import {JSHash, JSHmac, CONSTANTS} from 'react-native-hash';
import {sha256} from 'react-native-sha256';
import {_} from 'lodash';

class RoomChat extends React.Component {
  state = {
    room: '',
    userme: [],
    connection: true,
  };

  async componentDidMount() {
    await this.userasync();
    await this.btnHandle();
    // await this.hashedUsers();
  }

  render() {
    // const {username, room} = this.state;
    const {clickedUser, clickedName} = this.props.route.params;
    console.log('------uuuuuserrrr-----', clickedName);

    this.userasync = async () => {
      const users = await AsyncStorage.getItem('user');
      const userss = JSON.parse(users);
      // console.log("type",typeof userss)
      // console.log("ddfdfd",userss)
      this.setState({userme: userss});
      // alert(this.state.userme._id + datas);
    };

    // console.log('ussss', userr);
    this.btnHandle = () => {
      // const otheruser = clickedName;
      var userIds = [];
      userIds.push(this.state.userme._id, clickedUser);
      userIds = userIds.sort();
      sha256(`${userIds[0]}${userIds[1]}`).then((hash) => {
        this.props.navigation.navigate('schats', {
          roomname: hash,
          // otherUser: otheruser,
        });
        setTimeout(() => {
          this.setState({connection: false});
        }, 2000);
      });
    };

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'skyblue',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <View
            style={{
              width: 350,
              height: 360,
              backgroundColor: 'grey',
              bottom: 30,
              borderRadius: 5,
              elevation: 10,
              padding: 23,
            }}> */}
          <View style={{top: -30}}>
            {/* <TextInput
                placeholder="enter room name"
                style={{
                  width: 300,
                  height: 40,
                  backgroundColor: 'white',
                  marginTop: 30,
                  textAlign: 'center',
                  fontSize: 20,
                  elevation: 5,
                }}
                value={room}
                onChangeText={(room) => this.setState({room})}
              /> */}
            <View
              style={{
                top: 20,

                height: 40,
                width: 150,
                elevation: 10,
              }}>
              {this.state.connection ? (
                <Text
                  style={{textAlign: 'center', fontSize: 22, color: 'white'}}>
                  connecting...
                </Text>
              ) : (
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{bottom: '130%'}}>
                    <Image
                      style={{width: 100, height: 100}}
                      source={{
                        uri:
                          'https://cdn.iconscout.com/icon/premium/png-256-thumb/network-error-595273.png',
                      }}
                    />
                  </View>
                  <View style={{bottom: '110%', right: '48%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        color: 'white',
                        // top: 6,
                        position: 'absolute',
                      }}>
                      connection removed
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          {/* </View> */}
        </View>
      </View>
    );
  }
}

// const generateRoomId = (userOne, userTwo) => {
//   JSHash(userOne + 'mobiloo' + userTwo, CONSTANTS.HashAlgorithms.sha256)
//     .then((hash) => {
//       console.log('-------------hashed code---------', hash);
//       return hash;
//     })
//     .catch((e) => {
//       console.log(e);
//       return '';
//     });
// };

export default RoomChat;
