import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React ,{useContext} from  "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const SongItem = ({ item, onPress, isPlaying }) => {


  return (
    <Pressable
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
    </Pressable>
  );
};

export default SongItem;

const styles = StyleSheet.create({});