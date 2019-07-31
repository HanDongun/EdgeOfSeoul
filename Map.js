import React, {Component} from 'react';
import { Dimensions, TouchableHighlight, Modal, Image, Button, StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import RNFetchBlob from 'react-native-fetch-blob';
import { Card, CardItem, Thumbnail, Body, Left, Right, Content, Container, Header } from 'native-base';

const { width, height } = Dimensions.get('window');

class MapTest extends Component {
  constructor(props){
    super(props);
    this.state = {
      region: [],
      images: this.props.navigation.getParam('images'),
      imagedesc: this.props.navigation.getParam('imagedesc'),
      modalVisible: false,
      showimage: [],
      send_photo: [],
      image_return: null,
      user_id : this.props.navigation.getParam('user_id')
    }
    this.complete = this.complete.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.goHome = this.goHome.bind(this);
   }
   
  setModalVisible = (visible, latitude, longitude) => {
    var a = this.state.imagedesc;
    const items = a.filter(item => (item.latitude === latitude) && (item.longitude === longitude));
    var b = items;
    const items2 = b.filter(item => (item.latitude !== null) || (item.latitude !== ''));
    this.setState({
      modalVisible: visible,
      showimage: items2
      })
  }
  
  componentDidMount = () => {
    var final = this.state.images;
    final.push(...this.state.imagedesc);
    this.setState({ send_photo: final})
  }
  complete = () => {
    RNFetchBlob.fetch('POST',  'https://487c1530.ngrok.io/appServer/postUpload/' + this.state.user_id , {
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

  goHome = () => {
    if(this.state.image_return.checker === 1){
      this.props.navigation.navigate('Home', {user_id: this.state.user_id})
    }
  }


  render () {
    return (
      <Container style={{backgroundColor:'#C4CACC'}}>
      <Header style={styles.header}>
        <TouchableHighlight onPress={() => this.complete()}>
        <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold'}}>완료</Text>
        </TouchableHighlight>
      </Header>

      <View style={styles.modalContainer}>
      
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
              {this.state.imagedesc.map((image, i) => {
                return(
                  <Card key = {i}>
                    <CardItem>
                      <Body>
                        <Image source={{uri: image._uri}} style={{height:350, width:310, resizeMode:'contain', flex: 1}}/>
                        <Text>
                        {image.data}
                        </Text>  
                      </Body>
                    </CardItem>
                    </Card>           
                  )
              })}
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible, "uri");
                }}
                style={styles.modalButton}>
                <Text style={{fontSize:20, color:'#FFFFFF'}}>닫기</Text>
              </TouchableHighlight>
            </View>
          </View>
          </ScrollView>
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
      {this.state.imagedesc.map((image, i) => {
        return(
        <Marker 
            key = {i}
            coordinate={{latitude: image.latitude,
              longitude: image.longitude,
            }}
            onPress = { () => this.setModalVisible(true, image.latitude, image.longitude)}
         />)
      })}
        </MapView>
        
        {this.state.image_return && this.goHome()}
      </View>
      </Container>
    );   
  }
}
const styles = StyleSheet.create({
  
  modalContainer: { ... StyleSheet.absoluteFillObject, },
  map: { ...StyleSheet.absoluteFillObject, top:80 },
  image: {
    width: width / 2, height: width / 2
  },
  header: {
    backgroundColor: '#547280',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#547280'
  }
})
export default MapTest
