import React from 'react';
import {
  View,
  Text,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Chat from './chat';

//import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// import RoomChat from './RoomChat';
// import Images from './image';
import Musics from './screens/musics';
// import AudioSample from './screens/audiosample';
// import SampleMusics from './screens/samplemusic';
// import Lottie from './screens/lottie';

const Tab = createMaterialTopTabNavigator();

class Home extends React.Component {
  render() {
    const logout = () => {
      AsyncStorage.clear();
      this.props.navigation.navigate('signin');
    };
    return (
      <>
        <StatusBar hidden={false} />
        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: 'grey',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <AntDesign
            name="profile"
            size={30}
            style={{top: 13, right: 40}}
            onPress={() => this.props.navigation.navigate('profile')}
            color="white"
          />
          <TouchableOpacity
            onPress={logout}
            style={{position: 'absolute', right: 30, top: 9}}>
            <AntDesign name="logout" size={30} color="white" />
          </TouchableOpacity>

          <Text
            style={{
              top: 10,
              right: 85,
              textAlign: 'center',
              color: 'white',
              fontSize: 24,
              letterSpacing: 2,
            }}>
            Mobilio
          </Text>
        </View>
        <Tab.Navigator
          initialRouteName="chat"
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'lightgrey',
            indicatorStyle: {backgroundColor: 'black', height: 3},
            labelStyle: {height: 30},
          }}>
          <Tab.Screen name="chats" component={Chat} />
          {/* <Tab.Screen name="music" component={SampleMusics} /> */}

          {/* <Tab.Screen name="chatroom" component={RoomChat} /> */}
          <Tab.Screen name="musics" component={Musics} />
          {/* <Tab.Screen name="audio" component={AudioSample} /> */}
        </Tab.Navigator>
      </>
    );
  }
}

export default Home;
