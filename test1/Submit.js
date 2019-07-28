import React from 'React'
import { TouchableOpacity, TextInput, View, Dimensions, StyleSheet, Text, ScrollView, TouchableHighlight, Image, Button } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'

const { width, height } = Dimensions.get('window');
class Submit extends React.Component {
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
      this.makeTitle = this.makeTitle.bind(this);
      this.handleTitleDescription = this.handleTitleDescription.bind(this);
      this.showTitle = this.showTitle.bind(this);
      this.goMap = this.goMap.bind(this);
  }
  
  handleTitle = text => {
    this.setState({ photo_title: text });
  };
 
  handleTitleDescription = (text) =>{
    this.setState({title_desc:text})
  }
  handleDescription = (text, image) => {
    var b = this.state.imagedesc;
    b.map((find) => {
      if(find===image){
        find.desc = text
      }
      return (b)
    })
    this.setState({ imagedesc: b });
    
  };
  goMap = () => {
    var i = this.state.images
    i.push({name : 'photo_title', data:JSON.stringify({photo_title:this.state.photo_title, title_desc:this.state.title_desc, _uri:this.state.uri})})
    this.setState = {
      images: i
    }
    this.props.navigation.navigate('Map', {images: this.state.images, imagedesc: this.state.imagedesc, user_id: this.state.user_id})
  }  

  makeTitle= (i) => {
      this.setState({ uri: i.uri });
  }

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

  /*
  componentDidMount = () =>{
      if (this.state.images.didCancel) {
            }
            else if (this.state.images.error) {
            }
            else if (this.state.images.customButton) {
            }
            else {
        RNFetchBlob.fetch('POST',  'https://331d8d98.ngrok.io/appServer/postUpload/1', {
            'Content-Type': 'multipart/form-data',
        },this.state.images
        //this.state.images  
        )
        .uploadProgress((written, total) => {
          console.log('uploaded', written / total)
        })
        .progress((received, total) => {
          console.log('progress', received / total)
        })
        .then((res) => {
            this.setState({
            imagereturn: res.json()
            });
        })
        .catch((err) => {
                    // error handling ..
        })
                
        }
  }*/
  
  render() {
    return (
        <View style={{justifyContent:'center'}}>
        <Button
          title="Map"
          onPress={() => this.goMap()}
        />
        <Text>{JSON.stringify(this.state.imagedesc)}</Text>
        <ScrollView centerContent = {true} contentContainerStyle={styles.scrollContainer}>
        
        
        <View>
        
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="여행일지 제목"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleTitle}
        />
        </View>
        <View>
        {this.showTitle()}
        </View>
        <View>
        <TextInput
          multiline={true}
          numberOfLines={5}
          style={styles.descinput}
          underlineColorAndroid="transparent"
          placeholder="내용"
          placeholderTextColor="white"
          autoCapitalize="none"
          onChangeText={this.handleTitleDescription}
        />
        </View>
        {this.state.imagedesc &&
          this.state.imagedesc.map((image, i) => {
            return (
              <View key={i}>
              <TouchableHighlight
                  key={i}
                  onPress={() => this.makeTitle(image._uri)}
                  underlayColor='transparent'
                >
                  <Image
                    style={styles.image}
                    source={{ uri: image._uri }}
                  />
                </TouchableHighlight>
                <TextInput
                multiline={true}
                numberOfLines={5}
                style={styles.descinput}
                underlineColorAndroid="transparent"
                placeholder="내용"
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={(text) => this.handleDescription(text, image)}
              />
              </View>
            )
          })
        }
        
        
        </ScrollView>
        </View>
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
export default Submit