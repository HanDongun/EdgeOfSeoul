import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Content, Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default class Profile extends Component{
  constructor(props){
    super(props);  
    //this.state = {
     // log_info: this.props.navigation.getParam('log_info')
      
    //}
  
  }
  render(){
      return (
        <Container>    
        <Content>
          <Card >
            <CardItem style={{flex:1}}>
            <Right>
            <Icon name="ios-person" size={60} color="black" />
              {/*{this.state.long_info && <Text>{this.state.log_info.user_name}</Text>}*/}
              <Text note>정보</Text>
            <Button bordered onPress={()=>this.props.navigation.navigate('EditProfile', {/*{user_id: this.state.log_info.user_id}*/})}>
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