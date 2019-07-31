import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_address: '',
      user_pwd: '',
      returnchecker:null
    }
    this.login = this.login.bind(this);
    this.gomain = this.gomain.bind(this);
  }
  login = () => {
    if(this.state.email_address.length === 0 || this.state.user_pwd.length===0){
      Alert.alert("확인", "이메일이나 비밀번호를 확인하세요.")
    }
    else{
    fetch('https://ce4c367a.ngrok.io/appServer/member/login', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({email_address: this.state.email_address, user_pwd: this.state.user_pwd})
})
.then((response) => response.json())
.then((responseJson) => {this.setState({
    returnchecker: responseJson, 
})}
)
.catch((err) => { console.log(err); })
}}

gomain = () => {
    if(this.state.returnchecker.checker===-1){
        Alert.alert("이메일 미인증", "이메일을 인증하지 않으셨습니다.",[
            {text: '확인', onPress: () => console.log('완료')},
          ])
    }
    else if(this.state.returnchecker.checker===0){
        Alert.alert("가입정보 확인", "이메일이나 비밀번호가 틀렸습니다.",[
            {text: '확인', onPress: () => console.log('완료')},
          ])
    }
    else if(this.state.returnchecker.checker>=1){
        this.props.navigation.navigate("MainS", {log_info: this.state.returnchecker, user_id: this.state.returnchecker.checker})
    }
}

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>{JSON.stringify(this.state.returnchecker)} </Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email_address: email, returnchecker: null})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({user_pwd: password, returnchecker: null})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.login()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('FindPwd')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
            <Text>Register</Text>
        </TouchableHighlight>
        {this.state.returnchecker && this.gomain()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default Login;
 