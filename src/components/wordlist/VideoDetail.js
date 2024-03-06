import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
    useEffect,
    useState
} from "react";
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback,Text} from 'react-native';
import { Video } from 'expo-av';
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

export const VideoPlayer =forwardRef(
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
            doSomething,
            dontSomething,
            words,
           
        },
        parentRef
    ) => {

  const [paused, setPaused] = useState(false)
  const video = useRef();

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

  return (
   
    <TouchableWithoutFeedback onPress={onPlayPausePress}>
       
      <View style={styles.container}>
      <View
            style={{
              padding: 5,
              marginTop:0,
              position:"absolute",
              top:0,
              left:5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
      <View style={{ flexDirection: "row", alignItems: "center",
                  }}>
              
              <View>
             <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {words.word} 
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#1DB954",
                }}
              >
                {words.translate}
              </Text>
             </View>
            </View>
  </View>

            
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
       <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 20,
                                }}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => dontSomething()}
                                    style={{
                                        color: "red",
                                        padding: 5,
                                    }}
                                >
                                    <AntDesign
                                        style={{
                                            marginLeft: 5,
                                            padding: 5,
                                        }}
                                        name={"left"}
                                        size={28}
                                        color="white"
                                    />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => doSomething()}
                                    style={{
                                        color: "red",
                                        padding: 5,
                                    }}
                                >
                                    <AntDesign
                                        style={{
                                            marginLeft: 5,
                                            padding: 5,
                                        }}
                                        name={"right"}
                                        size={28}
                                        color="white"
                                    />
                                </TouchableWithoutFeedback>
                            </View>

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

export default VideoPlayer;