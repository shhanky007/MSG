
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';

import LoadingIcon from '../components/LoadingIcon'
import NetInfo from "@react-native-community/netinfo";

import MobileForContact from '../assets/icons/MobileForContact';
import Email from '../assets/icons/Email';
import Address from '../assets/icons/Address';
import Fax from '../assets/icons/Fax';
import { getHeaderService, getService } from '../common/Services';

export function ContactUsScreen({ navigation }) {

  const [data, setData] = React.useState({
    mobileNumber: '',
    fax: '',
    email: '',
    address: '',
    other_way:''
  });

  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        getContactList()
      } else {
        alert('Please checked your internet connection.')
      }
    });
  }


  let getContactList = () => {

    setData({ ...data, iconAnimating: true })

    let url = 'contactUs/contactUs';
    getService(url).then(res => {
      if (res.status == 200) {
        let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : {}

        setData({
          ...data, iconAnimating: false, mobileNumber: responseData.mobile_no,
          fax: responseData.fax,
          email: responseData.email_address,
          address: responseData.address,
          other_way:responseData.other_way
        })
      }else{
        setData({ ...data, iconAnimating: false })
      }
    }).catch(err => {
      setData({ ...data, iconAnimating: false })
      console.log(err)
    })
  }

  useEffect(() => {
    checkInternet()

  }, [])

  return (
    <SafeAreaView style={[CommonStyles.flex1, { backgroundColor: '#F4F4F4' }, CommonStyles.justifyContentStart]}>
      <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

        <View style={[CommonStyles.flex1, CommonStyles.mlrt20, CommonStyles.flexDirectionColumn]}>

          <Text style={[CommonStyles.textStyle20]}>
            Other way to connect
            </Text>
          <Text style={[CommonStyles.textStyle14,]}>
           {data.other_way}
            </Text>

          <View style={[CommonStyles.flexDirectionRow, CommonStyles.mt20]}>
            <MobileForContact />
            <View style={[CommonStyles.justifyContentCenter]}>
              <Text style={[CommonStyles.textStyle13]}>Mobile Number</Text>
              <Text style={[CommonStyles.textStyleSemiBold14]}>{data.mobileNumber}</Text>
            </View>
          </View>

          <View style={[CommonStyles.flexDirectionRow, CommonStyles.mt20]}>
            <Fax />
            <View style={[CommonStyles.justifyContentCenter]}>
              <Text style={[CommonStyles.textStyle13]}>Fax</Text>
              <Text style={[CommonStyles.textStyleSemiBold14]}>{data.fax}</Text>
            </View>
          </View>

          <View style={[CommonStyles.flexDirectionRow, CommonStyles.mt20]}>
            <Email />
            <View style={[CommonStyles.justifyContentCenter]}>
              <Text style={[CommonStyles.textStyle13]}>Email Address</Text>
  <Text style={[CommonStyles.textStyleSemiBold14]}>{data.email}</Text>
            </View>
          </View>

          <View style={[CommonStyles.flexDirectionRow, CommonStyles.mr10, CommonStyles.mt20]}>
            <Address />
            <View style={[CommonStyles.justifyContentCenter]}>
              <Text style={[CommonStyles.textStyle13]}>Address</Text>
  <Text style={[CommonStyles.textStyleSemiBold14, { paddingRight: 20 }]}>{data.address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}
    </SafeAreaView>
  );


}