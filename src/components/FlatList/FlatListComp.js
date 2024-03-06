
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
import React, { useEffect, useRef, useState,useMemo,useCallback } from "react";

export default function FlatListComp({...props}) {


           
  return (
    <>
    <FlatList {...props}/>
    </>

  )
}
