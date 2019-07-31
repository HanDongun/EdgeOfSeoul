//가입 화면
import React, {Component} from 'react';
import {ScrollView, StyleSheet, TextInput, View, Image, TouchableHighlight, Alert} from 'react-native';
import {Container, Header, Content, Left, Right, Title, Subtitle, Body, Button, Icon, Item, Input, Text} from 'native-base';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            email_address: '',
            user_pwd: null,
            check: null,
            returnEmail: '',
            pwd_length: ''
        }
    
        this.doublecheck = this.doublecheck.bind(this);
        this.registers = this.registers.bind(this);
        this.printchecker = this.printchecker.bind(this);
        this.showregister = this.showregister.bind(this);
        this.savepwd = this.savepwd.bind(this);
      }
    
        doublecheck = () => {
          if(this.state.email_address.length===0){
            Alert.alert("이메일 입력", "이메일을 입력하세요.");
          } 
          else {
            fetch('https://ce4c367a.ngrok.io/appServer/member/checkEmail', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({email_address: this.state.email_address})
        })
        .then((response) => response.json())
        .then((responseJson) => this.setState({
            check: responseJson,
        })
        )
        .catch((err) => { console.log(err); })
        }
      }
        registers = () => {
            fetch('https://ce4c367a.ngrok.io/appServer/member/signIn', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({user_name: this.state.user_name, email_address: this.state.email_address, user_pwd: this.state.user_pwd})
        })
        .then((response) => response.json())
        .then((responseJson) => {this.setState({
            returnEmail: responseJson,
            
        }), Alert.alert(
            '회원가입',
            '회원가입이 완료되었습니다. 등록한 이메일로 들어가서 완료버튼을 누른 후 로그인이 가능합니다.',
            [
              {text: '완료', onPress: () => this.props.navigation.navigate('Home')},
            ],
            {cancelable: false},
          ); }
        
        )
        .catch((err) => { console.log(err); })
        }
    
    
      printchecker = () => {
        if(this.state.check.checker === 0){
            
            return( <Text style={styles.submitButton}>중복</Text>)
        } else if(this.state.check.checker === 1){
            return( <Text style={styles.submitButton}>사용가능</Text> )
        }
      }
    
      showregister = () => {
          if(this.state.check.checker === 1){
              return(  <TouchableHighlight style={styles.buttonContainer} onPress={()=>this.registers()}>
              <Text>회원가입</Text>
            </TouchableHighlight>)
          }
      }
    
      pwdchecker = () => {
          if(this.state.user_pwd.length <8) {
              return (<Text>8자리 이상 입력해주세요.</Text>)
          }
          else if(this.state.user_pwd.length >=8){
              return (<Text>사용 가능한 비밀번호입니다. </Text>)
          }
      }
      
      savepwd = (password) => {
        this.setState({user_pwd : password})
        if(this.state.user_pwd && this.state.user_pwd.length===0){
            this.setState({user_pwd: null});
        }
      }

    render() {
        return(
            <Container style={styles.container}>
                <Header span style={styles.header}>
                  <Body style={{alignItems:'center'}}>
                    <Title style={{fontSize:32, fontWeight:'bold'}}>Register</Title>
                    <Subtitle style={{marginTop:10}}>
                      중복확인이 완료되면 회원가입 버튼이 나타납니다
                    </Subtitle>
                  </Body>
                </Header>
                <ScrollView>
                  <Content contentContainerStyle={styles.content}>
                    
                    <View style={styles.inputContainer}>
                      <TextInput style={styles.inputs}
                      placeholder="Name"
                      underlineColorAndroid='transparent'
                      onChangeText={(name) => this.setState({user_name : name})} />
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput style={styles.inputs}
                      placeholder="Email" 
                      keyboardType="email-address"
                      underlineColorAndroid='transparent'
                      onChangeText={(email) => this.setState({email_address : email, check: null})}/>
                    </View>

                    <TouchableHighlight style={styles.buttonContainer} onPress={() => this.doublecheck()}>
                      <Text>중복확인</Text>
                    </TouchableHighlight>
                    {this.state.check && 
                        this.printchecker()
                        }
                    <View style={styles.inputContainer}>
                      <TextInput style={styles.inputs}
                      placeholder="Password" 
                      secureTextEntry={true}
                      underlineColorAndroid='transparent'
                      onChangeText={(password) => this.savepwd(password)}/>
                    </View>

                    
                    {this.state.user_pwd && this.pwdchecker()}
                    {this.state.check && this.state.user_pwd>7 &&
                        this.showregister() 
                   }
                    </Content>
                    </ScrollView>
                
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C4CACC'
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#7A7E80',
    marginBottom: 20
  },
  content: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4CACC'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    borderBottomColor: '#FFFFFF',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#547280'
  }
})