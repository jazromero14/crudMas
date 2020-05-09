import React from 'react'
import { View, Text, ScrollView, StyleSheet} from 'react-native'
import { ColectorDao } from './ColectorDao'
import { Card, ListItem, Button, Icon, Modal, Input } from 'react-native-elements'

export default class AddColectorScreen extends React.Component{

   colectores = new ColectorDao();

   state = {
    dueno:"",
    nombre_mascota:"",
    sexo:"",
    edad:""
  }
  
  render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Agregar mascota</Text>
                <Input placeholder='Nombre del dueño' onChangeText={(value)=> this.setState( {dueno:value} ) }  value={this.state.dueno} />
                <Input placeholder='Nombre mascota' onChangeText={(value)=> this.setState( {nombre_mascota : value} ) } value={this.state.nombre_mascota} />
                <Input placeholder='Sexo' onChangeText={(value)=> this.setState( { sexo : value } ) }  value={this.state.sexo} />
                <Input placeholder='Edad "3 años" ' onChangeText={(value)=> this.setState( { edad : value } ) }  value={this.state.edad} />
                <Button title="Agregar Colector"  onPress={ () => { this.add() } } ></Button>
            </View>
        )
    }

    add(){
        try{
          if(this.state.nombre_mascota == ""){
            alert("Ingrese nombre de mascota")
            return;
          }
          
          var colector = { dueno:this.state.dueno, nombre_mascota: this.state.nombre_mascota, sexo: this.state.sexo , edad: this.state.edad }
          this.colectores.storeColector(colector)
          this.setState({dueno:"", nombre_mascota:"", sexo:"" , edad:""})

        }catch(e){
          console.log(e)
        }
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo:{
      fontSize:40,
      textAlign:"left"
  },
  });