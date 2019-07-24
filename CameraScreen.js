import React, { Component } from 'react';
import {
  
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';

import ViewPhotos from './ViewPhotos';
import CameraRoll from "@react-native-community/cameraroll";
class CameraScreen extends Component {

  state = {
    showPhotoGallery: false,
    photoArray: []
  }

  getPhotosFromGallery() {
    CameraRoll.getPhotos({ first: 1000000 })
      .then(res => {
        let photoArray = res.edges;
        this.setState({ showPhotoGallery: true, photoArray: photoArray })
      })
  }

  render() {
    if (this.state.showPhotoGallery) {
      return (
        <ViewPhotos
          photoArray={this.state.photoArray} />
      )
    }
    return (
      <View style={styles.container}>

        <TouchableHighlight
          onPress={() => this.getPhotosFromGallery()}>
          <Text>
          touch
           </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CameraScreen;