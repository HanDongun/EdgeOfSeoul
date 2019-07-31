import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, TouchableHighlight, Modal, ScrollView } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Content, Container, Header, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import RNFetchBlob from 'react-native-fetch-blob';
const { width, height } = Dimensions.get('window');

export default class Profile extends Component{
  constructor(props){
    super(props);  
    this.state = {
      user_id: this.props.navigation.getParam('user_id'),
      log_info: this.props.navigation.getParam('log_info'),
      post_id: null,
      post_info: null,
      title_info: null,
      post_change: null,
      modalVisible: false,
    }
    
    this.getPost = this.getPost.bind(this);
    this.gopost = this.gopost.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.goFeed = this.goFeed.bind(this);
  }

  getPost = (post_id) => {
    RNFetchBlob.fetch('POST',  'https://ce4c367a.ngrok.io/appServer/viewPost/' + this.state.user_id + '/' + post_id , {
      
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

  componentDidMount = () => {
    RNFetchBlob.fetch('POST',  'https://ce4c367a.ngrok.io/appServer/appMain/' + this.state.user_id , {
      
    }, 
    ).then(res => res.json())
    .then(title => {
      
      this.setState({title_info : title})
    })
    .catch((err) => {
      console.log(err);    })
  }

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
  render(){
    
      return (
        <Container>
        <Header>
          <Body>
          {/* <Thumbnail source={require('./Image/Sebs.png')} onPress={()=>alert("Good")}/> */}
          <Text>{this.state.log_info.user_name}</Text>
          </Body>
        </Header>
        <Content>
        <Card>
          {this.state.title_info && this.state.title_info.map((image, i) =>{
          return(
            <TouchableHighlight key={i} onPress={()=>this.getPost(image.post_id)}>
              <CardItem>
                <Body>
                <Text>{image.post_title}</Text>
                <Image source={{uri: 'https://ce4c367a.ngrok.io' + image.title_photo_url}} style={{height:350, width:320, resizeMode:'contain', flex: 1}}/>
                </Body>
              </CardItem>
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
          <TouchableHighlight onPress={() => this.goFeed()}>
            <Text>지도로 보기</Text>
          </TouchableHighlight>
          <ScrollView>
          <View style={{marginTop: 22}}>
            <View>
              {this.state.post_info.map((image, i) => {
                return(
                  <Card key = {i}>
                    <CardItem>
                      <Body>
                        <Text>{this.state.title_info.photo_title}</Text>
                        <Image source={{uri: 'https://ce4c367a.ngrok.io' + image.photo_url}} style={{height:350, width:310, resizeMode:'contain', flex: 1}}/>
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
                }}>
                <Text>닫기</Text>
              </TouchableHighlight>
            </View>
          </View>
          </ScrollView>
        </Modal>}
        </Content>
        <Footer>
          <Text>테스트</Text>
        </Footer>
      </Container>
        
      );
    }
  }

const styles = StyleSheet.create({
  content: {

  }
})