
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';
import { postService, validateEmail } from '../common/Services';
import LoadingIcon from './LoadingIcon'
import PassKey from '../assets/icons/pass_key';
import { CommonInputBox } from './CommonInputText';
import { useNetInfo } from "@react-native-community/netinfo";

function GenerateNewPasswordScreen({ navigation, route }) {
  const netInfo = useNetInfo();
  const { email } = route.params;

  const [data, setData] = React.useState({
    tempPassword: '',
    password: '',
    confirmPassword: '',
    iconAnimating: false,
  });


  let callNewPassWordGenerateAPI = () => {

    if (!data.tempPassword) {
      alert('Please enter tempory password.')
      return false;
    }
    if (!data.password) {
      alert('Please enter password')
      return false;
    }
    if (!data.confirmPassword) {
      alert('Please enter confirm password')
      return false;
    }
    if (!data.password.endsWith(data.confirmPassword)) {
      alert('Password and Confirm Password does not match')
      return false;
    }
    if (!netInfo.isConnected) {
      alert('Please checked your internet connection')
      return false;
    }
    setData({ ...data, iconAnimating: true })
    let logindata = {};
    logindata.email = email;
    logindata.tempPass = data.tempPassword;
    logindata.newPass = data.password;
    logindata.confPass = data.confirmPassword;

    postService('customer/updatePassword', logindata).then(res => {
      console.log(res)
      if (res.status == 200) {
        let responsedata = res.data && Object.keys(res.data).length > 0 ? res.data : {}

        setData({ ...data, iconAnimating: false })
        alert(res.message)
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn'}],
      });

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
              <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansBold, CommonStyles.font30, { color: '#2B2B2B' }]}>Generate New Password</Text>

            </View>
          </View>

          <View style={[, CommonStyles.flex1, CommonStyles.flexDirectionColumn, CommonStyles.ml20, CommonStyles.mr20]}>


            <CommonInputBox
              icon={<PassKey />
              }
              secureTextEntry={true}
              placeholederName={'Temporary Password'}
              textValue={data.tempPassword}
              onvalueChange={(value) => setData({ ...data, tempPassword: value })}
              textStyle={CommonStyles.textStyle16} />
            <CommonInputBox
              icon={<PassKey />
              }
              secureTextEntry={true}
              placeholederName={'New Password'}
              textValue={data.password}
              onvalueChange={(value) => setData({ ...data, password: value })}
              textStyle={CommonStyles.textStyle16} />
            <CommonInputBox
              icon={<PassKey />
              }
              secureTextEntry={true}
              placeholederName={'New Confirm Password'}
              textValue={data.confirmPassword}
              onvalueChange={(value) => setData({ ...data, confirmPassword: value })}
              textStyle={CommonStyles.textStyle16} />


            <TouchableOpacity underlayColor="white" onPress={() => callNewPassWordGenerateAPI()}
              style={[CommonStyles.flexDirectionRow, CommonStyles.mt20, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.appDarkBlackButton, CommonStyles.p15]} >
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

export default GenerateNewPasswordScreen