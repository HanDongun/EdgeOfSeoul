import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-picker'
class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user_desc: '',
        uri: null,
        user_id: this.props.navigation.getParms(user_id)
    }

    
    this.registers = this.registers.bind(this);
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
  }
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    
    ImagePicker.launchImageLibrary(options, response => {
     
     this.setState({
        uri: response.uri,
        fileName: response.fileName,
     });
     
  });}
    
    registers = () => {
        RNFetchBlob.fetch('POST',  'https://7ecc0cea.ngrok.io/member/profile_alter/' + this.state.user_id, {
                    'Content-Type': 'multipart/form-data',
        }, 
        [
        {name: 'user_profile', data: RNFetchBlob.wrap(this.state.uri)},
        {name: 'user_desc', data: this.state.user_desc}
        ]
               
        ).then((res) => {
          this.setState({
            image_return : res.json()
          })
        })
        .catch((err) => {
                        // error handling ..
        })
    }
  
  render() {
     
    return (
        
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <Button title="Choose Photo" onPress={this.handleChoosePhoto.bind(this)} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="자기소개"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(user_desc) => this.setState({user_desc : user_desc})}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
});

export default EditProfile;
 