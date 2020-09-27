import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StatusBar,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ASSET_FILE from '../assets/json/champions.json';

fetchChampion = () => {
  var file = JSON.parse(JSON.stringify(ASSET_FILE));

  var champions = []

  Object.keys(file).forEach( (key) =>{
    champions.push(file[key]);
  })
  return champions;
}

const getUrlfromFull=(full) =>{

  var jpegString = full.replace(".png", "_0.jpg");

  return 'http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/' + full;
}

const renderItem = ({ item }) => (

  <Champion name={item.name} url={getUrlfromFull(item.image.full)}/>
);

const DATA = fetchChampion();

const Champion = ({ name,url }) => (
  <View style={styles.card} >
      <Text style={{color: 'white',textAlign:'center',fontWeight:'bold'}}>{name}</Text>
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain'
        }}
        source={{
          uri:
            url
        }}
      />
  </View>
);

const App = () => {

  [jsonChamp,setChamp] = useState({ });
 
  return (
    <View style={{alignItems:'center',backgroundColor: '#222222'}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={item => item.id}
         />
  </View>
  );
};


const styles = StyleSheet.create(
  {
    card:{
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,

      elevation: 16,
    },
    tinyLogo:{
      width:48,
      height:48
    }
  }
)

export default App;
