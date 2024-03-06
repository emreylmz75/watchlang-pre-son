import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,AntDesign,MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const PhraselVerbsList = () => {
  const route = useRoute();
  console.log(route.params);
  const albumUrl = route?.params?.item?.track?.album?.uri;
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();

  let allowedState2 = 
            [{ _id: 1, name: "Alabama" },
            { _id: 2, name: "Songer" },
            { _id: 3, name: "Ebe Yarrak" },
            { _id: 1, name: "Ebe Yarrak" },
            { _id: 1, name: "Ebe Yarrak" },
            { _id: 1, name: "Ebe Yarrak" },
            { _id: 1, name: "Ebe Yarrak" },
            { _id: 1, name: "Ebe Yarrak" },
            { _id: 1, name: "Ebe Yarrak" },
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
                  {tracks?.map((track,index) => (
                      <TouchableOpacity 
                      
                      onPress={() => {
                        navigation.navigate("PhraselVerbs",{from:index});
                    }}
                      style={{marginVertical:10,flexDirection:"row",justifyContent:"space-between"}}>
                          <View>
                              <Text style={{fontSize:24,fontWeight:"500",color:"white"}}>{index+1}00</Text>
                              <View style={{flexDirection:"row",alignItems:"center",gap:8,marginTop:5}}>
                                  {track?.artists?.map((item,index) => (
                                      <Text style={{fontSize:16,fontWeight:"500",color:"gray"}}>{item?.name}</Text>
                                  ))}
                              </View>

                          </View>
                          <Entypo name="dots-three-vertical" size={24} color="white" />
                      </TouchableOpacity>
                  ))}
              </View>
          </ScrollView>

     
  );
};

export default PhraselVerbsList;

const styles = StyleSheet.create({});