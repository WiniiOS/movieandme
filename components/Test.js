import React from 'react'
import { StyleSheet, Platform, View,Text } from 'react-native'

class Test extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
        <View style={styles.a}>
            <View style={styles.b}> <Text>lo</Text></View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  a: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  b:{
    backgroundColor: Platform.OS === 'ios' ? 'red' : 'blue',
    width:50,
    heigh:50
  }
})


export default Test
