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
      images2: []
    }
    this.handleDelete = this.handleDelete.bind(this);    
    
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
  a.push({ name: 'file', filename: this.state.fileName, data: RNFetchBlob.wrap(this.state.uri), location:JSON.stringify({_latitude:this.state.latitude, _longitude:this.state.longitude})});
  //a.push({ name: 'file', filename: this.state.fileName, data: {photo:RNFetchBlob.wrap(this.state.uri), location:JSON.stringify({_latitude:this.state.latitude, _longitude:this.state.longitude})}});
  this.setState({
    images : a
  })
  var b = this.state.images2
  });}
  
 
  
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