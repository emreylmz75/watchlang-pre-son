import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,AntDesign,MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import ReviewPopUp from "./Review"
import { TouchableOpacity } from "react-native-gesture-handler";
const Profile = () => {
  const route = useRoute();
  console.log(route.params);
  const albumUrl = route?.params?.item?.track?.album?.uri;
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();
  const popupRef = React.createRef();
  const onShowPopup = () => {
    popupRef.current.show();
  };
  
  const onClosePopup = () => {
    popupRef.current.close();
  };
  
  let allowedState2 = 
            [{ _id: 1, name: "Bize Puan Ver" },
            { _id: 1, name: "İletişime Geç" },
            { _id: 1, name: "Rehber Videosunu İzle" },
        ]
  useEffect(() => {
    allowedState = 
        [{ _id: 1, value: "Alabama" },]
        setTracks(allowedState2)
  }, []);
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView >
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
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#1DB954",
                }}
              >
                Profil
              </Text>
             </View>
            </View>
  
            <MaterialCommunityIcons
              name="lightning-bolt-outline"
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
              1.278.599 Milyon Video
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
          <ReviewPopUp
                        ref={popupRef}
                        onTouchOutside={onClosePopup}
                        title={"Kelime Ekle"}       
                    />
          <View>
              <View style={{marginTop:10,marginHorizontal:12}}>
                  {tracks?.map((track,index) => (
                      <TouchableOpacity
                      onPress={() => {
                        onShowPopup()
                          /* navigation.navigate("SignIn"); */
                      }}
                      
                      style={{marginVertical:10,flexDirection:"row",justifyContent:"space-between"}}>
                          <View>
                              <Text style={{fontSize:16,fontWeight:"500",color:"white"}}>{track?.name}</Text>
                              <View style={{flexDirection:"row",alignItems:"center",gap:8,marginTop:5}}>
                                  {track?.artists?.map((item,index) => (
                                      <Text style={{fontSize:16,fontWeight:"500",color:"gray"}}>{item?.name}</Text>
                                  ))}
                              </View>

                          </View>
                          <AntDesign name="right" size={24} color="white" />
                      </TouchableOpacity>
                  ))}
              </View>
          </View>
          
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({});