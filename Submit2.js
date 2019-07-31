import React from 'React'
import { TouchableOpacity, TextInput, View, Dimensions, StyleSheet, Text, ScrollView, TouchableHighlight, Image, Alert } from 'react-native'
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Content, Container, Header } from 'native-base';

const { width, height } = Dimensions.get('window');
class Submit2 extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          photo_title: '',
          photo_description: '',
          uri: null,
          images: this.props.navigation.getParam('images'),
          imagedesc: this.props.navigation.getParam('imagedesc'),
          title_desc:'',
          user_id : this.props.navigation.getParam('user_id')

      }
      this.handleTitle = this.handleTitle.bind(this);
      this.handleDescription = this.handleDescription.bind(this); 
      this.goMap = this.goMap.bind(this);
  }
  
  handleTitle = text => {
    this.setState({ photo_title: text });
  };
  handleDescription = (text, image) => {
    var b = this.state.imagedesc;
    b.map((find) => {
      if(find===image){
        find.data = text
      }
      return (b)
    })
    this.setState({ imagedesc: b });
  };
  
  goMap = () => {
    if(this.state.photo_title.length===0){
      Alert.alert("여행일지 제목", "여행일지의 제목을 입력해주세요.");
    }
    else{
    var i = this.state.images
    i.push({name : 'photo_title',  data:this.state.photo_title})
    this.setState = {
      images: i
    }
    this.props.navigation.navigate('Map', {images: this.state.images, imagedesc: this.state.imagedesc, user_id: this.state.user_id})
  }  }

  showTitle= () => {
    if(this.state.uri === null){
      a = this.state.images;
      return (
        <Image
        style = {styles.image}
        source = {{uri: a[0]._uri}}
        />)
    }
    else {
      return (
        <Image
            style = {styles.image}
            source = {{uri: this.state.uri}}
            />
      )
    }
  }
  
  render() {
    return (
      <Container>
        <Card>
          <TouchableOpacity
            onPress={() => this.goMap()}
            >
          <Text>Map</Text>
          </TouchableOpacity>
          </Card>
        <Content>
          
          <Card>
            <CardItem>
              <Body>
                <TextInput
                placeholder="여행일지 제목"
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={this.handleTitle}
                />
              </Body>
            </CardItem>
        </Card>
        {this.state.imagedesc &&
          this.state.imagedesc.map((image, i) => {
            return (
            <Card key = {i}>
              <CardItem>
              <Body>
                <Image source={{uri: image._uri}} style={{height:350, width:310, resizeMode:'contain', flex: 1}}/>
                <TextInput
                multiline={true}
                numberOfLines={5}
                placeholder="내용"
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={(text) => this.handleDescription(text, image)}/>
              </Body>
              </CardItem>
            </Card>              
            )
          })
        }
        </Content>
      </Container>
    );
  }
}
styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    

  },
  input: {
    margin: 15,
    height: 40,
    width: width-30,
    borderColor: "black",
    borderWidth: 1
  },
  descinput: {
    margin: 15,
    height: 160,
    width : width-30,
    borderColor: "black",
    borderWidth: 1
  },
  
  centerLoader: {
    height: height - 100,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: width, height: 200
  },
  titleimage:{
    width: width, height: 200
  },
  title: {
    textAlign: 'center',
    padding: 20
  }
})
export default Submit2