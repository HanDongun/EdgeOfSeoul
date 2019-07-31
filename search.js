import React, {Component} from 'react';
import { Dimensions, TouchableHighlight, Modal, Image, Button, StyleSheet, Text, View, Alert, ScrollView, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Card, CardItem} from 'native-base';
const { width, height } = Dimensions.get('window');

class Search_place extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      showimage: [],
      send_photo: [],
      image_return: '',
      search_keyword:'',
      user_id : this.props.navigation.getParam('user_id'),
      place : null,
      region : {
        latitude: 37.549999,
        longitude: 126.933334,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
    this.search_place = this.search_place.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.show_placepic = this.show_placepic.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
   }
   
  setModalVisible = (visible, item_s) => {
    this.setState({
      modalVisible: visible,
      showimage: item_s,
      
      })
  }
  
  search_place = () => {
    fetch('https://487c1530.ngrok.io/appServer/findPlace', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({search_keyword:this.state.search_keyword})
    })
    .then((response) => response.json())
    .then((responseJson) => {this.setState({
        place: responseJson, 
    })}
    )
    .catch((err) => { console.log(err); })
  }

  show_placepic = () => {
    if(this.state.modalVisible===true && this.state.showimage.place_pic_url_1 === null && this.state.showimage.place_pic_url_2 === null){
      Alert.alert("이미지", "이미지가 없습니다.");
    }
    else {
      return(
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible, "url");
          }}>
          <ScrollView>
            <View>
              <Card>
                <CardItem>
                  <Image source={{uri: this.state.showimage.place_pic_url_1}} style={{height:350, width:320, resizeMode:'contain', flex: 1}}/>
                </CardItem>
                <CardItem>
                  <Image source={{uri: this.state.showimage.place_pic_url_2}} style={{height:350, width:320, resizeMode:'contain', flex: 1}}/>
                </CardItem>
              </Card>
            </View>
          </ScrollView>
        </Modal>
      )
    }
  }
  onRegionChange = () => {
    if(this.state.place !== null){
    var a = this.state.place;
    region = {latitude:Number(a[0].place_latitude), longitude:Number(a[0].place_longitude), latitudeDelta:0.0922, longitudeDelta:0.0421}

    this.setState({region:region});
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="검색어를 입력하세요"
              underlineColorAndroid='transparent'
              onChangeText={(word) => this.setState({search_keyword: word})}/>
        </View>
        <TouchableHighlight style={styles.button} onPress={() => this.search_place()}>
        <Text style={{color:'#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>검색</Text>
        </TouchableHighlight>
        {this.show_placepic()}
        <MapView  
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={
            this.state.region
          }
          region={this.state.region}
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
      {this.state.place && this.state.place.map((place, i) => {
        return(
        <Marker 
            key = {i}
            coordinate={{latitude: Number(place.place_latitude),
              longitude: Number(place.place_longitude),
            }}
            onPress = { () => this.setModalVisible(true, place)}
            title={place.place_name}
         />)
      })}
    </MapView>
      </View>
    )   
  }
}

const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject, backgroundColor:'#C4CACC' },
  map: { ...StyleSheet.absoluteFillObject, top:80 },
  image: {
    width: width / 2, height: width / 2
  },
  inputs: {
    backgroundColor:'#FFFFFF'
  },
  button: {
    backgroundColor:'#547280',
    justifyContent:'center',
    alignItems:'center'
  }
})
export default Search_place
