import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState, useEffect, useContext, useRef } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { AntDesign } from "@expo/vector-icons";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { Feather, FontAwesome } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { BottomModal } from "react-native-modals";
  import { ModalContent } from "react-native-modals";
  import { Audio } from "expo-av";
  import { debounce } from "lodash";

import SongItem from "./SongItem"
  
  const LikeSong = () => {
    const colors = [
      "#27374D",
      "#1D267D",
      "#BE5A83",
      "#212A3E",
      "#917FB3",
      "#37306B",
      "#443C68",
      "#5B8FB9",
      "#144272",
    ];
    const navigation = useNavigation();
    const [backgroundColor, setBackgroundColor] = useState("#0A2647");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchedTracks, setSearchedTracks] = useState([]);
    const [input, setInput] = useState("");
    const [savedTracks, setSavedTracks] = useState([]);
    const value = useRef(0);
    const [currentSound, setCurrentSound] = useState(null);
    const [progress, setProgress] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    async function getSavedTracks() {
      const accessToken = await AsyncStorage.getItem("token");

     let allowedState = 
      [{ _id: 1, name: "Accept" },
      { _id: 1, name: "Alabama" },
      { _id: 1, name: "Alabama" },
  ]
       
  useEffect(() => {
    let sound = 
    [{ _id: 1, name: "Accept" },
    { _id: 1, name: "Alabama" },
    { _id: 1, name: "Alabama" },
    { _id: 1, name: "Alabama" },
    { _id: 1, name: "Alabama" },
    { _id: 1, name: "Alabama" },

  ]

    let allowedState = 
        [{ _id: 1, name: "Accept" },
        { _id: 1, name: "Alabama" },
        { _id: 1, name: "Alabama" },
        { _id: 1, name: "Alabama" },

        { _id: 1, name: "Alabama" },
        { _id: 1, name: "Alabama" },

    ]
    setSearchedTracks(allowedState);
  }, []);
     

      if (!response.ok) {
        throw new Error("failed to fetch the tracks");
      }
      const data = await response.json();
      setSavedTracks(data.items);
    }
    useEffect(() => {
      getSavedTracks();
    }, []);

    const renderItem = ({ item }) => {
      return (
          <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
    >
      <Image
        style={{ width: 50, height: 50, marginRight: 10 }}
        source={{ uri: "https://i.pravatar.cc/103" }}
      />

      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={
              { fontWeight: "bold", fontSize: 14, color: "white" }
          }
        >
          Kabul etmek
        </Text>
        <Text style={{ marginTop: 4, color: "#989898" }}>
          Accept
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginHorizontal: 10,
        }}
      >
        <AntDesign name="heart" size={24} color="#1DB954" />
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
      </View>
    </TouchableOpacity>
      );
    };


  
  
    return (
      <>
        <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
        
           
          <ScrollView style={{ flex: 1, marginTop: 50 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginHorizontal: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
  
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 9,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "#42275a",
                  padding: 9,
                  flex: 1,
                  borderRadius: 3,
                  height: 38,
                }}
              >
                <AntDesign name="search1" size={20} color="white" />
                
              </TouchableOpacity>
  
              
            </TouchableOpacity>
  
            <View style={{ height: 50 }} />
           
  
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >
              <TouchableOpacity
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
              </TouchableOpacity>
  
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <MaterialCommunityIcons
                  name="cross-bolnisi"
                  size={24}
                  color="#1DB954"
                />
                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
  
            <FlatList
              data={[0,1,2]}
              renderItem={renderItem}
  
            />

          </ScrollView>
          
        </LinearGradient>
  
       
          <TouchableOpacity
            style={{
              backgroundColor: "#5072A7",
              width: "90%",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 15,
              position: "absolute",
              borderRadius: 6,
              left: 20,
              bottom: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Image
                style={{ width: 40, height: 40 }}
                source={{ uri: "https://i.pravatar.cc/101" }}
              />
              <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                width: 220,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Kelime Listesi Oluştur 
              
            </Text>
            </View>
            
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <AntDesign name="heart" size={24} color="#1DB954" />
              <Pressable>
                <AntDesign name="pausecircle" size={24} color="white" />
              </Pressable>
            </View>
          </TouchableOpacity>
     
  
     </>
    );
  };
  
  export default LikeSong;
  
  const styles = StyleSheet.create({
    progressbar: {
      height: "100%",
      backgroundColor: "white",
    },
  });