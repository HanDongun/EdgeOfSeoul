import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, TouchableHighlight, Modal, ScrollView } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Content, Container, Header, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import RNFetchBlob from 'react-native-fetch-blob';
const { width, height } = Dimensions.get('window');
const web_url = 'http://52.78.132.18:8080';
export default class FriendProfile extends Component{
  constructor(props){
    super(props);  
    this.state = {
      user_id: this.props.navigation.getParam('user_id'),
      log_info: this.props.navigation.getParam('friend_log_info'),
      friend_info: this.props.navigation.getParam('friend_info'),
      post_id: null,
      post_info: null,
      title_info: null,
      post_change: null,
      modalVisible: false,
    }
    
    
  }

  getPost = (post_id) => {
    RNFetchBlob.fetch('POST',  web_url + '/appServer/viewPost/' + this.state.user_id + '/' + post_id , {
      
    }, 
    ).then(res => res.json())
    .then(post_info =>{
      this.setState({
        post_info : post_info,
        modalVisible: true,
    })}
    )
    .catch((err) => {
          console.log(err);
    })
  }
/*
  componentDidMount = () => {
    RNFetchBlob.fetch('POST',  web_url + '/appServer/appMain/' + this.state.user_id , {
      
    }, 
    ).then(res => res.json())
    .then(title => {
      
      this.setState({title_info : title})
    })
    .catch((err) => {
      console.log(err);    })
  }
*/
  gopost = () => {
    if(this.state.post_change === true){
      this.props.navigation.navigate('Feed', {post_info: this.state.post_info});
    }
  }
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      })
  }
  goFeed= () => {
    this.setState({
      modalVisible:false
    })
    this.props.navigation.navigate("FeedMap", {post_info:this.state.post_info})
    
  }
  addfriend = () => {
    fetch(web_url + '/appServer/member/addFriend/' + this.state.user_id, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({friend_id:this.state.friend_info.user_id})
        })
        .then((response) => response.json())
        .then((responseJson) => {this.setState({
            place: responseJson, 
        })}
        )
        .catch((err) => { console.log(err); })
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
          <Right>
          <TouchableHighlight onPress={() => this.addfriend()}>
          <Text>친구추가</Text>
          </TouchableHighlight>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.content}>
        <Card>
          {this.state.friend_info && this.state.friend_info.map((image, i) =>{
          return(
            <TouchableHighlight key={i} onPress={()=>this.getPost(image.post_id)}>
              <Card>
              <CardItem>
                <Body>
                <Text style={{fontSize:16}}>{image.post_title}</Text>
                </Body>
              </CardItem>
              <CardItem>
              <Body>
                <Image source={{uri: web_url + image.title_photo_url}} style={{height:350, width:320, resizeMode:'contain', flex: 1}}/>
              </Body>
              </CardItem>
                
              
              </Card>
            </TouchableHighlight>
            )}
          )}
          </Card>
          {this.state.post_info && <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible, "uri");
          }}>
          <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={() => this.goFeed()}
          style={{backgroundColor:'#547280', alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold'}}>지도로 보기</Text>
          </TouchableHighlight>
          </View>
          <ScrollView>
          <View style={{marginTop: 22}}>
            <View>
              {this.state.post_info.map((image, i) => {
                return(
                  <Card key = {i}>
                    <CardItem>
                      <Body>
                        <Text>{this.state.friend_info.photo_title}</Text>
                        <Image source={{uri: web_url + image.photo_url}} style={{height:350, width:310, resizeMode:'contain', flex: 1}}/>
                        <Text>
                        {image.photo_description}
                        </Text>  
                      </Body>
                    </CardItem>
                    </Card>           
                  )
              })}
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible, "uri");
                }}
                style={{color:'#FFFFFF', backgroundColor:'#547280', height:40, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold'}}>닫기</Text>
              </TouchableHighlight>
            </View>
          </View>
          </ScrollView>
        </Modal>}
        </Content>
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