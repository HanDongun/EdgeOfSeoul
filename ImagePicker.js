import React, { Component } from 'react';
import { Platform, View, Text, Image, Button, TouchableOpacity, ScrollView, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import Submit from './Submit.js'

const { width, height } = Dimensions.get('window');
class ImagePickers extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      images: [],
      uri: null ,
      latitude: '',
      longitude: '',
      imagereturn: [],
      fileName: '',
    }
    this.handleDelete = this.handleDelete.bind(this);    
    this.ComponentDidMount = this.ComponentDidMount.bind(this);
  }
  
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    
    ImagePicker.launchImageLibrary(options, response => {
     const data = new FormData();
     this.setState({
        uri: response.uri,
        longitude: response.longitude,
        latitude: response.latitude,
        fileName: response.fileName,
     });
     
  var a = this.state.images
  a.push({ name: 'file', filename: this.state.fileName, data: RNFetchBlob.wrap(this.state.uri), _uri:this.state.uri, latitude:this.state.latitude, longitude:this.state.longitude});
  this.setState({
    images : a
  })

  });}
  
  ComponentDidMount = () =>{
  if (this.state.uri.didCancel) {
            }
            else if (this.state.uri.error) {
            }
            else if (this.state.uri.customButton) {
            }
            else {
                let source = { uri: this.state.uri }
                RNFetchBlob.fetch('POST',  'https://e410ee5c.ngrok.io/spring01/up', {
                    'Content-Type': 'multipart/form-data',
                }, 
                this.state.images
               
                ).then((res) => {
                    })
                    .catch((err) => {
                        // error handling ..
                    })
                this.setState({
                    imagereturn: source
                });
            }
  }
  
  handleDelete = itemId => {
    const items = this.state.images.filter(item => item !== itemId);
    this.setState({ images: items });
  };
  
  
  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Choose Photo" onPress={this.handleChoosePhoto.bind(this)} /> 
      <Button
          title="submit"
          onPress={() => this.props.navigation.navigate('Submit', {images: this.state.images})}
        />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {this.state.images &&
            this.state.images.map((image, i) => {
              return (
                
                <TouchableHighlight
                  key={i}
                  onPress={() => this.handleDelete(image)}
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
      </View>
    )
  }
}

styles = StyleSheet.create({
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
  }
})

export default ImagePickers;