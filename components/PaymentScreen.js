import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, BackHandler,TextInput, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';

import SuccessIcon from '../assets/icons/sucessIcon'
import ErrorIcon from '../assets/icons/ErrorIcon'
import NetInfo from "@react-native-community/netinfo";
import { getService } from '../common/Services';
import LoadingIcon from './LoadingIcon';



const PaymentScreen = ({ navigation }) => {
  const route = useRoute();
  let data = route.params;
  const [showdata, setShowData] = useState({
    iconAnimating: false,
    isCovidButtonShow: false
  });
  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        checkCovidTest()
      }
    });
  }
  // const backAction = () => {
  //   navigation.replace('ServiceScreen')
  // };

  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", backAction);
    checkInternet()
    // return () =>
    //   BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
 

  let checkCovidTest = () => {
    setShowData({ ...data, iconAnimating: true })
    if (data.orderId) {
      let url = 'order/covidOrder/' + data.orderId;
      getService(url).then(res => {
        console.log('covidOrder', res);
        if (res.status == 200) {
          let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : {}
          setShowData({ ...data, iconAnimating: false, isCovidButtonShow: true })

        } else {
          setShowData({ ...data, iconAnimating: false })
        }
      }).catch(err => {
        setShowData({ ...data, iconAnimating: false })
        console.log(err)
      })
    }
  }
  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
      <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[CommonStyles.flex1, { marginTop: 60 }, CommonStyles.pt20, CommonStyles.pb20, CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
          {
            data && data.status == 'success' ?
              <>
                <SuccessIcon />
                <Text style={[CommonStyles.font18, CommonStyles.fontBold, CommonStyles.mt10]}>Payment Successful</Text>
              </> :
              <>
                <ErrorIcon />
                <Text style={[CommonStyles.font18, CommonStyles.fontBold, CommonStyles.mt10]}>Payment Failed</Text>
              </>
          }
          <Text style={[CommonStyles.font18, CommonStyles.fontBold, CommonStyles.mt10]}>Your order Id is {data.orderId} </Text>

          {showdata.isCovidButtonShow ?
            <TouchableOpacity
              onPress={() => {
                if (data.orderId)
                  navigation.navigate('CovidFormScreen', { oderId: data.oderId })
              }}
              style={[CommonStyles.appGreenButton, { padding: 20, marginTop: 20 }, CommonStyles.justifyContentCenter, CommonStyles.mr10, { borderColor: 'transparent' }]}>

              <Text style={[CommonStyles.fontBold, CommonStyles.textCenter, CommonStyles.colorWhite, CommonStyles.textUppercase]}>FILL THE COVID-19 REQUISITION FORM</Text>

            </TouchableOpacity> : null
          }
        </View>
        <View style={[CommonStyles.flex10, CommonStyles.justifyContentEnd, CommonStyles.plr10, CommonStyles.mb20]}>

          <TouchableOpacity style={[CommonStyles.roundBtn, CommonStyles.grayBG]}
            onPress={() => navigation.navigate('ServiceScreen')}
          >
            <Text style={[CommonStyles.textCenter, CommonStyles.colorWhite]}>Home</Text>
          </TouchableOpacity>


        </View>
        {showdata.iconAnimating ? <LoadingIcon isIconAnimating={showdata.iconAnimating} /> : null}

      </ScrollView>
    </SafeAreaView>
  );
}

export default PaymentScreen