import React from "react";
import { Button, View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './login.js'
import Register from './register.js'
import MapTest from './Map.js'
import ImagePickers from './ImagePicker.js'
import Submit from './Submit.js'
import FindPwd from './findpwd.js'
import Profile from './profile.js'
import EditProfile from './editprofile.js'

const RootStack = createStackNavigator(
  {
  
    Home: Login,
    Register: Register,
    FindPwd: FindPwd,
    Map: MapTest,
    Submit: Submit,
    EditProfile: EditProfile,
    MainS: createBottomTabNavigator({
      일지보기: Profile,
      일지추가: ImagePickers,
      Submit: Submit})},
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App1 extends React.Component {
  render() {
    return <AppContainer />;
    
  }
}
