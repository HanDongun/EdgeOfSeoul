import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Content, Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default class Feed extends Component{
  constructor(props){
    super(props);  
    this.state = {
     // log_info: this.props.navigation.getParam('log_info'),
      post_id: '',
      post_info: this.props.navigation.getParams('post_info')
      //photo_id, photo_description, photo_url, photo_latitude, photo_longitude null 처리
    }
    this.gomap = this.gomap.bind(this);
  }

  gomap = () => {
    this.props.navigation.navigate('FeedMap', {post_info: this.state.post_info});
  }
  render(){
      return (
        <Container>    
        <TouchableHighlight onPress={()=>this.gomap()}>
          <Text>지도로 보기</Text>
        </TouchableHighlight>
        <Content>
          {this.state.post_info && this.state.post_info.map((image, i) => {
            <Card>
            <CardItem key={i}>
              <Body>
                <Image source={{uri : 'https://487c1530.ngrok.io/appServer' + image.photo_url}} style={{height:350, width:320, resizeMode:'contain', flex: 1}}/>
                <Text>
                {image.photo_description}
                </Text>
              </Body>
            </CardItem>
            </Card>
            })}
          </Content>
          <Button title="지도" onPress={()=>this.gomap()}></Button>
      </Container>
      );
    }
  }