/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform,
    StyleSheet,
    Text,
    View,
    Button,
    NativeModules,
    Alert,
    NativeEventEmitter
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Toast = NativeModules.Toast;
const Pop = NativeModules.Pop;
const Date = NativeModules.Date;
const NavBar = NativeModules.NavBar;
const GADataStore = NativeModules.GADataStore;

type Props = {};
export default class App extends Component {
  componentDidMount(){
    const eventEmitter = new NativeEventEmitter();
    eventEmitter.addListener('viewWillAppear', (event) => {
        console.log("on receive event: viewWillAppear")
    });
    eventEmitter.addListener('viewWillReappear', (event) => {
        console.log("on receive event: viewWillReappear")
    });
    eventEmitter.addListener('viewDidDisappear', (event) => {
        console.log("on receive event: viewDidDisappear")
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button style={{marginTop: 0}}
            onPress={() => {
                Toast.show("toast demo", Toast.SHORT);
            }}
            title="show a toast"
        />
        <Button style={{marginTop: 0}}
            onPress={() => {
                var navBarHeight = NavBar.getCurrentNavBarHeight()
                alert("navBarHeight = " + navBarHeight)
            }}
            title="get navigation bar height"
        />
        <Button style={{marginTop: 10}}
            onPress={ () => {
            	Pop.showPop("ConfirmDialog",
            		"{\"content\":\"xxxxxxx\",\"iconType\":0,\"negativeTxt\":\"取消\"" +
            		",\"positiveTxt\":\"确定\",\"title\":\"xxxxxxxxx\"}",
                    1000,
                    () => {console.log("positive")},
                    () => {console.log("negative")},
                )
            }}
            title="show confirm dialog"
        />
        <Button style={{marginTop: 10}}
            onPress={ () => {
                Pop.showPop("DatePickerDialog",
                    "{\"maxDate\":{\"day\":24,\"month\":9,\"year\":2020},\"minDate\":{\"day\":10,\"month\":3,\"year\":2020}}",
                    1000,
                    (date) => {console.log("positive====>" + date)},
                    () => {console.log("negative")},
                )
            }}
            title="show date picker"
         />
        <Button style={{marginTop: 10}}
            onPress={ () => {
                GADataStore.save("p1", "xxx");
                GADataStore.savePersistent("p2", "yyy");
            }}
            title="set kv"
         />
        <Button style={{marginTop: 10}}
            onPress={ () => {
                GADataStore.load("p1").then(res => {
                    alert(res)
                })
            }}
            title="get kv"
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});