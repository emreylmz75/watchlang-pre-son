import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,AntDesign,MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

const ListCount = ({}) => {
  const route = useRoute();
  console.log(route.params);
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  
  let allowedState2 = 
            [{ _id: 1, name: "100" },
            { _id: 1, name: "200" },
            { _id: 1, name: "300" },
        ]

        

        useEffect(() => {
        
            
          /* const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
          }; */
          axios
            .get("http://54.165.18.219/word2-free1453",{
                params: {
                  product: "YARRAMI YE 55:)",
                  id:route.params
                }
              })
            .then(function (result) {
              setData(result.data.word);
            })
            .catch((err) => {
              console.log(err);
            });
        }, []);
      
  useEffect(() => {
    allowedState = 
        [{ _id: 1, value: "Alabama" },]
        setTracks(allowedState2)
  }, []);

  searchVideo = (track) => {
    console.log(track)
  }
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row", padding: 12 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="white"
          />
          <View style={{ flex: 1, alignItems: "center" }}>
          {/*   <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: "https://i.pravatar.cc/101" }}
            /> */}
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
          Filmlerle İngilizce
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
         
            <Text style={{ color: "#909090", fontSize: 13, fontWeight: "500" }}>
              5000 Kelime
            </Text>
        
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
                <Entypo name="documents" size={24} color="white" />
              </Pressable>
            </View>
          </Pressable>

          <View>
              <View style={{marginTop:10,marginHorizontal:12}}>
                  {data?.map((track,index) => (
                   
                      <TouchableOpacity style={{marginVertical:10,flexDirection:"row",justifyContent:"space-between"}}
                      onPress={() => {
                        navigation.navigate("Video",{params:{word:track,words2:data}});
                    }}
                     >
                          <View>
                              <Text style={{fontSize:22,fontWeight:"500",color:"white"}}>{track?.word}</Text>
                              {/* <View style={{flexDirection:"row",alignItems:"center",gap:8,marginTop:5}}>
                                  {track?.artists?.map((item,index) => (
                                      <Text style={{fontSize:24,fontWeight:"500",color:"gray"}}>{item?.word}</Text>
                                  ))}
                              </View> */}

                          </View>
                          <AntDesign name="arrowright" size={24} color="white" />
                      </TouchableOpacity>
                  ))}
              </View>
          </View>

      </ScrollView>
    </LinearGradient>
  );
};

export default ListCount;

const styles = StyleSheet.create({});