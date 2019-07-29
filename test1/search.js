import React, {Component} from 'react';
import { Dimensions, TouchableHighlight, Modal, Image, Button, StyleSheet, Text, View, Alert, ScrollView, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import RNFetchBlob from 'react-native-fetch-blob'

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
      place : null
    }
    this.search_place = this.search_place.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.check_send = this.check_send.bind(this);
   }
   
  setModalVisible = (visible, latitude, longitude) => {
    const items = this.state.imagedesc.filter(item => (item.latitude === latitude) && (item.longitude === longitude));
    this.setState({
      modalVisible: visible,
      showimage: items
      })
  }
  
  search_place = () => {
    fetch('https://15f93a33.ngrok.io/appServer/member/login', {
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
  

  check_send = () => {
    if(image_return ===1){
      this.props.navigation.navigate('Home', {user_id: this.state.user_id})
    }
    else {
      Alert.alert("완료되지 않았습니다.")
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
        <Button title="완료" onPress={() => this.search_place()}>
        </Button>
        {/*
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ScrollView>
          <View style={{marginTop: 22}}>
            <View>
              <Text>{JSON.stringify(this.state.send_photo)}</Text>
              {this.state.imagedesc.map((image, i) => {
                return(
                  <View>
                    <Image key={i}
                      style={styles.image}
                      source={{ uri: image._uri }}
                    />
                   <Text key={image}>
                    {image.desc}
                    </Text>
                  </View>
                )
              })}
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible, uri);
                }}>
                <Text>닫기</Text>
              </TouchableHighlight>
            </View>
          </View>
          </ScrollView>
            </Modal>*/}
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
      {this.state.place && this.state.place.map((place, i) => {
        return(
        <Marker 
            key = {i}
            coordinate={{latitude: place.latitude,
              longitude: place.longitude,
            }}
            onPress = { () => this.setModalVisible(true, place.latitude, place.longitude)}
            title = {JSON.stringify(place.title)}
         />)
      })}
        </MapView>
      </View>
    )   
  }
}

const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject, top:60 },
  image: {
    width: width / 2, height: width / 2
  },

})
export default Search_place
