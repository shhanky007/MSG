
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';
import LoadingIcon from '../components/LoadingIcon'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import MobileForContact from '../assets/icons/MobileForContact';
import Email from '../assets/icons/Email';
import Address from '../assets/icons/Address';
import Fax from '../assets/icons/Fax';
import { getFormatedDate, getHeaderService } from '../common/Services';
import { AuthContext } from '../context';


export function ProfileScreen({ navigation }) {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    dob: '',
    addressLine1: '',
    // addressLine2: '',
    // country: '',
    // state: '',
    // city: '',
    // zipCode: '',
    gender: '',
    iconAnimating: false,

  });
  const { signOut } = React.useContext(AuthContext);

  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        getsinglecustomerdetails();
      } else {
        alert('Please checked your internet connection.')
      }
    });
  }


  useEffect(() => {
   
    navigation.addListener('focus', () => {
      checkInternet()
    })
  }, [])


  let getsinglecustomerdetails = async () => {

    setData({ ...data, iconAnimating: true })
    const customer_id = await AsyncStorage.getItem('MGS_customer_id')

    let url = 'customer/getsinglecustomerdetails/' + customer_id;
    getHeaderService(url).then(res => {
      if (res.status == 200) {
        let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : {}

        setData({ ...data, iconAnimating: false })

        let rsData = responseData[0];
        let addd = rsData.address.split('@').join(',')
        console.log('sdfsdfkj', addd);
        setData({
          ...data,
          firstName: rsData.f_name ? rsData.f_name : '',
          lastName: rsData.l_name ? rsData.l_name : '',
          email: rsData.email ? rsData.email : '',
          mobileNumber: rsData.mobile_no ? rsData.mobile_no.toString() : '',
          dob: rsData.date_of_birth ? rsData.date_of_birth : '',
          addressLine1: rsData.address ? rsData.address.split('@').join(',') : '',
          // country: rsData.address ? rsData.address : '',
          // state: rsData.address ? rsData.address : '',
          // city: rsData.address ? rsData.address : '',
          // zipCode: rsData.address ? rsData.address : '',
          gender: rsData.gender ? rsData.gender : ''
        })

      } else if (res.status == 201) {
        signOut()
      }
      else {
        setData({ ...data, iconAnimating: false })
        alert(res.message)
      }
    }).catch(err => {
      setData({ ...data, iconAnimating: false })
      console.log(err)
    })
  }




  return (
    <SafeAreaView style={[CommonStyles.flex1, { backgroundColor: '#F4F4F4' }, CommonStyles.justifyContentStart]}>
      <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

        <View style={[CommonStyles.flex1, CommonStyles.mlrt20, CommonStyles.flexDirectionColumn]}>

          <Text style={[CommonStyles.textStyle20]}>
            {data.firstName + ' ' + data.lastName}
          </Text>
          <Text style={[CommonStyles.textStyle14,]}>
            {data.email}
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
              <Text style={[CommonStyles.textStyle13]}>Date of Birth</Text>
              <Text style={[CommonStyles.textStyleSemiBold14]}>{getFormatedDate(data.dob)}</Text>
            </View>
          </View>

          <View style={[CommonStyles.flexDirectionRow, CommonStyles.mt20]}>
            <Email />
            <View style={[CommonStyles.justifyContentCenter]}>
              <Text style={[CommonStyles.textStyle13]}>Gender</Text>
              <Text style={[CommonStyles.textStyleSemiBold14]}>{data.gender}</Text>
            </View>
          </View>

          <View style={[CommonStyles.flexDirectionRow, CommonStyles.mr10, CommonStyles.mt20]}>
            <Address />
            <View style={[CommonStyles.justifyContentCenter]}>
              <Text style={[CommonStyles.textStyle13]}>Address</Text>
              <Text style={[CommonStyles.textStyleSemiBold14, { paddingRight: 20 }]}>{data.addressLine1}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}
    </SafeAreaView>
  );

}