import { Video } from "expo-av";
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";

import { ActivityIndicator, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Ionicons,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";

//the official library is deprecated. I have updated it this version
import InViewPort from "./InViewPort";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export const VideoPlayer = forwardRef(
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
    const [paused, setPaused] = useState(false);
    const video = useRef();
    const [isPreloading, setIsPreloading] = useState(true);
    const navigation = useNavigation();

    const stopVideo = () => {
      if (video.current) {
        video.current.stopAsync();
      }
    };

    const playVideo = () => {
      if (video.current) {
        video.current.playAsync();
      }
    };

    const handlePlaying = (isVisible) => {
      isVisible ? playVideo() : stopVideo();

      console.log("geçildi");
    };

    useEffect(() => {
      console.log("basıldı");
      console.log(paused);
    }, [paused]);

    //using async is more reliable than setting shouldPlay with state variable
    const onPlayPausePress = () => {
      console.log("basıldı");
      if (!paused) {
        video.current.pauseAsync();
        setPaused(!paused);
      } else {
        video.current.playAsync();
        setPaused(!paused);
      }
    };

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 99999999 }}
        onPress={onPlayPausePress}
      >
        <InViewPort onChange={handlePlaying}>
          <View style={styles.container}>
            {isPreloading && (
              <ActivityIndicator
                animating
                color={"gray"}
                size="large"
                style={{
                  flex: 1,
                  position: "absolute",
                  top: "50%",
                  left: "45%",
                }}
              />
            )}
            <Video
              rate={0.91}
              ref={video}
              source={{
                uri:
                  "https://aws-joygoy-s3.s3.eu-central-1.amazonaws.com/" +
                  item?.number +
                  ".mp4",
              }}
              resizeMode="cover"
              isLooping
              onLoadStart={() => setIsPreloading(true)}
              onReadyForDisplay={() => setIsPreloading(false)}
              style={styles.container2}
            />
          </View>

          <View
            style={{
              padding: 5,
              marginTop: 0,
              position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {item.word}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#1DB954",
                  }}
                >
                  {item.translate}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.subtitle}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 140,
              }}
            >
              <TouchableWithoutFeedback
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
          </View>

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
        </InViewPort>
      </TouchableWithoutFeedback>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "space-between",
  },
  eyes: {
    //flex: 1,
    flexDirection: "row",
  },
  container2: {
    //marginTop: Constants.statusBarHeight,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 350,
    marginBottom: 140,
    position: "absolute",
    bottom: 0,
    //padding: 20,
    paddingTop: 5,
    //paddingLeft: 15,

    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    paddingTop: 110,
  },
  deneme: {
    //paddingTop: 35,
    /* paddingTop: 20,
      marginLeft: 15, */
  },
  text: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
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
  subtitle: {
    position: "absolute",
    bottom: 80,
    left: 5,
    right: 5,
    /* marginRight:40, */
    /* backgroundColor:"black", */
    //marginTop: 250,

    /* marginHorizontal: 15, */
  },
  bottom: {
    position: "absolute",
    bottom: 30,
    right: 20,
    /*  flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 25,
      marginHorizontal: 15, */
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  bottomText: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  displayName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
    marginTop: -1,
  },
  description: {
    marginTop: -2,
    color: "#1DB954",
    fontSize: 15,
    fontWeight: "bold",
    width: 200,
  },
  avatar: {
    marginRight: 15,
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  plusIcon: {
    height: 35,
    width: 35,
    borderRadius: 10,
  },
});

export default VideoPlayer;
