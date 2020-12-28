import React from 'react';
import {
  View,
  Text,
  Image,
  AsyncStorage,
  BackHandler,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
// import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import NetInfo from "@react-native-community/netinfo";
//import { TextInput,Button } from 'react-native-paper';

class Chat extends React.Component {
  state = {
    users: [],
    loading: false,
    // connection_Status:""
  };

  componentDidMount() {
    this.userfetch();
  }

  render() {
    const {users} = this.state;

    this.userfetch = async () => {
      this.setState({loading: true});
      fetch('https://mobilio1.herokuapp.com/users', {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('jwt')),
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err))
        .then((userdata) => {
          this.setState({loading: false});

          if (userdata.error) {
            console.log('user not found');
          } else {
            console.log(userdata.user);
            this.setState({users: userdata.user});
          }
        })
        .catch((err) => console.log(err));
    };

    return (
      <View style={{padding: 7}}>
        {this.state.loading ? (
          <View>
            <ActivityIndicator
              style={{height: 30, top: 10}}
              size="medium"
              color="black"
            />
            <Text style={{textAlign: 'center', top: 18}}>please wait...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {users.map((data, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    this.props.navigation.navigate('rooms', {
                      clickedUser: data._id,
                    })
                  }>
                  <View
                    style={{
                      width: '100%',
                      height: 80,
                      backgroundColor: 'lightgrey',
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-around',
                      top: 0,
                      elevation: 5,
                      marginTop: 8,
                    }}>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 70,
                        top: 7,
                        left: 10,
                        position: 'absolute',
                      }}
                      source={{
                        uri:
                          'https://cdn1.vectorstock.com/i/1000x1000/66/60/avatar-business-man-graphic-vector-9646660.jpg',
                      }}
                    />
                    <Text
                      style={{
                        top: 24,
                        fontSize: 22,
                        right: 45,
                        letterSpacing: 2,
                        left: 10,
                      }}>
                      {data.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}
export default Chat;
