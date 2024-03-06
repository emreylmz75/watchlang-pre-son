import React, { useEffect, useRef, useState } from "react";
import { FlatList as Flatlist2 } from "react-native-gesture-handler";

import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
    , PixelRatio
} from "react-native";
import PostSingle from "./VideoDetail.js";
import  axios from 'axios';
import { Video } from "expo-av";
/* import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const bottomTabHeight = useBottomTabBarHeight(); */
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function VideoMe() {
    const [urls, setUrls] = React.useState([]);
    const mediaRefs = useRef([]);
    const [posts, setPosts] = useState([]);
    const [aaaaa, setAaaaa] = useState([]);
    const route = useRoute();
    console.log(route.params.params.word);
    const [showText, setShowText] = useState(true);
    const [showTranslate, setShowTranslate] = useState(true);
    const [playOrStopS, setPlayOrStopS] = useState(true);
    const [sound, setSound] = useState(false);
    const [flat, setFlat] = useState(true);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const width_proportion = '100px';
    const statusBarHeight = StatusBar.currentHeight || 0;
    const bottomTabHeight = useBottomTabBarHeight();
    const { height: WINDOW_HEIGHT } = Dimensions.get("window");
    const [words,setWord] = useState([]);
    const [showFlat,setShowFlat] = useState(true);
    /* console.log(route.params.params.words2) */

   /*  if(words.word==undefined){
        setWord(route.params.params.word.word);
    } */
    
    const words2 = route.params.params.words2;

    const doSomething = () => {
        const tr = words2.findIndex((obj) => obj._id === words._id);
        const length = words2.length - 1;
        if (tr < length) {
            setWord(words2[tr + 1]);
           /*  setText(words2[tr + 1].word); */
        }
        /* setUrls([]); */
    };
    const dontSomething = () => {

        const tr = words2.findIndex((obj) => obj._id === words._id);
        const length = words2.length - 1;
        if (tr > 0) {
            setWord(words2[tr - 1]);
            /* setText(words2[tr - 1].word); */
        }
        /* setUrls([]); */
    };


   
    const getMoreData =  () => {




        /* console.log(words._id,"bura")
        if(words._id==undefined) {
            console.log("word yok")
            setWord(route.params.params.word)
        } */
       console.log(words.word,"dsadsasdaasd")
       
            axios.post("http://54.165.18.219/search-movie-free1453", {
        text:words.word,
        
    })
            .then(function (result) {
                /* if(words){
                    
                }else {
                    
                } */
                
               
                if(words.word==undefined){
                    /* setUrls([]) */
                }else {
                    /* renderItem() */
                    setShowFlat(!showFlat)
                    setUrls(result.data.posts);
                    
                }
                
                /* console.log(result.data.posts) */
                

            })
            .catch((err) => {
                console.log(err,"hata");
            });
        
    };

    const onViewableItemsChanged = useRef(({ changed }) => {
        changed.forEach((element) => {
            const cell = mediaRefs.current[element.key];

            if (cell) {
                /* console.log(
                    "onViewableItemsChanged",
                    element,
                    element.isViewable
                ); */
                if (element.isViewable) {
                    console.log("onViewableItemsChange 1");

                    cell.play();

                } else {
                    cell.stop();
                }
            }
        });
    });

   

    const playOrStop = () => {
        setFlat(!flat);
    };

    const showOrHide = () => {
        setShowText(!showText);
       /*  getMoreData(); */
    };


    const refresh = () => {
        
/*         setShowText(!showText);
 */        getMoreData();
    };


    const handleRefresh = () => {
        /*         setShowText(!showText);
         */        /* getMoreData(); */
            };

    const showOrHideTranslate = () => {
        setShowTranslate(!showTranslate);
    };

    const soundOrMute = () => {
        setSound(!sound);
    };

    

    const renderItem = ({ item, index }) => {

        return (
            
            <View
                style={[
                    {
                        flex: 1,
                        height:WINDOW_HEIGHT - bottomTabHeight ,
                        width: Dimensions.get("window").width,
                        
                    },
                    index % 2 == 0
                        ? { backgroundColor: "black" }
                        : { backgroundColor: "black" },
                ]}
            >
                <PostSingle
                    item={item}
                    showOrHide={showOrHide}
                    flat={flat}
                    /* Index={index} */
                    words={words}
                    refresh={refresh}
                    doSomething={doSomething}
                    dontSomething={dontSomething}
                    showText={showText}
                    showTranslate={showTranslate}
                    showOrHideTranslate={showOrHideTranslate}
                    onViewableItemsChanged={onViewableItemsChanged}
                    playOrStop={playOrStop}
                    ref={(PostSingleRef) =>
                        (mediaRefs.current[item._id] = PostSingleRef)
                    }
                    soundOrMute={soundOrMute}
                    sound={sound}
                    /* onScroll={(e) => {
                        const index = Math.round(
                            e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - bottomTabHeight)
                        );
                        setActiveVideoIndex(index);
                    }} */
    
                />
            </View>
        );
    };

    

/*     const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 })
 */

    const renderLoader = () => {
        /* return loading ? (
            <View style={styles.loaderStyle}>
                <ActivityIndicator size="large" color="#aaa" />
                <Text style={{ color: "#fff" }}>Yükleniyor</Text>
            </View>
        ) : null; */
    };

    useEffect(() => {
        if(words._id==undefined) {
            setWord(route.params.params.word)
            getMoreData();
        }
    }, []);

    useEffect(() => {
       if(words._id){
        getMoreData();
       }
        
    }, [words]);

    

  return (
    <SafeAreaView style={styles.container} >
     <StatusBar animated={true} hidden={false} />
    
  
    {showFlat?(
        <FlatList
        style={{ backgroundColor: "black", zIndex: 999,height:"80vh",
        height: Dimensions.get("window").height, }}
        data={urls}
        renderItem={renderItem}
        windowSize={4}
        pagingEnabled
        decelerationRate={"fast"}
        maxToRenderPerBatch={2}
        keyExtractor={(item) => item._id}
        removeClippedSubviews
         onViewableItemsChanged={onViewableItemsChanged.current}      
    />
    ):(
<Flatlist2
            style={{ backgroundColor: "black", zIndex: 999,height:"80vh",
            height: Dimensions.get("window").height, }}
            data={urls}
            renderItem={renderItem}
            windowSize={4}
            keyExtractor={(item) => item._id}
            pagingEnabled
            decelerationRate={"fast"}
            maxToRenderPerBatch={2}
            removeClippedSubviews
             onViewableItemsChanged={onViewableItemsChanged.current}      
        />
    )}
        


        
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: "80vh",
    },
    footer: {
        width: Dimensions.get("window").width,
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        width: Dimensions.get("window").width - 60,
        height:"70%",
        margin: 5,
        backgroundColor: "lightgray",
        padding: 5,
        borderRadius: 4,
        justifyContent:"center",
        alignItems:"flex-start",
        opacity:0.4
    },
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});