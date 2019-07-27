import React, { Component } from 'react'
import { View, Text } from 'react-native'

class HttpExample extends Component {
   state = {
      data: ''
   }
   componentDidMount = () => {
      fetch('https://5faefed2.ngrok.io/sample/test.doP', {
         method: 'POST'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            data: responseJson
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }
   render() {
      return (
         <View>
            <Text>
               {this.state.data.userid}
               {this.state.data.name}
               {this.state.data.passwd}
            </Text>
         </View>
      )
   }
}
export default HttpExample