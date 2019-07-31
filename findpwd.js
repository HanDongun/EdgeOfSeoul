import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
} from 'react-native';

class FindPwd extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user_name: '',
        email_address: '',
        check: '',
    }
    this.showpwd = this.showpwd.bind(this);
    this.registers = this.registers.bind(this);
  }


    
    registers = () => {
        fetch(web_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_name: this.state.name, email_address: this.state.email})
    })
    .then((response) => response.json())
    .then((responseJson) => this.setState({
        check: responseJson,
    })
    )
    .catch((err) => { console.log(err); })
    }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  showpwd = () => {
    if(this.state.check.checker === "1"){
        return(<Text>"입력하신 이메일로 비밀번호가 전송되었습니다."</Text>);
    }
    else if(this.state.check.checker === "0"){
        return(<Text>입력하신 정보와 일치하는 정보가 없습니다."</Text>);
    }
}  

  render() {
     
    return (
        
      <View style={styles.container}>
      <Text>이름과 이메일을 입력하세요.</Text>
        <View style={styles.inputContainer}>
          
        <TextInput style={styles.inputs}
          placeholder="Name"
          underlineColorAndroid='transparent'
          onChangeText={(name) => this.setState({user_name : name})}/>
        </View>
      
      
        <View style={styles.inputContainer}>
          
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email_address : email,
           })}/>
              
        </View>
        
        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.registers()}>
          <Text>완료</Text>
      </TouchableHighlight>
      {this.showpwd()}
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
  }
});

export default FindPwd;
 
