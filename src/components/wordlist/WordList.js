import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    Pressable,
    FlatList,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import { AntDesign } from "@expo/vector-icons";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import axios from "axios";
  import ArtistCard from "../0folder/ArtistCard";
  import RecentlyPlayedCard from "../0folder/RecentlyPlayedCard";
  import { useNavigation } from "@react-navigation/native";
  import { Entypo } from "@expo/vector-icons";

  const WordList = () => {
    const [userProfile, setUserProfile] = useState();
    const [recentlyplayed, setRecentlyPlayed] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [searchedTracks, setSearchedTracks] = useState([]);
    const [data,setData] = useState([])
    const navigation = useNavigation();

   
    let allowedState = 
        [{ _id: 1, value: "Alabama" },]
        
        

         let allowedState2 = 
            [{ _id: 1, value: "Alabama" },]


            

   
    useEffect(() => {
      
      axios
        .get("http://54.165.18.219/list-free1453")
        .then(function (result) {
          console.log(result.data.lists);
          setData(result.data.lists);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
          
          
   
    const renderItem = ({ item }) => {
      return (
        <Pressable
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
            marginVertical: 8,
            backgroundColor: "#282828",
            borderRadius: 4,
            elevation: 3,
          }}
        >
          <Image
            style={{ height: 55, width: 55 }}
            source={{ uri: "https://i.pravatar.cc/100" }}
          />
          <View
            style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}
          >
            <Text
              numberOfLines={2}
              style={{ fontSize: 13, fontWeight: "bold", color: "white" }}
            >
              hello
            </Text>
          </View>
        </Pressable>
      );
    };

    useEffect(() => {
        
        allowedState = 
        [{ _id: 1, value: "Alabama" },]
        setTopArtists(allowedState2)
        setRecentlyPlayed(allowedState)
        setSearchedTracks(allowedState);
      },[]);


      const renderItem2 = ({ item }) => {
        const id=item._id
        return (
            <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListCount",id);
          }}
        style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
      >
        <Image
          style={{ width: 50, height: 50, marginRight: 10 ,borderRadius:12}}
          source={{ uri: "https://static-koimoi.akamaized.net/wp-content/new-galleries/2020/09/walter-white-aka-heisenberg-from-breaking-bad-bryan-cranstons-iconic-character-is-a-deadly-combination-of-smart-evil-001.jpg" }}
        />
    
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={
                { fontWeight: "bold", fontSize: 14, color: "white" }
            }
          >
            Heisenberg
          </Text>
          <Text style={{ marginTop: 4, color: "#989898" }}>
          {item.name}
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
          <AntDesign name="rightcircle" size={24} color="#1DB954" />
          {/* <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" /> */}
        </View>
      </TouchableOpacity>
        );
      };

  
   
    return (
      <>
  
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              marginHorizontal: 10,
              marginTop: 0,
            }}
          >
            Kelime Listeleri
          </Text>
          <FlatList
              data={data}
              renderItem={renderItem2}
  
            />
          </>
    );
  };
  
  export default WordList;
  
  const styles = StyleSheet.create({});