
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';
import { postService, validateEmail } from '../common/Services';
import LoadingIcon from '../components/LoadingIcon'
import PassKey from '../assets/icons/pass_key';
import { CommonInputBox } from './CommonInputText';
import { useNetInfo } from "@react-native-community/netinfo";
import {AuthContext} from '../context';

function SignInScreen({ navigation }) {
  const netInfo = useNetInfo();
  const { signIn } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    email: '',
    password: '',
    iconAnimating: false,
  });
 

  let handleLogin = () => {
    
    if (!data.email || !data.password) {
      alert('Please fill the required fields.')
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
    logindata.password = data.password;

    postService('customer/customerLogin', logindata).then(res => {
      console.log(res)
      if (res.status == 200) {
        let responsedata = res.data && Object.keys(res.data).length > 0 ? res.data : {}
     
        setData({ ...data, iconAnimating: false })

        signIn(responsedata[0]);
      
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

          <View style={[CommonStyles.flex2, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
            <View style={[CommonStyles.flexDirectionColumn, CommonStyles.alignItemCenter]}>
              <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansBold, CommonStyles.font30, { color: '#2B2B2B' }]}>Sign In</Text>

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

            <CommonInputBox
              icon={<PassKey />
              }
              secureTextEntry={true}
              placeholederName={'Password'}
              textValue={data.password}
              onvalueChange={(value) => setData({ ...data, password: value })}
              textStyle={CommonStyles.textStyle16} />

            <TouchableOpacity onPress={()=>navigation.navigate('ForgetPasswordScreen')}
            style={[CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter, CommonStyles.mt20, CommonStyles.mb20, CommonStyles.font16, CommonStyles.fontFamilyNunitoSansRegular]}>
              <Text style={{ color: '#55B9A7' }}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity underlayColor="white" onPress={() => handleLogin()}
              style={[CommonStyles.flexDirectionRow, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.appDarkBlackButton, CommonStyles.p15]} >
              <View style={[CommonStyles.flex1]}>
                <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Sign In</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity underlayColor="white" onPress={() => navigation.navigate('CreateAccountScreen')}
              style={[CommonStyles.flexDirectionRow, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.mt40, CommonStyles.appGreenButton, CommonStyles.p15]} >
              <View style={[CommonStyles.flex1]}>
                <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Create Account</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}
    </SafeAreaView>
  );
}

export default SignInScreen