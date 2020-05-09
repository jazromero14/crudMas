import React from 'react'
import { View, Text, ScrollView, StyleSheet, RefreshControl ,  Alert} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';

import { ColectorDao } from './ColectorDao'
import { Card, ListItem, Button, Icon, Modal, Input } from 'react-native-elements'
import QRCode from 'react-native-qrcode-generator';

export default class ListColectorScreen extends React.Component{

    colectores = new ColectorDao()
    

    state = {
        colectoresList : "",
        refreshing : true,
        showAlert: false 
        
    }
    

    showAlert = () => {
        this.setState({
          showAlert: true
        });
      };

      hideAlert = () => {
        this.setState({
          showAlert: false
        });
      };


    constructor(props){
        super(props)
        this.loadColectores() 

    }
 
    

    async handleRefresh(){
        this.loadColectores()
        this.setState({refreshing:true})
    }

    async loadColectores(){
        console.log("Iniciando consulta a registros...")
        var list =   await this.colectores.loadColectores()  
        console.log("cambiando estados")
        console.log(list)
        if(list != undefined ){
            
            this.setState(
                {colectoresList: list , refreshing: false}
            )
        }else{
            console.log("La lista esta vacia")
        }
        this.setState({refreshing:false})
    }  

    render(){
        const {showAlert} = this.state;
        if(this.state.refreshing){
            return(
                <View style={styles.container}>
                    <Text onPress={()=>{ this.loadColectores() }}>
                        Cargando... 
                    </Text>
                </View>
            )        
        }

        return(
            

            <View style={styles.container} >
                <Text>Lista de Colectores</Text>
                <FlatList
                style= {styles.flatlist  }
                data={ Object.keys(this.state.colectoresList) }
                renderItem={ ( {item} ) => 
                    <View>
                        <Text style={styles.titulo}>{ this.state.colectoresList[item].nombre_mascota }</Text>
                        <Text 
                        style={styles.subtitles}
                        onPress = { this.delete(this.state.colectoresList[item])}
                        >{ this.state.colectoresList[item].dueno }</Text>
                       
                    </View>

                    
                }

                keyExtractor={ item => this.state.colectoresList[item].nombre_mascota }

                refreshControl={

                    <RefreshControl
                      refreshing={this.state.isRefreshing}
                      onRefresh={() => this.handleRefresh()}
                    />
          
                  }
                >
                </FlatList>

                <AwesomeAlert
          show={showAlert}
          keyExtractor2={ item => this.state.colectoresList[item].nombre_mascota }
          showProgress={false}
          title="Confirmacion"
          message="Desea eliminar este elemento"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No"
          confirmText="Si"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
           
            this.hideAlert();
          }}
        />
            </View>
            
        )
        
    }

    delete(colector){
        try{
                        
            this.colectores.deleteColector(colector)
            
  
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
    flatlist:{
        width: "100%",
        padding: 8,
        marginStart: 20,
        marginEnd: 20
    },
    titulo:{  width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#7A30E3",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20
    },
    subtitles: {
        width: "100%",
        fontSize: 16,
        fontWeight: "bold",
        padding: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: "#51BCE8",
        color: "#FFFFFF",
        textAlign: "center",
      },
    item:{
        textAlign: "left",
        width: "100%",
        padding: 8,
        marginStart: 20,
        marginEnd: 20
    },
    button: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
      },
      text: {
        color: '#fff',
        fontSize: 15
      }
  });
