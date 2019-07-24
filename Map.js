import React, {Component} from 'react';

import { Dimensions, TouchableHighlight, Modal, Image, TouchableOpacity, Platform, StyleSheet, Text, View, Alert } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import DisplayModal from './DisplayModal.js'
const { width, height } = Dimensions.get('window');
class MapTest extends Component {
  constructor(props){
    super(props);
    this.state = {
      region: [],
      images: [],
      modalVisible: false,
      showimage: []
    }
    
    this.setModalVisible = this.setModalVisible.bind(this)
   }
  
  setModalVisible = (visible, itemId) => {
    this.setState({
      modalVisible: visible,
      showimage: itemId._uri
      })
  }
  
  onRegionChange(region){
    this.setState({
      latitude: 37.335887,
      longitude: 126.584063,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  }
  render () {
    const { navigation } = this.props;
    const uri = navigation.getParam('images');
    return (
      <View style={styles.container}>
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>{JSON.stringify(this.state.showimage)}</Text>
              <Image
                    style={styles.image}
                    source={{ uri: this.state.showimage }}
              />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible, uri);
                }}>
                <Text>{JSON.stringify(this.state.images)} abc</Text>
                
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <MapView  
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 37.549999,
            longitude: 126.933334,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          >
          
          <MapView.Circle
        center={{
          latitude: 37.549999,
          longitude: 126.933334,
        }}
        radius={20}
        strokeWidth={2}
        strokeColor="#3399ff"
        fillColor="#80bfff"
      />
      {uri.map((image, i) => {
        return(
        <Marker 
            key = {i}
            coordinate={{latitude: image.latitude,
              longitude: image.longitude,
            }}
            onPress = { () => this.setModalVisible(true, image)}
            title = {JSON.stringify(image)}
         />)
      })}
      
      {/*<DisplayModal 
            image = { this.state.showimage }
            display = { this.state.display }
          />
      */}
      {/*}
            <Polygon
                coordinates={[
                    { latitude: 37.8025259, longitude: -122.4351431 },
                    { latitude: 37.7896386, longitude: -122.421646 },
                    { latitude: 37.7665248, longitude: -122.4161628 },
                    { latitude: 37.7734153, longitude: -122.4577787 },
                    { latitude: 37.7948605, longitude: -122.4596065 },
                    { latitude: 37.8025259, longitude: -122.4351431 }
                ]}
                fillColor = 'red'
                strokeColor="black" // fallback for when `strokeColors` is not supported by the map-provider
            
                strokeWidth={6}
            />*/}
            
        </MapView>
      </View>
    )   
  }
}
const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject },
  image: {
    width: width / 2, height: width / 2
  },

})
export default MapTest
