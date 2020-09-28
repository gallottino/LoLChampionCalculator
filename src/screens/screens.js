
import React,{useState,useEffect} from 'react';
import {View,Text,Image,FlatList,TouchableOpacity,ActivityIndicator} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ASSET_FILE from '../../assets/json/champions.json';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import {getNormalizedString} from '../utility/utility'

const FILE = JSON.parse(JSON.stringify(ASSET_FILE));
const DATA = FetchChampion();
const Stack = createStackNavigator();

const BACKGROUND_COLOR = '#152238';

 const Champion = ({ name,url}) => (

  <View style={{padding: 10}}>
      <TouchableOpacity>
         
          <Text style={{fontFamily:'Roboto', fontWeight: 'bold', color: 'white',textAlign:'center'}}>{name}</Text>       
          <Image
          style={{
              width: 100,
              height: 100,
              resizeMode: 'contain'
          }}
          source={{
              uri: url
          }}        
          />
      </TouchableOpacity>
  </View>

);

function FetchChampion (){

  var champions = []

  Object.keys(FILE).forEach( (key) =>{
      champions.push(FILE[key]);
  })
  return champions;
}



const getUrlfromFull=(full) =>{
  return 'http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/' + full;
}

export const StackNavigator= () => {
  return(
    <Stack.Navigator> 
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
          
        />
        <Stack.Screen name="ChampionProfile" component={ChampionProfileScreen} 
        options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

;

const HomeScreen = () =>{

  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <TouchableWithoutFeedback
    onPress={() => {
      navigation.navigate('ChampionProfile', {id: getNormalizedString(item.name)});
    }}>
      <Champion name={item.name} url={getUrlfromFull(item.image.full)}/>
    </TouchableWithoutFeedback>
  );


  return(
    <View style={{alignItems:'center',backgroundColor: BACKGROUND_COLOR}}>
      
      
    <FlatList
    ListHeaderComponent={
      <View style={{height:200}}>
      
      <Image
        style={{
          width: 350,
          height: 210,
          resizeMode: 'contain'
        }}
        source={{
          uri: 'https://onovia.com/wp-content/uploads/2020/05/lol-logo-rendered-hi-res.png'
        }}
      />
      </View>
    }
      data={DATA}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={item => item.id}
      />
  </View>
  );
}

const ChampionProfileScreen= ({route,navigation}) => {
  const { id } = route.params;

  const [isLoaded, setLoad] = useState(false);
  const [dataChampion, setData] = useState({});

  useEffect (() =>{
    fetch('http://ddragon.leagueoflegends.com/cdn/10.19.1/data/it_IT/champion/' +id+ '.json')
    .then((response) => response.json())
    .then((responseJson) => {   
      setData(responseJson);
      setLoad(true); 
    })
    .catch((error) =>{
      console.error(error);
    });

  },[])

  const getSplashUrl = () =>{

    var nameJpg = FILE[id].image.full.replace('.png','_0.jpg')
    return 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + nameJpg;
  }

  if(isLoaded){
  return(
  
  <View style={{flex:1,alignItems:'center',backgroundColor: BACKGROUND_COLOR}}>
    
    <Text style={{color:'white', fontWeight: 'bold', fontSize:30, textAlign:"center"}}>
      {FILE[id].name}
    </Text>
    <Text style={{fontStyle: "italic", color:'white', fontWeight: 'bold', fontSize:20, textAlign:"center"}}>
      {FILE[id].title}
    </Text>
    
    <Image
          style={{
              width: 400,
              height: 250,
              resizeMode: 'contain'
          }}
          source={{
              uri: getSplashUrl()
          }}        
          />
    <Text style={{color:'white', 
      fontWeight: 'bold', 
      fontSize:15,
      textAlign: "justify",
      paddingLeft: 15, 
      paddingRight: 15, 
      paddingTop:10,
      paddingBottom:10,
      borderBottomColor: 'white',
      borderBottomWidth: 2,
      borderTopColor: 'white',
      borderTopWidth: 2,
      fontStyle: "italic", }}>
        {dataChampion.data[id].lore}
    </Text>

  
  </View>);
        
  }
  else{
    return( <View style={{flex:1,alignItems:'center', justifyContent:"center", backgroundColor: BACKGROUND_COLOR}}>
      <ActivityIndicator size="large" color="white" />
      <Text style={{color:'white',fontSize:20, textAlign:"center"}}>
        Se la pagina non si carica, controlla la tua connessione!
      </Text>
      </View>);
  }
};

