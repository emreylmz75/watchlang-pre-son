import { Image, Pressable,TouchableOpacity, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,AntDesign,MaterialCommunityIcons,Entypo } from "@expo/vector-icons";

import axios from "axios"

const SongInfoScreen = () => {
  const route = useRoute();
  console.log(route.params);
  const albumUrl = route?.params?.item?.track?.album?.uri;
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();
  const [grammer,setGrammer] = useState();


  const getMoreData = () => {
    axios
      .get("http://54.165.18.219/grammer-free1453", {
      
     })
      .then(function (result) {
        console.log(result.data.lists)
        setGrammer(result.data.lists);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMoreData();
  }, []);


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
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ flexDirection: "row", padding: 12 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="white"
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: "https://i.pravatar.cc/101" }}
            />
          </View>
        </View>
        <Text
          style={{
            color: "white",
            marginHorizontal: 12,
            marginTop: 10,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Burdan
        </Text>
        <View
          style={{
            marginHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 10,
            gap: 7,
          }}
        >
          {tracks?.map((item, index) => (
            <Text style={{ color: "#909090", fontSize: 13, fontWeight: "500" }}>
              {item.name}
            </Text>
          ))}
        </View>
        <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
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

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialCommunityIcons
                name="cross-bolnisi"
                size={24}
                color="#1DB954"
              />
              <Pressable
           
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#1DB954",
                }}
              >
                <Entypo name="controller-play" size={24} color="white" />
              </Pressable>
            </View>
          </Pressable>

          <View>
              <View style={{marginTop:10,marginHorizontal:12}}>
                  {grammer?.map((track,index) => (
                       <View style={{marginVertical:18,flexDirection:"column",justifyContent:"space-between",width:"100vw"}}>
                          
                       <View style={{marginBottom:5,flexDirection:"column",justifyContent:"center",alignSelf:"center",width:"100vw"}}>

                       <Text style={{color:"gray",fontSize:16,fontWeight:"500",}}>{track.name}</Text>
                      </View>
                        <View style={{flexDirection:"row",justifyContent:"space-around",with:"100vw"}}>
                          
                              <TouchableOpacity 
                               onPress={() => {
                                navigation.navigate("VideoGrammer", {
                                    params: {  name:track.name, status:1, id:track._id },
                                });
                            }}
                              
                              style={{fontSize:17,fontWeight:"500",color:"white"}}>
                              <AntDesign name="plussquare" size={42} color="#1DB954" />
                              </TouchableOpacity>
                              <TouchableOpacity 
                               onPress={() => {
                                navigation.navigate("VideoGrammer", {
                                    params: {  name:track.name, status:2, id:track._id },
                                });
                            }}
                              >
                              <AntDesign name="minussquare" size={42} color="red" />
                              </TouchableOpacity>
                              <TouchableOpacity 
                               onPress={() => {
                                navigation.navigate("VideoGrammer", {
                                    params: {  name:track.name, status:3, id:track._id },
                                });
                            }}
                              style={{justifyContent:"center",with:"100vw"}}>
                              <AntDesign name="questioncircle" size={42} color="blue" />
                              </TouchableOpacity>

                        </View>

                   
                </View>
                  ))}
              </View>
          </View>

      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({});