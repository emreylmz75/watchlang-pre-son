import {
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useImperativeHandle } from "react";
import { Provider, useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";
/* import {useTranslation} from 'react-i18next'
 */
const deviceHeight = Dimensions.get("window").height;
const ReviewPopUp = React.forwardRef(
    ({ props, onTouchOutside }, ref) => {
        const [text, onChangeText] = React.useState("");
        const [word, setWord] = React.useState("");
        const [translate, setTranslate] = React.useState("");
        const value =  AsyncStorage.getItem("token");

        const token = useSelector((state) => state.AuthReducers.authToken);
        /* const inputRef = useRef(); */
        const [showB, setShow] = useState(false);

        useImperativeHandle(ref, () => ({
            show,
            close,
        }));
        console.log(text);
/*         const {t,i18n} = useTranslation()
 */
        const sendCred = () => {
/*             const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            axios
                .post(
                    "http://192.168.1.161:3000/myword",
                    {
                        word,
                        translate,
                        listedBy: id,
                    },
                    config
                )
                .then(function (result) {
                    getMoreData();
                    onTouchOutside();
                })
                .catch((err) => {
                    console.log(err);
                });
 */        };

        const wordInputChange = (val) => {
            console.log(val);
            setWord(val);
        };

        const translateInputChange = (val) => {
            console.log(val);
            setTranslate(val);
        };

        const show = () => {
            setShow(true);
            console.log("hello");
        };
        const close = () => {
            setShow(false);
            console.log("hello");
        };

        const renderOutsideToucable = (onTouch) => {
            const view = <View style={{ flex: 1, width: "100%" }} />;
            if (!onTouch) return view;

            return (
                <TouchableWithoutFeedback
                    onPress={onTouch}
                    style={{ flex: 1, width: "100%" }}
                >
                    {view}
                </TouchableWithoutFeedback>
            );
        };

        const renderTitle = () => {
            return (
                <View>
                    <Text
                        style={{
                            color: "#182E44",
                            fontSize: 20,
                            fontWeight: "500",
                            margin: 15,
                        }}
                    >
                        Bize Sponsor Ol!
                    </Text>
                </View>
            );
        };

        const renderContent = () => {
            return (
                <View style={{ height: 610, flexDirection: "column" }}>

<View  style={{
                            paddingLeft: 5,
                            borderRadius: 10,
                        }}>
                    <Text style={{color:"gray",paddingTop:3}}>
                    ⭐ Kelime ara kısmında sınırsız videoya eriş.
                        </Text>
                        <Text style={{color:"gray",paddingTop:3}}>
                    ⭐ 24 Kelime Listesi ile 10.000'den fazla kelimeyi filmlerle öğren.
                        </Text>
                        <Text style={{color:"gray",paddingTop:3}}>
                    ⭐ 1000+ Phrasel Verbs'ü filmlerle öğren.
                        </Text>
                        <Text style={{color:"gray",paddingTop:3}}>
                    ⭐ 1000+ İngilizce kalıbı filmlerle öğren.
                        </Text>
                        <Text style={{color:"gray",paddingTop:3}}>
                    ⭐ İngilizce Tüm zamanları filmlerle öğren.
                        </Text>
                        <Text style={{color:"gray",paddingTop:3}}>
                    ⭐ Kendi Kelime Listelerini oluştur.
                        </Text>
                        <Text style={{color:"gray",paddingTop:3}}>
                    ⭐ Tüm Düzensiz fiilleri filmlerle öğren.
                        </Text>
                        <Text style={{color:"gray",paddingTop:3}}>
                    ⭐ 100+ Collocation'ı filmlerle öğren.
                        </Text>
                    </View>

                    <View  style={{
                            paddingLeft: 5,
                            borderRadius: 10
                            ,paddingTop:12
                        }}>
                            
                    <Text style={{color:"green"}}>
                        İlk 7 Gün Ücretsiz Dene. İstediğin zaman Google Aboneliklerden iptal edebilirsin.
                        </Text>
                        
                    </View>
                    
                    <View style={{ flex: 1}}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => sendCred()}>
                                <View
                                    /* colors={["#1DB954", "#01ab9d"]} */
                                    style={styles.signIn}
                                >
                                    <Text style={styles.textSign}>
                                    13$/month
                                    </Text>
                                    <MaterialIcons
                                        name="arrow-forward"
                                        size={20}
                                        color="green"
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => sendCred()}>
                                <View
                                    /* colors={["#1DB954", "#01ab9d"]} */
                                    style={styles.signIn}
                                >
                                    <Text style={styles.textSign}>
                                    99$/6month
                                    </Text>
                                    <MaterialIcons
                                        name="arrow-forward"
                                        size={20}
                                        color="green"
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => sendCred()}>
                                <View
                                    /* colors={["#1DB954", "#01ab9d"]} */
                                    style={styles.signIn}
                                >
                                    <Text style={styles.textSign}>
                                    149$/year
                                    </Text>
                                    <MaterialIcons
                                        name="arrow-forward"
                                        size={20}
                                        color="green"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        };

        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={showB}
                onRequestClose={close}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#000000AA",
                        justifyContent: "flex-end",
                    }}
                >
                    {renderOutsideToucable(onTouchOutside)}
                    <View
                        style={{
                            backgroundColor: "#FFFFFF",
                            width: "100%",
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            paddingHorizontal: 10,
                            maxHeight: deviceHeight * 0.8,
                        }}
                    >
                        {renderTitle()}
                        {renderContent()}
                    </View>
                </View>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    button: {
        margin: 5,
        marginBottom: 50,

    },
    signIn: {
        width: "100%",
        height: 60,
        backgroundColor:"white",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        
        /* borderTopWidth:1, */
        borderBottomWidth:1,

        borderColor: 'lightgray', 
        borderTopLeftRadius: 1, 
        borderStyle:'solid' 
    },
    textSign: {
        color: "gray",
    },
});

export default ReviewPopUp;
