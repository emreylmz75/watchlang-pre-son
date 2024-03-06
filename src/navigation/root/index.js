



import { Image, StyleSheet,View,Button } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SongInfoScreen from '../../components/0folder/SongInfoScreen'
import Word from '../../components/wordlist/index'
import MyList from '../../components/myList/index'
import VideoMe from '../../components/myList/VideoMe'

import Profile from '../../components/profile/index'
import MyWordComp from '../../components/myList/MyWord'
import Grammer from '../../components/grammer/index'
import VideoGrammer from '../../components/grammer/VideoGrammer'



import ListCount from '../../components/wordlist/ListCount'
import Video from '../../components/wordlist/Video'
import SignIn from '../../components/login/SignInScreen'
import SignUp from '../../components/login/SignUpScreen'
import PhraselVerbsList from '../../components/wordlist/PhraselVerbsList'
import PhraselVerbs from '../../components/wordlist/PhraselVerbs'
import Collocations from '../../components/wordlist/Collocations'
import IrregularVideo from '../../components/wordlist/IrregularVideo'
import IrregularVideoDetail from '../../components/wordlist/IrregularVideoDetail'



import LikeSong from '../../components/0folder/LikeSong'
import Search from '../../components/search/index'
import { createStackNavigator } from "@react-navigation/stack";




const BottomTab = createBottomTabNavigator();

const EmptyScreen = () => {
    
  
    return (
        <View>
            <Button
                
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
  };

  const WordStack = createStackNavigator();

  const WordScreen = () => (
    <WordStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        options={{ headerShown: false }}
    >
        <WordStack.Screen name="Word" component={Word} />
        <WordStack.Screen name="ListCount" component={ListCount} />
        <WordStack.Screen name="Video" component={Video} />
        <WordStack.Screen name="IrregularVideo" component={IrregularVideo} />

        <WordStack.Screen name="PhraselVerbsList" component={PhraselVerbsList} />
        <WordStack.Screen name="PhraselVerbs" component={PhraselVerbs} />
        <WordStack.Screen name="Collocations" component={Collocations} />


        
        
    </WordStack.Navigator>
);


const GrammerStack = createStackNavigator();

const GrammerScreen = () => (
  <GrammerStack.Navigator
      screenOptions={{
          headerShown: false,
      }}
      options={{ headerShown: false }}
  >
      <GrammerStack.Screen name="Grammer" component={Grammer} />
      <GrammerStack.Screen name="VideoGrammer" component={VideoGrammer} />


      
      
  </GrammerStack.Navigator>
);



const MyWord = createStackNavigator();

  const MyWordScreen = () => (
    <MyWord.Navigator
        screenOptions={{
            headerShown: false,
        }}
        options={{ headerShown: false }}
    >
        <MyWord.Screen name="MyList" component={MyList} />
        <MyWord.Screen name="SignIn" component={SignIn} />
        <MyWord.Screen name="SignUp" component={SignUp} />
        <MyWord.Screen name="MyWord" component={MyWordComp} />
        <MyWord.Screen name="VideoMe" component={VideoMe} />


        


    </MyWord.Navigator>
);


const Me = createStackNavigator();

  const ProfileScreen = () => (
    <Me.Navigator
        screenOptions={{
            headerShown: false,
        }}
        options={{ headerShown: false }}
    >
        <Me.Screen name="Profile" component={Profile} />
        


    </Me.Navigator>
);


export default function Root() {
    return (
        <NavigationContainer>
        <BottomTab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: "#040306", borderWidth: 0 },
                headerShown: false,
                tabBarActiveTintColor: "white",
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={WordScreen} //SongInfoScreen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../../assets/home.png")}
                            style={[
                                styles.bottomTabIcon,
                                focused && styles.bottomTabIconFocused,
                            ]}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Discover"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../../assets/search.png")}
                            style={[
                                styles.bottomTabIcon,
                                focused && styles.bottomTabIconFocused,
                            ]}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="NewVideo"
                component={GrammerScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../../assets/new-video.png")}
                            style={[
                                styles.newVideoButton,
                                focused && styles.bottomTabIconFocused,
                            ]}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Search"
                component={MyWordScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../../assets/message.png")}
                            style={[
                                styles.bottomTabIcon,
                                focused && styles.bottomTabIconFocused,
                            ]}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("../../../assets/user.png")}
                            style={[
                                styles.bottomTabIcon,
                                focused && styles.bottomTabIconFocused,
                            ]}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    bottomTabIcon: {
        width: 20,
        height: 20,
        tintColor: "grey",
    },
    bottomTabIconFocused: {
        tintColor: "white",
    },
    newVideoButton: {
        width: 50,
        height: 25,
    },
});
