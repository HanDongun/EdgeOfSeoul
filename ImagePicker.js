import React, { Component } from 'react';
import { Platform, View, Text, Image, Button, TouchableOpacity, ScrollView, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'

import {Container, Header, Content, Footer, Title} from 'native-base';

const { width, height } = Dimensions.get('window');
class ImagePickers extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      images: [],
      uri: null ,
      fileName: '',
      imagedesc: [],
      longitude: '',
      latitude: '',
      user_id : this.props.navigation.getParam('user_id')
    }
    this.handleDelete = this.handleDelete.bind(this);    
    this.go = this.go.bind(this);
  }
  
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    
    ImagePicker.launchImageLibrary(options, response => {
     this.setState({
        uri: response.uri,
        longitude: response.longitude,
        latitude: response.latitude,
        fileName: response.fileName,
     });
     
  var a = this.state.images
  var b = this.state.imagedesc
  a.push({ name: 'file', filename: this.state.fileName, data: RNFetchBlob.wrap(this.state.uri), _uri:this.state.uri});
  b.push({ name: 'desc', data: '', _uri: this.state.uri, latitude: this.state.latitude, longitude: this.state.longitude})
  this.setState({
    images : a,
    imagedesc : b
  })

  });}
  
  
  handleDelete = itemId => {
    const items = this.state.images.filter(item => item._uri !== itemId);
    const items2 = this.state.imagedesc.filter(item => item._uri !== itemId);
    this.setState({ images: items, imagedesc: items2 });
  };
  go = () => {
  RNFetchBlob.fetch('POST',  'https://15f93a33.ngrok.io/appServer/postUpload/1'  /*+this.state.user_id*/ , {
                    'Content-Type': 'multipart/form-data',
        }, 
        [{ name: 'file', filename: this.state.fileName, data: RNFetchBlob.wrap(this.state.uri), _uri:this.state.uri},
          
        { name: 'desc', data: 'abasdflk;j', _uri: this.state.uri, latitude: this.state.latitude, longitude: this.state.longitude},
        { name: 'photo_title', data: 'alskdfja;lskdjf'}]      
        ).then((res) => {
          this.setState({
            image_return : res.json()
          })
        })
        .catch((err) => {
                        // error handling ..
        })
      }
  render() {
    
    return (
      <Container style={styles.container}>
      <Header style={styles.header}>
        
          <TouchableHighlight onPress={this.handleChoosePhoto.bind(this)}>
          <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold'}}>ChoosePhoto</Text>
          </TouchableHighlight> 
        
      </Header>
      <Content contentContainerStyle={styles.content}>
    
      

      <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {this.state.images &&
            this.state.images.map((image, i) => {
              return (
                
                <TouchableHighlight
                  key={i}
                  onPress={() => this.handleDelete(image._uri)}
                  underlayColor='transparent'
                >
                 <Image
                    style={styles.image}
                    source={{ uri: image._uri }}
                  />
                </TouchableHighlight>
              )
            })
          }
        </ScrollView>
      </Content>
      <Footer style={styles.footer}>
        <TouchableHighlight
        style={styles.button}
        onPress={() => this.props.navigation.navigate('Submit', {images: this.state.images, imagedesc: this.state.imagedesc, user_id: this.state.user_id})}
        >
        <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold'}}>일지 작성</Text>
        </TouchableHighlight>
      </Footer>
      </Container>
    )
  }
}

styles = StyleSheet.create({
  container: {

  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  footer: {
    height:'15%',
    backgroundColor: '#547280'
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  centerLoader: {
    height: height - 100,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: width / 2, height: width / 2
  },
  title: {
    textAlign: 'center',
    padding: 20
  },
  button: {
    backgroundColor:'#547280',
    justifyContent:'center',
    alignItems: 'center',
    height:'15%'
  },
})

export default ImagePickers;