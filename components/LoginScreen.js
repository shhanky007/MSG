
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';


export function LoginScreen({ navigation }) {

  // const [count,setCount]=useState(0);
  //   useEffect(()=>{

  //   },[]);
  let logo = require('../assets/logo.png');
  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
      <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

        <View style={[CommonStyles.flex1, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter,]}>

          <View style={[CommonStyles.flex3, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
            <View style={[CommonStyles.flexDirectionColumn, CommonStyles.alignItemCenter]}>
              <Image source={logo} />
              {/* <Logo /> */}
            </View>
          </View>

          <View style={[, CommonStyles.flex1, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter]}>

            <TouchableOpacity underlayColor="white" onPress={() => navigation.navigate('SignIn')}
              style={[CommonStyles.flexDirectionRow, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.ml20, CommonStyles.mr20, CommonStyles.appBlackButton, CommonStyles.p15]} >
              <View style={[CommonStyles.flex1]}>
                <Text style={[CommonStyles.textCenter, { fontFamily: 'NunitoSans-SemiBold' }, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Sign In</Text>
              </View>
            </TouchableOpacity>


            <View style={[CommonStyles.flexDirectionRow, CommonStyles.mt20, CommonStyles.mb20, CommonStyles.justifyContentCenter]}>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: 'grey', alignSelf: 'center',
                  borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                }} />

              <Text style={[CommonStyles.alignSelfCenter, { fontFamily: 'NunitoSans-SemiBold', color: '#6C6867' }, CommonStyles.font16, CommonStyles.mb5]}>or</Text>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: 'grey', alignSelf: 'center',
                  borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                }} />
            </View>


            <TouchableOpacity underlayColor="white" onPress={() => navigation.navigate('CreateAccountScreen')}
              style={[CommonStyles.flexDirectionRow, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.ml20, CommonStyles.mr20, CommonStyles.appWhiteButton]} >
              <View style={[CommonStyles.flex1]}>
                <Text style={[CommonStyles.textCenter, { fontFamily: 'NunitoSans-SemiBold' }, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.fontBold, CommonStyles.colorGrey]}>Create Account</Text>
              </View>
            </TouchableOpacity>


            <View style={[CommonStyles.flexDirectionRow, CommonStyles.mt20, CommonStyles.mb20, CommonStyles.justifyContentCenter]}>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: 'grey', alignSelf: 'center',
                  borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                }} />

              <Text style={[CommonStyles.alignSelfCenter, { fontFamily: 'NunitoSans-SemiBold', color: '#6C6867' }, CommonStyles.font16, CommonStyles.mb5]}>or</Text>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: 'grey', alignSelf: 'center',
                  borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                }} />
            </View>

            <TouchableOpacity underlayColor="white" onPress={() => navigation.navigate('RegisterForKitScreen')}
              style={[CommonStyles.flexDirectionRow, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.ml20, CommonStyles.mr20, CommonStyles.appGreenButton, CommonStyles.p15]} >
              <View style={[CommonStyles.flex1]}>
                <Text style={[CommonStyles.textCenter, { fontFamily: 'NunitoSans-SemiBold' }, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.fontBold, CommonStyles.colorWhite]}>Register For Kit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity underlayColor="white" onPress={() =>{
              navigation.replace('App')}}>

              <Text style={[CommonStyles.textCenter, , { marginTop: 30, fontFamily: 'NunitoSans-SemiBold' }, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorGrey]}>Skip to Shop</Text>

            </TouchableOpacity>          
            </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}