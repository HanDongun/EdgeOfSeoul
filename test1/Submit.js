import React from 'React'
import { TouchableOpacity, TextInput, View, Dimensions, StyleSheet, Text, ScrollView, TouchableHighlight, Image, Button } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import MapTest from './Map.js'
const { width, height } = Dimensions.get('window');
class Submit extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          title: '',
          description: '',
          uri: null,
          images: this.props.navigation.getParam('images'),
          imagereturn: []
      }
      this.handleTitle = this.handleTitle.bind(this)
      
  }
  
  handleTitle = text => {
    this.setState({ title: text });
  };
 
  handleDescription = text => {
    this.setState({ description: text });
  };  

  makeTitle= (i) => {
      this.setState({ uri: i.uri });
  }
  componentDidMount = () =>{
      if (this.state.images.didCancel) {
            }
            else if (this.state.images.error) {
            }
            else if (this.state.images.customButton) {
            }
            else {
        RNFetchBlob.fetch('POST',  'https://0ff84670.ngrok.io/spring01/upreturn', {
            'Content-Type': 'multipart/form-data',
        }, 
        this.state.images  
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
  }
  
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const uri = navigation.getParam('images');
    return (
        <View>
        <Button
          title="Map"
          onPress={() => this.props.navigation.navigate('Map', {images: this.state.images})}
        />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text>{JSON.stringify(this.state.images)}</Text>
        <Text>{JSON.stringify(this.state.imagereturn)}</Text>
        {this.state.imagereturn &&
          this.state.imagereturn.map((image, i) => {
            return (
              <Image key={i}
                  style={styles.image}
                  source={{ uri: 'https://0ff84670.ngrok.io' + image.url }}
                />
              
              
            )
          })
        }
        
        
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="제목"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleTitle}
        />
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="내용"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleDescription}
        />
        
          
          {
            uri.map((uri, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  onPress={() => this.makeTitle(uri)}
                  underlayColor='transparent'
                >
                  <Image
                    style={styles.image}
                    source={{ uri: uri.uri }}
                  />
                </TouchableHighlight>
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
    borderColor: "#7a42f4",
    borderWidth: 3
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
export default Submit