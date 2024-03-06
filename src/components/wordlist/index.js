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
  import WordList from "./WordList"
  import PhraselVerbsList from "./PhraselVerbsList"
import IrregularVerbs from "./IrregularVerbs";
import Collocations from "./Collocations";

  const HomeScreen = () => {
    const [userProfile, setUserProfile] = useState();
    const [recentlyplayed, setRecentlyPlayed] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [searchedTracks, setSearchedTracks] = useState([]);
    const [data,setData] = useState([])
    const navigation = useNavigation();
    const [selectCategory,setSelectCategory] =useState(1)
   
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
      <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
        {/* <ScrollView style={{ marginTop: 50 }}> */}
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
  
            <MaterialCommunityIcons
              name="lightning-bolt-outline"
              size={24}
              color="white"
            />
          </View>
          <View
            style={{
              margin:15,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          
            <TouchableOpacity
              style={{
                backgroundColor: "#282828",
                paddingHorizontal: 15,
                paddingVertical:10,
                borderRadius: 30,
                marginRight:10,
              }}
              onPress={()=> {setSelectCategory(1)}}
            >
              <Text style={{ fontSize: 15, color: "white" }}>Kelimeler</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={{
                backgroundColor: "#282828",
                padding: 10,
                borderRadius: 30,
                marginRight:10,
              }}
              onPress={()=> {setSelectCategory(2)}}
            >
              <Text style={{ fontSize: 15, color: "white" }}>
                Phrasel Verbs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#282828",
                padding: 10,
                borderRadius: 30,
                marginRight:10,
              }}
              onPress={()=> {setSelectCategory(3)}}
            >
              <Text style={{ fontSize: 15, color: "white" }}>
                Düzensiz Fiiller
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=> {setSelectCategory(4)}}
              style={{
                backgroundColor: "#282828",
                padding: 10,
                borderRadius: 30,
                marginRight:10,
              }}
              
            >
              <Text style={{ fontSize: 15, color: "white" }}>
                Collocations
              </Text>
            </TouchableOpacity>
          
          </ScrollView>
          </View>
          <View style={{ height: 10 }} />
  
         {/*  <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
            onPress={() => navigation.navigate("Liked")}
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 8,
                backgroundColor: "#202020",
                borderRadius: 4,
                elevation: 3,
              }}
            >
              <LinearGradient colors={["#33006F", "#FFFFFF"]}>
                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="heart" size={24} color="white" />
                </TouchableOpacity>
              </LinearGradient>
  
              <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
                Liked Songs
              </Text>
            </TouchableOpacity>

            
  
            <View
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 5,
                backgroundColor: "#202020",
                borderRadius: 4,
                elevation: 3,
                overflow:"hidden"
              }}
            >
              <Image
                style={{ width: 55, height: 55 }}
                source={{ uri: "https://i.pravatar.cc/100" }}
              />
              <View style={styles.randomArtist}>
                <Text
                  style={{ color: "white", fontSize: 13, fontWeight: "bold", overflow:"hidden"}}
                >
                  Düzensiz Fiiller
                </Text>
              </View>
            </View>
          </View> */}
          {/* <FlatList
            data={data}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          /> */}
          
          {selectCategory==3&&<IrregularVerbs/>}
          {selectCategory==2&&<PhraselVerbsList/>}
  
          {selectCategory==1&&<WordList/>}
          {selectCategory==4&&<Collocations/>}


          

        
        {/* </ScrollView> */}
      </LinearGradient>
    );
  };
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({});