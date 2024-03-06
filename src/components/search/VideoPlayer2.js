import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
    useEffect,
    useState
} from "react";
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback,Text} from 'react-native';
import { Video } from 'expo-av';
import translate from 'google-translate-api-x';
import {useTranslator} from 'react-native-translator';
import {
    AntDesign,
    Ionicons,
    Entypo,
    FontAwesome,
    MaterialIcons,
  } from "@expo/vector-icons";
  import { ActivityIndicator, TouchableOpacity } from "react-native";
  
//the official library is deprecated. I have updated it this version
import InViewPort from './InViewPort';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const VideoPlayer2 =forwardRef(
    (
        {
            item,
            showText,
            showOrHide,
            showTranslate,
            showOrHideTranslate,
            playOrStop,
            sound,
            route,
            flat,
            refresh,
      
           
        },
        parentRef
    ) => {

  const [paused, setPaused] = useState(false)
  const video = useRef();
/*   const [translate,setTranslate] = useState("")
 */     
const {translate} = useTranslator();
const [value, setValue] = useState('');
const [result, setResult] = useState('');

  const stopVideo = () => {
    if(video.current) {
      video.current.stopAsync();
    }
  }

  const playVideo = () => {
    if(video.current) {
      video.current.playAsync();
    }
  }

  const handlePlaying = (isVisible) => {
    /* getTranslate() */
    isVisible ? playVideo() : stopVideo();
  }

  //using async is more reliable than setting shouldPlay with state variable
  const onPlayPausePress = () => {
    if(!paused){
      video.current.pauseAsync()
      setPaused(!paused)
    }
    else{
      video.current.playAsync();
      setPaused(!paused)
    }
  };

  /* useEffect(() => {
    getTranslate(item.name)
}, [item]); */


  


  /* const getTranslate = async (word) => {
    const translateValue = word
    const res =  await translate(translateValue, {to: 'tr'});
    const value = res.text

    setTranslate(value)

    console.log(translate,"amına kodumun yeri")

  } */
  


  return (
   
    <TouchableWithoutFeedback onPress={onPlayPausePress}>
       
      <View style={styles.container}>
        {console.log(item)}
        <InViewPort onChange={handlePlaying}>
        <Video
          ref={video}
          source={{ uri: "https://aws-joygoy-s3.s3.eu-central-1.amazonaws.com/" +item?.number +".mp4" }}
          rate={1.0}
          volume={7.0}
          isLooping
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={{ width: WIDTH, height: HEIGHT - 300 }}
        />
       </InViewPort>
       <View style={styles.subtitle}>
            {showText ? (
              <Text style={[styles.text2, , { marginBottom: 10 }]}>
                {item.name}
              </Text>
            ) : null}

            {showTranslate ? (
              <Text style={[styles.text3]}>{item.tr}</Text>
            ) : null}
          </View>
          
          <View style={styles.bottom}>
            <View style={styles.eyes}>
              <TouchableWithoutFeedback
                onPress={() => showOrHide()}
                style={{
                  color: "red",
                  padding: 5,
                }}
              >
                <MaterialIcons
                  style={{
                    marginLeft: 15,
                    padding: 5,
                  }}
                  name={showText ? "closed-caption" : "closed-caption-disabled"}
                  size={28}
                  color="white"
                />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => showOrHideTranslate()}
                style={{
                  color: "red",
                  padding: 5,
                }}
              >
                <MaterialIcons
                  style={{
                    padding: 5,
                    marginLeft: 15,
                  }}
                  name={
                    showTranslate ? "closed-caption" : "closed-caption-disabled"
                  }
                  size={28}
                  color="#1DB954"
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => refresh()}
                style={{
                  color: "red",
                  padding: 5,
                }}
              >
                <MaterialIcons
                  style={{
                    padding: 5,
                    marginLeft: 15,
                  }}
                  name={"refresh"}
                  size={28}
                  color="#fff"
                />
              </TouchableWithoutFeedback>
            </View>
          </View>

      </View>
      

          

          
         
      
    </TouchableWithoutFeedback>
    
  )
}  )

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height:HEIGHT
  },
  subtitle: {
    position: "absolute",
    bottom: 120,
    left: 5,
    right: 5,
  },
  text2: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    marginBottom: 7,
    zIndex: 999,
    padding: 5,
  },
  text3: {
    color: "#1DB954",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",

    zIndex: 999,
  },
  eyes: {
    //flex: 1,
    flexDirection: "row",
  },
  bottom: {
    position: "absolute",
    bottom: 60,
    right: 20,
  },


});

export default VideoPlayer2;