import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColectorDao } from './ColectorDao'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import  AddColectorScreen  from './AddColectorScreen'
import  ListColectorScreen  from './ListColectoresScreen'

var colectores = new ColectorDao();
colectores.storeInitialData()

const AppNavigator = createBottomTabNavigator(
  {
    AddScreen:{
      screen: AddColectorScreen,
      name: "Agregar"
    },
    ListScreen:{
      screen: ListColectorScreen
    }
  },
  { initialRouteName: 'AddScreen'}
)

export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});