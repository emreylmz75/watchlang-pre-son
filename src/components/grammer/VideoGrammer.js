import React, { useEffect, useRef, useState,useMemo,useCallback } from "react";
import { FlatList as Flatlist2 } from "react-native-gesture-handler";
import FlatListComp from "../FlatList/FlatListComp.js"
import BigList from "react-native-big-list";
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    FlatList,
    View,
    Text,
    TouchableOpacity
    , PixelRatio
} from "react-native";
import PostSingle from "./VideoPlayer.js";
import  axios from 'axios';
import { Video } from "expo-av";
/* import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const bottomTabHeight = useBottomTabBarHeight(); */
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function VideoGrammer() {
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
    let height;

   /*  if(words.word==undefined){
        setWord(route.params.params.word.word);
    } */

    const status = route.params.params.status;
    const id = route.params.params.id;
    const [_dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
          })

      );
    
    

    

    const getMoreData = () => {
        /* setTitle(title)
        setDesc(desc)
        setNumber(number) */
  
        const bodyParameters = {
           id,
           status
         };
     
         
     
        console.log(id,"dsads",status)
        axios
        .post("http://54.165.18.219/search-grammer",bodyParameters)
        .then(function (result) {
            
            console.log(result.data.posts,"bura")
  
            setUrls(result.data.posts)
            setDataProvider(_dataProvider.cloneWithRows(result.data.posts))
            SetData((prevState) => prevState.concat(result.data.posts));
            console.log(data)
            setLoading(true)
        })
        .catch((err) => {
            console.log(err);
        });
  
     }
  


   
/*     const getMoreData =  () => {




      
       console.log(words.word,"dsadsasdaasd")
       
            axios.post("http://54.165.18.219/search-movie-free1453", {
        text:words.word,
        
    })
            .then(function (result) {
                
                
               
                if(words.word==undefined){
                }else {
                    setShowFlat(!showFlat)
                    setUrls(result.data.posts);
                    
                }
                
                

            })
            .catch((err) => {
                console.log(err,"hata");
            });
        
    };
 */
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

    

    const renderItem =({ item, index }) => {

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

   /*  useEffect(() => {
        if(words._id==undefined) {
            setWord(route.params.params.word)
            getMoreData();
        }
    }, []);

    useEffect(() => {
       if(words._id){
        getMoreData();
       }
        
    }, [words]); */

    rowRenderer = (type, data, index) => {
        console.log(data)
          
              return (
                  <View
                  style={[
                      {
                          flex: 1,
                          height:WINDOW_HEIGHT - bottomTabHeight,
                          width: Dimensions.get("window").width,
                          
                      },
                      index % 2 == 0
                          ? { backgroundColor: "black" }
                          : { backgroundColor: "black" },
                  ]}
              >
                   <PostSingle
                      item={data}
                      showOrHide={showOrHide}
                      flat={flat}
                      Index={index}
                      refresh={refresh}
                      showText={showText}
                      showTranslate={showTranslate}
                      showOrHideTranslate={showOrHideTranslate}
                      /* onViewableItemsChanged={onViewableItemsChanged} */
                      playOrStop={playOrStop}
                      ref={(PostSingleRef) =>
                          (mediaRefs.current[item._id] = PostSingleRef)
                      }
                      soundOrMute={soundOrMute}
                      sound={sound}
                      onScroll={(e) => {
                          const index = Math.round(
                              e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - bottomTabHeight)
                          );
                          setActiveVideoIndex(index);
                      }}
      
                  />
                 
  
                  
                    
                </View>
              );
          
        };
        const screen = Dimensions.get('window');
        const [_layoutProvider] = useState(
          new LayoutProvider(
            (index) => 1,
            (type, dim) => {
              (dim.height = screen.height- bottomTabHeight), (dim.width = screen.width);
            },
          ),
        );
          
  

    useEffect(() => {
         getMoreData();
        console.log("sex")
         
     }, []); 

     const myFlatii = useMemo(() => {
        return (
           <Flatlist2
            style={{ backgroundColor: "black", zIndex: 999,height:"80vh",
            height: Dimensions.get("window").height, }}
            data={urls}
            renderItem={renderItem}
            pagingEnabled
            
            
            showsVerticalScrollIndicator={false}
            snapToAlignment={"center"}
            decelerationRate={"fast"}
            disableIntervalMomentum
            initialNumToRender={10}
            windowSize={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={50}
            removeClippedSubviews={false}
    
            keyExtractor={(item) => item._id}
            
             onViewableItemsChanged={onViewableItemsChanged.current}
             /* useTextureView={false}
playInBackground={true}
disableFocus={true}    */
            
        />
        );
      }, [urls]);

  return (
    <SafeAreaView style={styles.container} >
     <StatusBar animated={true} hidden={false} />
    {/* <FlatListComp urls={urls} renderItem={renderItem} onViewableItemsChanged={onViewableItemsChanged}/> */}
   {/*  {myFlatii} */}
  
        {/* <FlatListComp
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
             useTextureView={false}
playInBackground={true}
disableFocus={true}   
    />
     */}
         <BigList
        style={{ backgroundColor: "black", zIndex: 999,height:"80vh",
        height: Dimensions.get("window").height, }}
        data={urls}
         keyExtractor={(item) => item._id}
     
        pagingEnabled
        renderItem={renderItem} itemHeight={Dimensions.get("window").height- bottomTabHeight} 
        
        
        
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment={"center"}
        decelerationRate={"fast"}
        disableIntervalMomentum
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={false}
       
        
        /*  onViewableItemsChanged={onViewableItemsChanged.current}
         */
    />


        
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