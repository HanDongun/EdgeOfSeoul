import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { thisExpression } from '@babel/types';

class Request extends Component {
  state = {
    data: ''
  }
  componentDidMount = () => {
    fetch('https://58bad4e9.ngrok.io/sample/test.doT', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({userid: "cc995212313", passwd: "1234", name:"aaa", email: "aaa"})
})
.then((responseJson) => { 
  console.log("response: " + responseJson);
  
})
.catch((err) => { console.log(err); })
}
render() {
  return (
     <View>
        <Text>
           {this.state.data}
           
        </Text>
     </View>
  )
}
}

export default Request;