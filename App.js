import React from "react";
import { Button, View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer, IconComponent } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './login.js'
import MapTest from './Map.js'
import ImagePickers from './ImagePicker.js'
import FindPwd from './findpwd.js'
import Profile from './profile.js'
import EditProfile from './editprofile.js'
import Search_place from './search.js'
import Feed from './feed.js'
import Submit2 from './Submit2.js'
import FeedMap from './FeedMap.js'
import Register2 from './Register2.js'
const RootStack = createStackNavigator(
  {
  
    Home: Login,
    Register: Register2,
    FindPwd: FindPwd,
    Home3: ImagePickers,
    Map: MapTest,
    Submit: Submit2,
    EditProfile: EditProfile,
    Feed: Feed,
    FeedMap: FeedMap,
    Home4: Register2,
    MainS: createBottomTabNavigator({
      일지보기: Profile,
      일지추가: ImagePickers,
      관광지검색: Search_place},
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName === '일지보기') {
              iconName = `ios-book`;
            } else if (routeName === '일지추가') {
              iconName = `ios-add`;
            } else if (routeName === '관광지검색') {
              iconName = 'ios-search'
            }
            return <IconComponent name={iconName} size={25} color={tintColor} />;
          },
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        },
      })},
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
