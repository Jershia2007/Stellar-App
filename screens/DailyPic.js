import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';

export default class StarMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apod: {},
    };
  }

  componentDidMount() {
    this.getAPOD();
  }

  getAPOD = () => {
    axios
      .get(
        'https://api.nasa.gov/planetary/apod?api_key=ijwhJt0PK7T8H9yOUGtIPSPfNcLCKuL80EWBfvE1'
      )
      .then((response) => {
        this.setState({ apod: response.data });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={require('../assets/star.jpg')}
          style={styles.backgroundImage}>
          <Text style={styles.titleText}>Astronomy picture of the day</Text>
          <Text style={styles.titleText1}>{this.state.apod.title}</Text>
          <Text style={styles.text}>{this.state.apod.explanation}</Text>
          <TouchableOpacity
            style={styles.listContainer}
            onPress={() =>
              Linking.openURL(this.state.apod.url).catch((err) =>
                console.error("Couldn't load page", err)
              )
            }>
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/play-video.png')}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
    marginTop: 20,
    marginLeft:20
  },
  iconContainer: {
    flex: 0.85,
  },
  listContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'pink',
    alignItems: 'center',
    fontFamily: 'Comic Sans MS',
    marginLeft:20
  },
  titleText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
    alignItems: 'center',
    marginTop: 10,
    marginBottom:20,
    marginLeft:20
  },
});
