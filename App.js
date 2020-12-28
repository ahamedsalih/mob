import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Signin from './src/components/signin';
import Signup from './src/components/signup';
import Home from './src/components/home';
import forgotPassword from './src/components/forgotPassword';
import Otp from './src/components/otp';
import newPassword from './src/components/newPassword';
import Oauthgoogle from './src/components/google';
import Socketchat from './src/components/socketChat';
import RoomChats from './src/components/roomChats';
import SampleChat from './src/components/samplechat';
import ContactList from './src/components/contactlist';
import Profile from './src/components/profile';
import ViewImages from './src/components/viewImages';
import ChangePassword from './src/components/ChangePassword';
import Lottie from './src/components/screens/lottie';
import ViewVideos from './src/components/screens/viewVideos';
import RoomChat from './src/components/RoomChat';
import New from './src/components/screens/new';
import SampleMusics from './src/components/screens/samplemusic';
import SingleImage from './src/components/screens/singleimage';

const Stack = createNativeStackNavigator();
enableScreens();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="signin">
          <Stack.Screen
            name="signin"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="forgot"
            component={forgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="otp"
            component={Otp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="new"
            component={newPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="oauth"
            component={Oauthgoogle}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="schat"
            component={Socketchat}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="rooms"
            component={RoomChat}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="schats"
            component={RoomChats}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="sample"
            component={SampleChat}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="con"
            component={ContactList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="viewimages"
            component={ViewImages}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="changepassword"
            component={ChangePassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="lottie"
            component={Lottie}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="viewvideos"
            component={ViewVideos}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="news"
            component={New}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="samplemusics"
            component={SampleMusics}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="singleimage"
            component={SingleImage}
            options={{headerShown: false}}
          />

          {/* <Stack.Screen name="chatt" component={chatt} options={{headerShown:false}}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
