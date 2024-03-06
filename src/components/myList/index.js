import { Image, Pressable, ScrollView, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,AntDesign,MaterialCommunityIcons,Entypo,FontAwesome  } from "@expo/vector-icons";
import axios from "axios";
import BottomPopup from "./BottomPopUp";
import { Provider, useSelector } from "react-redux";

const SongInfoScreen = () => {
  const [lists, setLists] = useState([]);
  const token = useSelector((state) => state.AuthReducers.authToken);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(true);
  const route = useRoute();
  const [refreshs,setRefreshs]=useState(1)
  console.log(route.params);
  const albumUrl = route?.params?.item?.track?.album?.uri;
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();
  /* const token =  AsyncStorage.getItem("token"); */
  const value =  AsyncStorage.getItem("token");


  const SomeFunction = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      getMoreData();
      console.log(value);
    } catch (err) {
      console.log(err);
    }
  }

  const closeActivityIndicator = () =>
  setTimeout(() => setAnimating(false), 60000);

const popupRef = React.createRef();

const onShowPopup = () => {
  popupRef.current.show();
};

const onClosePopup = () => {
  popupRef.current.close();
};

const deletePost = (postid) => {
  
  const config = {
      headers: { Authorization: `Bearer ${value._j}` },
  };
  axios
      .delete(`http://54.165.18.219/deletemylist/${postid}`, config)
      .then(() => getMoreData())
      .catch(() => {
          console.log("error");
      });
};

  const getMoreData =  () => {
    console.log(value._j)
    closeActivityIndicator();
    const config = {
        headers: { Authorization: `Bearer ${value._j}` },
    };

    axios
        .get("http://54.165.18.219/mylistGet", config)
        .then(function (result) {
            setLoading(true);
            setLists(result.data.lists);
        })
        .catch((err) => {
            console.log(err);
        });
};


useEffect(() => {
  /* console.log("çalışıyor",value._j)
  if(value==undefined){
    setRefreshs(!refreshs)
    getMoreData();
  } */
  
},[]);


useEffect(() => {
  SomeFunction()
  getMoreData();
 
  
},[]);

/* React.useEffect(() => {
           
  getMoreData();
}, [navigation]);

//Blur Event: to be fired when the HomeScreen loses focus.
React.useEffect(() => {
 getMoreData(); 
}, [navigation]); */

  let allowedState2 = 
            [{ _id: 1, name: "Alabama" },
            { _id: 1, name: "Songer" },
            { _id: 1, name: "Ebe Yarrak" },
        ]
  useEffect(() => {
    allowedState = 
        [{ _id: 1, value: "Alabama" },]
        setTracks(allowedState2)
  }, []);
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
         <View
            style={{
              padding: 10,
              marginTop:40,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center",
                  }}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  padding:5,
                  borderRadius:5,
                  resizeMode: "center",
                  borderColor:"#fff",
                  borderWidth:1,
                  backgroundColor:"red",
                  
                }}
                source={{ uri: "https://filmlerleingilizce.com/play.png" }}
              />
              <View>
             <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                WatchLang
              </Text>
             
             </View>
            </View>
            </View>
      <ScrollView style={{ marginTop: 20 }}>
        
        <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
            onPress={() => {
              onShowPopup()
                /* navigation.navigate("SignIn"); */
            }}
          >
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <Pressable
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#1DB954",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" size={20} color="white" />
              
            </Pressable>
            <Text style={{marginLeft:10,fontSize:12,fontWeight:"300",color:"white",opacity:0.7}}>Kelime Listesi Oluştur  ⏩⏩</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialCommunityIcons
                name="cross-bolnisi"
                size={24}
                color="#1DB954"
              />
              <View
           
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#1DB954",
                }}
              >
                <FontAwesome  name="plus" size={24} color="white" />
               
              </View>
            </View>
            <BottomPopup
                            ref={popupRef}
                            onTouchOutside={onClosePopup}
                            title={"Kelime Ekle"}
                            getMoreData={getMoreData}
                        />
          </TouchableOpacity>
          
          <View>
              <ScrollView style={{marginTop:20,marginHorizontal:12}}>
               {/*  <View style={{marginTop:60,marginHorizontal:20}}>
                <Text style={{fontSize:14,fontWeight:"300",color:"white",opacity:0.7}}>Kelime Listeleri Oluştur. Listelere eklediğin kelimeleri filmlerle öğren.</Text>

                </View> */}
                  {lists?.map((track,index) => (
                    
                      <View style={{marginVertical:10,flexDirection:"row",justifyContent:"space-between"}}>
                          <TouchableOpacity
                           onPress={() => {
                              navigation.navigate("MyWord",track._id);
                          }}
                          >
                              <Text style={{fontSize:16,fontWeight:"500",color:"white"}}>{track?.name}</Text>
                              <View style={{flexDirection:"row",alignItems:"center",gap:8,marginTop:5}}>
                                  {track?.artists?.map((item,index) => (
                                      <Text style={{fontSize:16,fontWeight:"500",color:"gray"}}>{item?.name}</Text>
                                  ))}
                              </View>

                          </TouchableOpacity>
                          <TouchableOpacity   onPress={() => {
                    deletePost(track._id);
                }}>

                          <MaterialCommunityIcons name="delete-outline" size={24} color="white" />
                          </TouchableOpacity>
                         
                      </View>
                  ))}
              </ScrollView>
          </View>

      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({});