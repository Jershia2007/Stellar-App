import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';

export default class UpdateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aircrafts: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get('https://ll.thespacedevs.com/2.0.0/config/spacecraft/')
      .then((response) => {
        this.setState({ aircrafts: response.data.results });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.renderContainer}>
        <Image
          source={{ uri: item.agency.image_url }}
          style={styles.image}></Image>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text1}>{item.agency.name}</Text>
        <Text style={{color:'#daecf3',fontWeight:'bold'}}>DESCRIPTION</Text>
        <Text style={styles.text3}>{item.agency.description}</Text>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={require('../assets/sky.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>Space Crafts</Text>
          </View>
          <View style={styles.eventContainer}>
            <FlatList
              data={this.state.aircrafts}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
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
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleBar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  eventContainer: {
    flex: 0.85,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fae3d9',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  renderContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 10,
  },
  text1: {
    color: '#4bbcf4',
    fontWeight: 'bold',
  },
  text3: {
    color: '#fe424d',
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
  },
});
