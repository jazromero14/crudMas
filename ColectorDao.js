import * as firebase from 'firebase'

export class ColectorDao{  

    constructor(){
        try{
            firebase.initializeApp(firebaseConfigJazmin);
        }catch(exception){
            //console.log(exception) 
        }
        
        //console.log(firebase)
    }

     storeInitialData(){

        var colector = {"dueno":"Jazmín","nombre_mascota":"Luna","sexo":"Hembra","edad":"3 años"};

        this.storeColector(colector);

        var colector2 = {"dueno":"Jazmín","nombre_mascota":"Rocky","sexo":"Macho","edad":"8 años"};

        this.storeColector(colector2);
     }

     async loadColectores(){
       var itemsList;
       console.log("inicia peticion a firebase")
        await firebase.database().ref('/mascotas').once('value').then(querySnapShot => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          itemsList = {...data};
          key = itemsList.key;
          console.log("finaliza peticion")
        } );

        

        console.log("Los datos se han obtenido, retornando lista")

        return itemsList
      }
      
       storeColector(colector) {
      
        firebase.database().ref('mascotas/' + colector.nombre_mascota).set(
          colector
        );
      }
      deleteColector(colector){
       
          firebase.database().ref('mascotas/' + colector.nombre_mascota).remove(colector);
      
      };      

}

/*
ESTA CONFIGURACION PERTENECE A UN PROYECTO DEL DOCENTE
SI DESEA UTIILZAR SU PROPIA BASE DE DATOS, DEBE CREAR UN PROYECTO EN FIREBASE REAL TIME DATABASE
Y BUSCAR LA CONFIGURACION DE CLIENTE WEB DE FIREBASE
*/
const firebaseConfig = {
    apiKey: "AIzaSyDME2pt69NtPVTW2UFYQoKXjLMOXrTZzvQ",
    authDomain: "ejreact-5e8c5.firebaseapp.com",
    databaseURL: "https://ejreact-5e8c5.firebaseio.com",
    storageBucket: "ejreact-5e8c5.appspot.com",
    measurementId: "G-RZX4JFPD9Q"
  };

  const firebaseConfigJazmin = {
    apiKey: "AIzaSyBMlqrd33EMcV80-WgJIq1q0V1O0Ro23Uw",
    authDomain: "react-f8827.firebaseapp.com",
    databaseURL: "https://react-f8827.firebaseio.com",
    storageBucket: "react-f8827.appspot.com",
    measurementId: "G-VETSRHCRQ1"
  };

