import React, {Component} from 'react';
import { Dimensions, TouchableHighlight, Modal, Image, Button, StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import RNFetchBlob from 'react-native-fetch-blob'

const { width, height } = Dimensions.get('window');

class MapTest extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      showimage: [],
      send_photo: [],
      image_return: '',
      user_id : this.props.navigation.getParam('user_id')
    }
    this.complete = this.complete.bind(this);
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
  
  complete = () => {
    var final = this.state.images;
    this.state.imagedesc.map(image => {
      final.push(image);
    })
    this.state = {
      send_photo : final
    }
    RNFetchBlob.fetch('POST',  'https://e410ee5c.ngrok.io/spring01/up/' + this.state.user_id , {
                    'Content-Type': 'multipart/form-data',
        }, 
        this.state.send_photo
               
        ).then((res) => {
          this.setState({
            image_return : res.json()
          })
        })
        .catch((err) => {
                        // error handling ..
        })
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
    const { navigation } = this.props;
    const uri = navigation.getParam('images');
    return (
      <View style={styles.container}>
        {this.image_return && this.check_send()}
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
        </Modal>
        <View style={{flex:1, justifyContent:'flex-start'}}>
        <Button title="완료" onPress={() => this.complete()}>
        </Button>
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
      {this.state.imagedesc.map((image, i) => {
        return(
        <Marker 
            key = {i}
            coordinate={{latitude: image.latitude,
              longitude: image.longitude,
            }}
            onPress = { () => this.setModalVisible(true, image.latitude, image.longitude)}
            title = {JSON.stringify(image)}
         />)
      })}
        </MapView>
      </View>
    )   
  }
}
const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject, top:25 },
  image: {
    width: width / 2, height: width / 2
  },

})
export default MapTest
