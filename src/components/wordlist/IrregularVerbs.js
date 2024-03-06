import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,AntDesign,MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

const IrregularVerbs = () => {
  const route = useRoute();
  console.log(route.params);
  const albumUrl = route?.params?.item?.track?.album?.uri;
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();
  const [irregular,setIrregular] = useState();


  const getMoreData = () => {
    axios
      .get("http://54.165.18.219/irregular-free1453")
      .then(function (result) {
        console.log(result.data.lists)
        setIrregular(result.data.lists);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
      console.log("deneme")
    getMoreData();
  }, []);


  let allowedState2 = 
            [{ _id: 1, name: "forget" },
            { _id: 1, name: "Songer" },
            { _id: 1, name: "Ebe Yarrak" },
        ]
  useEffect(() => {
    allowedState = 
        [{ _id: 1, value: "Alabama" },]
        setTracks(allowedState2)
  }, []);
  return (
   

          <ScrollView>
              <View style={{marginTop:10,marginHorizontal:12}}>
                  {irregular?.map((track,index) => (
                      <View style={{marginVertical:18,flexDirection:"column",justifyContent:"space-between",width:"100vw"}}>
                          
                             <View style={{marginBottom:5,flexDirection:"column",justifyContent:"center",alignSelf:"center",width:"100vw"}}>

                             <Text style={{color:"gray",fontSize:16,fontWeight:"500",}}>{index}</Text>
                            </View>
                              <View style={{flexDirection:"row",justifyContent:"space-between",with:"100vw"}}>
                                <TouchableOpacity 
                                onPress={() => {
                                  navigation.navigate("IrregularVideo", {
                                      params: {  word:track,words2:irregular },
                                  });
                              }}
                                >
                                    <Text style={{fontSize:17,fontWeight:"500",color:"white"}}>
                                    {track.first}
                                    </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                     onPress={() => {
                                      navigation.navigate("IrregularVideo", {
                                          params: {  word:track.first,words2:irregular },
                                      });
                                  }}
                                    >
                                    <Text  style={{fontSize:17,fontWeight:"500",color:"white"}}>
                                    {track.second}
                                    </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                    onPress={() => {
                                      navigation.navigate("IrregularVideo", {
                                          params: {  word:track.first,words2:irregular },
                                      });
                                  }}
                                    >
                                    <Text  style={{fontSize:17,fontWeight:"500",color:"white"}}>
                                    {track.third}
                                    </Text>
                                    </TouchableOpacity>

                              </View>

                         
                      </View>
                  ))}
              </View>
          </ScrollView>

  );
};

export default IrregularVerbs;

const styles = StyleSheet.create({});