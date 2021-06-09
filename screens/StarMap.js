import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default class StarMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
    };
  }

  render() {
    const { longitude, latitude } = this.state;
    const path =
      'https://virtualsky.lco.global/embed/index.html?longitude=${longitude}&latitude=${latitude}&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true&projection=stereo&showdate=false&showposition=false';
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/starMap.gif')}
          style={styles.backgroundImage}>
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>Star Map</Text>
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="Enter The Longitude"
            onChangeText={(text) => {
              this.setState({
                longitude: text,
              });
            }}
          />
          <TextInput
            style={styles.loginBox1}
            placeholder="Enter The Latitude"
            onChangeText={(text) => {
              this.setState({
                latitude: text,
              });
            }}
          />
           <WebView
          scalesPageToFit={true}
          source={{ uri: path }}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  titleBar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    width: '80%',
    height: 20,
    fontFamily: 'Comic Sans MS',
    border: 'dotted',
    padding: 17,
    marginLeft: 40,
    marginTop: 10,
    color: 'black',
    fontSize: 15,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginBox1: {
    width: '80%',
    height: 20,
    fontFamily: 'Comic Sans MS',
    border: 'dotted',
    padding: 17,
    marginLeft: 40,
    marginTop: 10,
    color: 'black',
    fontSize: 15,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
});
