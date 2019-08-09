import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, TouchableHighlight, Modal, ScrollView } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Content, Container, Header, Footer } from 'native-base';

import RNFetchBlob from 'react-native-fetch-blob';
const { width, height } = Dimensions.get('window');
const web_url = 'http://52.78.132.18:8080';
export default class SearchFriend extends Component{
  constructor(props){
    super(props);  
    this.state = {
      user_id: this.props.navigation.getParam('user_id'),
      log_info: this.props.navigation.getParam('log_info'),
      friend_info : null,
      friend_log_info : null,
      friend_user_info: null,
      search_keyword: '',
      
    }
    this.search_friend = this.search_friend.bind(this);
    this.gofriend = this.gofriend.bind(this);
  }
  gofriend = (friend_user_id, friend) => {
    fetch(web_url + '/appServer/appMain/' + this.state.user_id, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id:friend_user_id})
        })
        .then((response) => response.json())
        .then((responseJson) => {this.setState({
            
            friend_user_info: responseJson, 
            friend_log_info: friend,
        })}
        )
        .catch((err) => { console.log(err); })  
  }

  gofriendprofile = () => {
    this.props.navigation.navigate("FriendProfile", {friend_info:this.state.friend_user_info, friend_log_info:this.state.friend_log_info});
  }
  

  search_friend = () => {
    fetch(web_url + '/appServer/member/findFriend', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({search_name:this.state.search_keyword})
        })
        .then((response) => response.json())
        .then((responseJson) => {this.setState({
            friend_info: responseJson, 
        })}
        )
        .catch((err) => { console.log(err); })
  }
  render(){
      return (
        <Container style={styles.container}>
        <Text>{JSON.stringify(this.state.friend_info)} </Text>
        <Text>{JSON.stringify(this.state.search_keyword)}</Text>
        <Text>{JSON.stringify(this.state.friend_user_info)}</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="검색어를 입력하세요"
                    underlineColorAndroid='transparent'
                    onChangeText={(word) => this.setState({search_keyword: word})}/>
            </View>  
            <TouchableHighlight style={styles.button} onPress={() => this.search_friend()}>
                <Text style={{color:'#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>검색</Text>
            </TouchableHighlight>
            {this.state.friend_info && this.state.friend_info.map((friend, i) => {
              return(
            <CardItem key={i}>
            <TouchableHighlight onPress={()=>this.gofriend(friend.user_id, friend)}>
                <View>
                  <Text>{friend.user_name}</Text>
                  <Image source={{uri: web_url + friend.user_profile_pic_url}} style={{width: width / 2, height: width / 2}}/>
                </View>
            </TouchableHighlight>
            </CardItem>)
            })}
            {this.state.friend_user_info && this.gofriendprofile()}
      </Container>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#C4CACC',
  },
  header: {
    backgroundColor:'#7A7E80'
  },
  
})