
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';
import { postService, validateEmail } from '../common/Services';
import LoadingIcon from './LoadingIcon'
import PassKey from '../assets/icons/pass_key';
import { CommonInputBox } from './CommonInputText';
import { useNetInfo } from "@react-native-community/netinfo";

function ForgetPasswordScreen({ navigation }) {
  const netInfo = useNetInfo();

  const [data, setData] = React.useState({
    email: '',
  
    iconAnimating: false,
  });
 

  let callForgetApi = () => {
   
    if (!data.email) {
      alert('Please enter email address.')
      return false;
    }
    if (!validateEmail(data.email)) {
      alert('Email Address is not valid')
      return false;
    }
    if (!netInfo.isConnected) {
      alert('Please checked your internet connection')
      return false;
    }
    setData({ ...data, iconAnimating: true })
    let logindata = {};
    logindata.email = data.email;
  
    postService('customer/forgotpassword', logindata).then(res => {
      console.log(res)
      if (res.status == 200) {
        let responsedata = res.data && Object.keys(res.data).length > 0 ? res.data : {}
     
        setData({ ...data, iconAnimating: false })
        alert('Temporary password send on email successfully.')
        navigation.replace('GenerateNewPasswordScreen',{email:data.email})
      
      } else {
        setData({ ...data, iconAnimating: false })
        alert(res.message)
      }
    }).catch(err => {
      setData({ ...data, iconAnimating: false })
      console.log(err)
    })



  }
  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
      <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

        <View style={[CommonStyles.flex1, CommonStyles.bgWhite, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter,]}>

          <View style={[CommonStyles.flex1, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
            <View style={[CommonStyles.flexDirectionColumn, CommonStyles.alignItemCenter]}>
              <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansBold, CommonStyles.font30, { color: '#2B2B2B' }]}>Forget Password</Text>

            </View>
          </View>

          <View style={[, CommonStyles.flex1, CommonStyles.flexDirectionColumn, CommonStyles.ml20, CommonStyles.mr20]}>


            <CommonInputBox
              icon={<Text style={{ fontSize: 30, color: '#b3b3b3' }}>@</Text>
              }
              placeholederName={'Email Address'}
              textValue={data.email}
              onvalueChange={(value) => setData({ ...data, email: value })}
              textStyle={CommonStyles.textStyle16} />

            

            <TouchableOpacity underlayColor="white" onPress={() => callForgetApi()}
              style={[CommonStyles.flexDirectionRow,CommonStyles.mt20, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.appDarkBlackButton, CommonStyles.p15]} >
              <View style={[CommonStyles.flex1]}>
                <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Submit</Text>
              </View>
            </TouchableOpacity>

           
          </View>

        </View>
      </ScrollView>
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}
    </SafeAreaView>
  );
}

export default ForgetPasswordScreen