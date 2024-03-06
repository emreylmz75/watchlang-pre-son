import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import store from "./src/store/store";

import Root from './src/navigation/root/index'
export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
      <Root/>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:100,
    weight:100,
  },
});
