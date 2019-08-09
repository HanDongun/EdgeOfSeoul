import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, TouchableHighlight, Modal, ScrollView } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Content, Container, Header, Footer } from 'native-base';

import RNFetchBlob from 'react-native-fetch-blob';
const { width, height } = Dimensions.get('window');
const web_url = 'http://52.78.132.18:8080';
export default class FriendList extends Component{
  constructor(props){
    super(props);  
    this.state = {
      user_id: this.props.navigation.getParam('user_id'),
      log_info: this.props.navigation.getParam('log_info'),
      friend_info : null,
    }
    
    this.getPost = this.getPost.bind(this);
    this.gopost = this.gopost.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.goFeed = this.goFeed.bind(this);
  }
  gopost = () => {
    if(this.state.post_change === true){
      this.props.navigation.navigate('Feed', {post_info: this.state.post_info});
    }
  }
  goFeed= () => {
    this.setState({
      modalVisible:false
    })
    this.props.navigation.navigate("FeedMap", {post_info:this.state.post_info})
    
  }
  gofriend = () => {
    RNFetchBlob.fetch('POST',  web_url + '/appServer/viewPost/' + this.state.user_id + '/' + this.state.friend_info.friend_user_id , {
      
    }, 
    ).then(res => res.json())
    .then(friend_info =>{
      this.setState({
        friend_info : friend_info,
    })}
    )
    .catch((err) => {
          console.log(err);
    })

    this.props.navigation.navigate("FriendProfile", {friend_info:this.state.friend_info});
  }
  search_friend = () => {
    
  }
  render(){
    
      return (
        <Container style={styles.container}>
          <Header style={styles.header}>
           <Left>
           <Thumbnail circular source = {{uri:web_url + this.state.log_info.user_profile_pic_url }} style={{resizeMode:'contain', flex: 1}}/>
           </Left>
            <Body>
              <Text style={{color:'#FFFFFF', fontWeight:'bold', fontSize:18}}>{this.state.log_info.user_name}</Text>
              <Text style={{color:'#FFFFFF'}}>{this.state.log_info.user_desc}</Text>
            </Body>
          </Header>
        {this.state.log_info && this.state.log_info.map((friend, i) => {
          <TouchableHighlight key={i} onPress={()=>this.gofriend(friend.friend_user_id)}>
          <Content>
            <Left>
              <Thumbnail circular source = {{uri:web_url + friend.user_profile_pic_url }} style={{resizeMode:'contain', flex: 1}}/>
            </Left>
            <Body>
              <Text style={{color:'#FFFFFF', fontWeight:'bold', fontSize:18}}>{friend.friend_user_name}</Text>
              <Text style={{color:'#FFFFFF'}}>{friend.user_desc}</Text>
            </Body>
          </Content>
        </TouchableHighlight>
        })}
        
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