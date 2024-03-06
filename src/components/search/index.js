import React, { useEffect, useRef, useState,useMemo,useCallback } from "react";
import { FlatList as Flatlisst} from "react-native-gesture-handler";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import FlatListComp from "../FlatList/FlatListComp.js"
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import BigList from "react-native-big-list";
import BigList2 from "react-native-big-list";



import {
    Dimensions,
    FlatList ,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text
    , PixelRatio,
    TextInput,
    RefreshControl,

} from "react-native";
import PostSingle from "./VideoPlayer.js";
import PostSingle2 from "./VideoPlayer2.js";

import  axios from 'axios';
import { Video } from "expo-av";
/* import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const bottomTabHeight = useBottomTabBarHeight(); */
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons,AntDesign,MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import translate from 'google-translate-api-x';

export default function Search() {
    const [urls, setUrls] = React.useState([]);
    const [urls2, setUrls2] = React.useState([]);
    const [data, SetData] = useState([]);
    const [trans,setTrans] = useState("")
    const mediaRefs = useRef([]);
    const [posts, setPosts] = useState([]);
    const [aaaaa, setAaaaa] = useState([]);
    const ref = useRef()

    let height;
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
    const [text, setSearch] = useState("");
    let translate2;
    const [showFlat,setShowFlat] = useState(true);
    const [_dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
          })

      );

      

          
    console.log(useBottomTabBarHeight())
    const getMoreData =  () => {
        axios.get("http://54.165.18.219/allmovie-free1453", {headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'}
    })
            .then(function (result) {
                /* ref.current?.scrollToIndex({index:1}) */

                setShowFlat(!showFlat)
                /* setRefreshing(!refreshing); */
                ref.current?.scrollToIndex({index:1,animated:true})

                setUrls(result.data.posts);
                setUrls2(result.data.posts);
                setDataProvider(_dataProvider.cloneWithRows(result.data.posts))
               /*  SetData((prevState) => prevState.concat(result.data.posts)); */
                console.log(data)
                setLoading(true)

            })
            .catch((err) => {
                console.log(err,"hata");
            });
    };

    const onSubmitSearch = () => {
        const bodyParameters = {
            text: text,
          };
      
          
      
      
          axios
          .post("http://54.165.18.219/search-movie-free1453", bodyParameters)
          .then(function (result) {
            console.log(showFlat)
            ref.current?.scrollToIndex({index:1,animated:true})

            setShowFlat(!showFlat)
            setDataProvider((prevState) =>
            prevState.cloneWithRows(urls.concat(result.data.posts)),
          );
          /* setUrls((prevState) => prevState.concat(result.data.posts)); */
  
            setSearch("");
            setUrls(result.data.posts);
            setUrls2(result.data.posts);
           
          })
          .catch((err) => {
            console.log(err);
          });
      
    }

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

    const showOrHideTranslate = () => {
        setShowTranslate(!showTranslate);
    };

    const soundOrMute = () => {
        setSound(!sound);
    };

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
                        ? { backgroundColor: "white" }
                        : { backgroundColor: "white" },
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
               

                
                     <View style={styles.footer}
         onLayout={(event) => {
            let {height} = event.nativeEvent.layout;
            
          }}
         >
         <TextInput
                    style={styles.textInput}
                    placeholder="Kelime ya da Yapı Ara!"
                    onChangeText={(val) => searchInputChange(val)}
                    value={text}
                    
                    onSubmitEditing={() =>  onSubmitSearch()}

                    
                   

                />
         
                
        </View>
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

      const getTranslate = async (word) => {
        console.log("çalışıyor")
        const translateValue = word

        try{
            const res =  await translate(translateValue, {to: 'tr'});

            console.log(res.text,"amına kodumun yeri")
            const value = res.text
          /*   console.log(value,"bura 2") */
            translate2 = value
            /* setTranslate(res.text) */
            console.log(translate2,"translate2")
            return value
    
        } catch(e){
            console.log(e)

            return "error"
        }
        
     
        


      }
        

     const renderItem =  ( {item, index })  => {
        
        
        /* useEffect(() => {
           
        }, []); */
        
        getTranslate(item.name)
        console.log(item.name,"bura",translate2)
/*         const res =  await translate(translateValue, {to: 'tr'});
 */        /* console.log(value,"burada simdi",trans) */


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
                    item={item}
                    showOrHide={showOrHide}
                    flat={flat}
                    Index={index}
                    refresh={refresh}
                    /* translate={res} */
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
               

                
                     <View style={styles.footer}
         onLayout={(event) => {
            let {height} = event.nativeEvent.layout;
            
          }}
         >
         <TextInput
                    style={styles.textInput}
                    placeholder="Kelime ya da Yapı Ara!"
                    onChangeText={(val) => searchInputChange(val)}
                    value={text}
                    
                    onSubmitEditing={() =>  onSubmitSearch()}

                    
                   

                />
         
                
        </View>

            </View>
        );
    };


    const renderItem2 = ( {item, index })  => {
        
        

        /* const value=getTranslate(item.name) */
/*         const res =  await translate(translateValue, {to: 'tr'});
 */        /* console.log(value,"burada simdi",trans) */


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
                
                {/* <PostSingle2
                    item={item}
                    showOrHide={showOrHide}
                    flat={flat}
                    Index={index}
                    refresh={refresh}
                    showText={showText}
                    showTranslate={showTranslate}
                    showOrHideTranslate={showOrHideTranslate}
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
    
                /> */}
               

                
                     <View style={styles.footer}
         onLayout={(event) => {
            let {height} = event.nativeEvent.layout;
            
          }}
         >
         <TextInput
                    style={styles.textInput}
                    placeholder="Kelime ya da Yapı Ara!"
                    onChangeText={(val) => searchInputChange(val)}
                    value={text}
                    
                    onSubmitEditing={() =>  onSubmitSearch()}

                    
                   

                />
         
                
        </View>

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
        getMoreData();
    }, []);

    const searchInputChange = (val) => {
        /* console.log(val); */
        setSearch(val);
     
    };

    /*  const myFlatii = useMemo(() => {
        
        return (
            
            
        );
      }, [urls]); */

   

  return (
    <SafeAreaView style={styles.container} >
     <StatusBar animated={true} hidden={false} />
     
     
        <BigList
        ref={ref}
            style={{  zIndex: 999,height:"100vh",
            height: Dimensions.get("window").height, }}
            data={urls}
            renderItem={renderItem}
            pagingEnabled
            itemHeight={Dimensions.get("window").height- bottomTabHeight} 
            keyExtractor={(item, index) => index.toString()}

            renderAheadOffset={0}
           
            
             
            showsVerticalScrollIndicator={false}
            snapToInterval={height}
            snapToAlignment={"center"}
            decelerationRate={"fast"}
            disableIntervalMomentum
            initialNumToRender={1}
            windowSize={5}
            maxToRenderPerBatch={1}
            updateCellsBatchingPeriod={50}
            removeClippedSubviews={false}
            
            
            
            /*  onViewableItemsChanged={onViewableItemsChanged.current}
             data={urls}
             renderItem={renderItem} */
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
        position:"absolute",
        top:0,
        height: 60,
        margin:0,
        padding:0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white"
    },
    textInput: {
        width: Dimensions.get("window").width -30,
        height:"70%",
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