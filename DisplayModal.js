import React from 'react'
import { Modal, View, Image, Text, StyleSheet } from 'react-native';


class DisplayModal extends React.Component{
constructor(props){
    super(props)

    }

render() {
    return(
        <Modal visible={ this.props.display } animationType = "slide" 
             onRequestClose={ () => console.log('closed') }>
        
         <Image 
            source = { this.props.image } 
            style = { styles.image } />
        
        </Modal>
)}


}
const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    marginLeft: 90,
    height: 200,
    width: 200
  },
  text: {
    fontSize: 20,
    marginLeft: 150
  }
})
export default DisplayModal;