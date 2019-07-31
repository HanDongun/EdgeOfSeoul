import React, {Component} from 'react';
import { Dimensions, TouchableHighlight, Modal, Image, Button, StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Card, CardItem, Thumbnail, Body, Left, Right, Content, Container, Header } from 'native-base';
const { width, height } = Dimensions.get('window');

class FeedMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      region: [],
      images: this.props.navigation.getParam('post_info'),
      modalVisible: false,
      showimage: [],

       //photo_id, photo_description, photo_url, photo_latitude, photo_longitude null 처리
    }
    this.setModalVisible = this.setModalVisible.bind(this);
    
   }
   
   setModalVisible = (visible, latitude, longitude) => {
    var a = this.state.images;
    const items = a.filter(item => (item.photo_latitude === latitude) && (item.photo_longitude === longitude));
    var b = items;
    const items2 = b.filter(item => (item.photo_latitude !== null) || (item.photo_latitude !== ''));
    this.setState({
      modalVisible: visible,
      showimage: items2
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible, "uri");
          }}>
          <ScrollView>
          <View style={{marginTop: 22}}>
            <View>
              {this.state.showimage.map((image, i) => {
                return(
                  <Card key = {i}>
                    <CardItem>
                      <Body>
                        <Image source={{uri: 'https://487c1530.ngrok.io' + image.photo_url}} style={{height:350, width:310, resizeMode:'contain', flex: 1}}/>
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
        </Modal>
        <View style={{flex:1, justifyContent:'flex-start'}}>
        </View>
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
      {this.state.images.map((image, i) => {
        return(
        <Marker 
            key = {i}
            coordinate={{latitude: Number(image.photo_latitude),
              longitude: Number(image.photo_longitude),
            }}
            onPress = { () => this.setModalVisible(true, image.photo_latitude, image.photo_longitude)}
         />)
      })}
        </MapView>
      </View>
    )   
  }
}
const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject},
  image: {
    width: width / 2, height: width / 2
  },
})
export default FeedMap
