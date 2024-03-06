import { Image, Pressable,TouchableOpacity,ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,AntDesign,MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import axios from "axios";

const PhraselVerbs = ({route}) => {
  /* const route = useRoute(); */
  console.log(route.params.from);
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();
  const [words, setWords] = useState([]);
  let from = route.params.from; 


  const getMoreData =  () => {
    console.log(from)
    axios
      .get("http://54.165.18.219/phrasel-free1453",  { params: { from } })
      .then(function (result) {
        
            setWords(result.data.word);

        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()  => {
    if(from==undefined){
        console.log("ne sandın yarram")
        from = route.params.from
    }
    else {
        getMoreData();

    }
  });

  useEffect(()  => {
    getMoreData();
  }, [from]);



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
      <ScrollView style={{ marginTop: 20 }}>
        <View style={{ flexDirection: "row", padding: 12 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="white"
          />
         
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
          Phrasel Verbs
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
              {from+1}00 Terim
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
                <Entypo name="controller-play" size={24} color="white" />
              </Pressable>
            </View>
          </Pressable>

          <View>
              <View style={{marginTop:10,marginHorizontal:12}}>
                  {words?.map((track,index) => (
                      <TouchableOpacity 
                      onPress={() => {
                        navigation.navigate("Video",{params:{word:track,words2:words}});
                    }}
                      style={{marginVertical:10,flexDirection:"row",justifyContent:"space-between"}}>
                          <View>
                              <Text style={{fontSize:16,fontWeight:"500",color:"white"}}>{track?.word}</Text>
                              <View style={{flexDirection:"row",alignItems:"center",gap:8,marginTop:5}}>
                                 
                              </View>

                          </View>
                          <Entypo name="dots-three-vertical" size={24} color="white" />
                      </TouchableOpacity>
                  ))}
              </View>
          </View>

      </ScrollView>
    </LinearGradient>
  );
};

export default PhraselVerbs;

const styles = StyleSheet.create({});