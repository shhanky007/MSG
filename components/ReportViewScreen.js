
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, Text, Button } from 'react-native';
import CommonStyles from '../common/CommonStyles'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingIcon from './LoadingIcon';


export function ReportViewScreen({ navigation, route }) {
  const { reportId } = route.params;

  const [url, setUrl] = useState('');
  const [data, setData] = useState({
    iconAnimating: true,
  });
  useEffect(() => {
    getCustomerId()

  }, [])

  const getCustomerId = async () => {
    const customer_id = await AsyncStorage.getItem('MGS_customer_id')

    let url = 'https://moderngenomic.com/#/ViewReport/' + reportId + '/' + customer_id
    setUrl(url)

  }


  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
      <WebView
        originWhitelist={['*']}
        onLoadProgress={() => {
          setData({ ...data, iconAnimating: false })
        }}
        source={{
          uri: url
        }}
       
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

    </SafeAreaView>

  );


}