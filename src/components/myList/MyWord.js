import React, { Component, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Pressable
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
/* import MyWordsItem from "./MyWordsItem"; */
import AddPopup from "./AddPopUp";
import { Provider, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,AntDesign,MaterialCommunityIcons,Entypo,FontAwesome  } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const MyWord = (props) => {
    const id = props.route.params;
    console.log(props.route.params)
    const [words, setWords] = useState([]);
    const navigation = useNavigation();
    const token = useSelector((state) => state.AuthReducers.authToken);
 

    const popupRef = React.createRef();

    const onShowPopup = () => {
        popupRef.current.show();
    };

    const onClosePopup = () => {
        popupRef.current.close();
    };

    //console.log(props.route.params.props.id);
    //console.log("hello", words);

    const getMoreData = () => {
        console.log("useEffect:", id);
        axios
            .get("http://54.165.18.219/myword", { params: { id } })
            .then(function (result) {
                console.log(result.data);
                setWords(result.data.word);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getMoreData();
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
            <Text style={{marginLeft:10,fontSize:12,fontWeight:"300",color:"white",opacity:0.7}}>Kelime Ekle  ⏩⏩</Text>
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
            <AddPopup
                        ref={popupRef}
                        onTouchOutside={onClosePopup}
                        title={"Kelime Ekle"}                    
                        id={id}
                        getMoreData={getMoreData}
                    />
          </TouchableOpacity>
          
          <View>
              <View style={{marginTop:20,marginHorizontal:12}}>
               {/*  <View style={{marginTop:60,marginHorizontal:20}}>
                <Text style={{fontSize:14,fontWeight:"300",color:"white",opacity:0.7}}>Kelime Listeleri Oluştur. Listelere eklediğin kelimeleri filmlerle öğren.</Text>

                </View> */}
                  {words?.map((track,index) => (
                    
                      <View style={{marginVertical:10,flexDirection:"row",justifyContent:"space-between"}}>
                          <TouchableOpacity
                           onPress={() => {
                              navigation.navigate("VideoMe",{params:{word:track,words2:words}});
                          }}
                          >
                              <Text style={{fontSize:16,fontWeight:"500",color:"white"}}>{track?.word}</Text>
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
              </View>
          </View>

      </ScrollView>
    </LinearGradient>
     
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
        //marginTop: Constants.statusBarHeight,
    },
    tasksWrapper: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    items: {
        marginTop: 30,
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default MyWord;
   {/* <ScrollView style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Words</Text>
                <View style={{ width: "100%" }}>
                    <TouchableOpacity
                        onPress={onShowPopup}
                        style={[
                            styles.signIn,
                            {
                                borderColor: "#1DB954",
                                borderWidth: 1,
                                marginTop: 15,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: "#1DB954",
                                },
                            ]}
                        >
                            Kelime Ekle
                        </Text>
                    </TouchableOpacity>
                    <AddPopup
                        ref={popupRef}
                        onTouchOutside={onClosePopup}
                        title={"Kelime Ekle"}                    
                        id={id}
                        getMoreData={getMoreData}
                    />
                </View>
                <View style={styles.items}>
                    {words.map((word, stepIndex) => (
                        <MyWordsItem
                            key={word._id}
                            item={word}
                            Index={stepIndex}
                            words={words}
                            getMoreData={getMoreData}
                        />
                    ))}

                    <WordsItem item={"delete"} Index={6} />
                </View>
            </View>
        </ScrollView> */}