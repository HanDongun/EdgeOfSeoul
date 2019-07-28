import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Content, Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default class Profile extends Component{
  constructor(props){
    super(props);  
    this.state = {
      user_id : this.props.navigation.getParam('user_id')
    }
  
  }
  render(){
      return (
        <Container>    
        <Content>
          <Card >
            <CardItem style={{flex:1}}>
            <Right>
            <Icon name="ios-person" size={60} color="black" />
              <Text>이름</Text>
              <Text note>정보</Text>
            <Button bordered onPress={()=>this.props.navigation.navigate('EditProfile')}>
              <Text>
                프로필 편집
              </Text>
            </Button>
              </Right>
            </CardItem>
            
          </Card>
        </Content>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Title</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <TouchableOpacity> 
              <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
              <Text>
              Your text here
              </Text>
            </TouchableOpacity>  
            </CardItem>
          </Card>
          </Content>
      </Container>
      );
    }
  }