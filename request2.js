import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { thisExpression } from '@babel/types';

class Request extends Component {
  state = {
    data: '',
    status: '',
    header: ''
  }
  componentDidMount = () => {
    fetch('https://a89ab0aa.ngrok.io/spring01/json', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({userid: "rn3", passwd: "1234", name:"aaa", email: "aaa", join_date: "12"})
})
.then((response) => response.json())
.then((responseJson) => this.setState({
    data: responseJson,
  }))
.catch((err) => { console.log(err); })
}

render() {
  return (
     <View>
        <Text>
           abcde
           {this.state.data.userid}
           {this.state.data.passwd}
           {this.state.data.email}
           {this.state.data.name}
        </Text>
     </View>
  )
}
}

export default Request;