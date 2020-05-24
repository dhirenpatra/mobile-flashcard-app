import React from "react";
import reducer from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { AntDesign } from "@expo/vector-icons";

import { View, Platform } from "react-native";
import { purple, white, grayishWhite } from "./utils/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import AddDecks from "./screens/AddDecks";
import AppStatusBar from "./screens/AppStatusBar";
import DeckCard from "./screens/DeckCard";
import AddCard from "./screens/AddCard";
import StartQuiz from './screens/StartQuiz';
import { setNotification } from './utils/notification';

const Tab = createBottomTabNavigator();

export const ApplicationTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Platform.OS === "ios" ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === "ios" ? white : purple,
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ tintColor }) =>
          Platform.OS === 'ios' ? 
            <AntDesign name="home" size={30} color={tintColor} /> :
            <AntDesign name="home" size={30} color='white' />
          ,
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={AddDecks}
        options={{
          tabBarIcon: ({ tintColor }) =>
            Platform.OS === "ios" ? (
              <AntDesign name="addfolder" size={24} color={tintColor} />
            ) : (
              <AntDesign name="addfolder" size={24} color='white' />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export const ApplicationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#005",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          marginLeft:'auto',
          marginRight: 'auto'
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={ApplicationTabs}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="DeckCard"
        component={DeckCard}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{ title: "Add card" }}
      />
      <Stack.Screen
        name="Quiz"
        component={StartQuiz}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default class App extends React.Component {
  
  componentDidMount() {
    setNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <AppStatusBar backgroundColor={grayishWhite} barStyle="light-content" />
            <ApplicationStack />
          </View>
        </NavigationContainer>
      </Provider>
    );
  }
}
