
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, Text, Button } from 'react-native';
import CommonStyles from '../common/CommonStyles'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingIcon from './LoadingIcon';


export function CovidFormScreen({ navigation, route }) {

  const {orderId}=route.params

  const [data, setData] = useState({
    iconAnimating: false,
  });
  
  // useEffect({
  //   // let url='https://www.moderngenomic.com/test/#/covid-eform/'+orderId
    
  // },[])


  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
      <WebView
      ignoreSslError={true}
        originWhitelist={['*']}
        onLoadProgress={() => {
          setData({ ...data, iconAnimating: false })
        }}
        source={{
          uri: 'https://www.moderngenomic.com/test/#/covid-eform/'+orderId
          // uri: 'https://www.moderngenomic.com/test/#/ViewReport/528429/688224'
        }}
       
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

    </SafeAreaView>

  );


}