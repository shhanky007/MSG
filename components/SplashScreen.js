
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';
import { LoginScreen } from './LoginScreen';


function SplashScreen({ navigation }) {
  // const [data, setData] = useState({
  //   Hide_Splash_Screen: false
  // });
  // useEffect(() => {
  //   setTimeout(function () {
  //     setData({ ...data, Hide_Splash_Screen: true })
  //   }, 2000);
  // }, []);
  let logo = require('../assets/splash_logo.png');
  return (
    // data.Hide_Splash_Screen == false ?
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
      <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

        <View style={[CommonStyles.flex1, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter,]}>

          <View style={[CommonStyles.flex3, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
            <View style={[CommonStyles.flexDirectionColumn, CommonStyles.alignItemCenter]}>
              <Image source={logo} />
              {/* <Logo /> */}
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView> 
  );
}

export default SplashScreen