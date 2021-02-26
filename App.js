import { StatusBar } from 'expo-status-bar';
import React , { Component }from 'react';

import { View, Text } from 'react-native'
import * as firebase from 'firebase';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk))



  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7BBi0zHvxs3MPBm5TrnOeAgSCn8NAsek",
  authDomain: "dev-instagram-9ec5e.firebaseapp.com",
  projectId: "dev-instagram-9ec5e",
  storageBucket: "dev-instagram-9ec5e.appspot.com",
  messagingSenderId: "1098745363308",
  appId: "1:1098745363308:web:800bbe097c4d0c298b9149",
  measurementId: "G-D7DH58PY9L"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

//Navigation,Landing and RegisterScreen import

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main';


const Stack = createStackNavigator();



export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    
      );
    }

    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
     
     
    )
  }
}

export default App

