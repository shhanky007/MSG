
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
import CommonStyles from '../common/CommonStyles'
import FeedbackGraphics from '../assets/icons/Feedback_Graphics';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Greate from '../assets/icons/Greate';
import Good from '../assets/icons/Good';
import Excellant from '../assets/icons/Excellant';
import Sad from '../assets/icons/Sad';
import VerySad from '../assets/icons/VerySad';
import { useNetInfo } from "@react-native-community/netinfo";
import LoadingIcon from './LoadingIcon';
import { postService } from '../common/Services';

export function FeedbackScreen({ navigation }) {
  const netInfo = useNetInfo();

  const [data, setData] = useState({
    choiceFeedback: '',
    rate: 0,
    iconAnimating: false,

  });


  let updateFeedback = () => {

    if (!data.choiceFeedback) {
      alert('Please fill the required fields.')
      return false;
    }
    if (data.rate == 0) {
      alert('Please select rating.')
      return false;
    }

    if (!netInfo.isConnected) {
      alert('Please checked your internet connection')
      return false;
    }
    setData({ ...data, iconAnimating: true })
    let logindata = {};
    logindata.feedback_text = data.choiceFeedback;
    logindata.rate = data.rate;

    postService('contactUs/feedback', logindata).then(res => {
      if (res.status == 200) {
        let responsedata = res.data && Object.keys(res.data).length > 0 ? res.data : {}
        setData({ ...data, iconAnimating: false ,choiceFeedback: '',
        rate: 0})
        alert(responsedata)
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
        <View style={[CommonStyles.flexDirectionColumn, CommonStyles.mt20]}>
          <View style={[CommonStyles.alignItemCenter, { position: 'absolute', width: '100%' }, CommonStyles.justifyContentCenter, CommonStyles.mt20]}>
            <FeedbackGraphics />
          </View>
          <View style={
            { position: 'absolute', width: '100%', marginTop: 100 }
          }>
            <View style={[CommonStyles.flex1, , CommonStyles.bgWhite, CommonStyles.p20, CommonStyles.mlrt16, { marginBottom: 16, borderRadius: 10 }, { elevation: 20 }]}>
              <View style={CommonStyles.alignItemCenter}>
                <Text style={[, CommonStyles.textStyle18]}>Send us your Feedback!</Text>
                <Text style={[, CommonStyles.textStyle14]}>We would love hear from you! </Text>
                <Text style={[, CommonStyles.textStyle14]}>It helpus to do the best</Text>
              </View>
              <View style={[CommonStyles.flexDirectionRow, CommonStyles.mt10, CommonStyles.justifyContentBetween]}>
                <TouchableOpacity onPress={() => { setData({ ...data, rate: 1 }) }}>
                  <VerySad color={data.rate == 1 ? '#0a860a' : '#575858'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setData({ ...data, rate: 2 }) }}>
                  <Sad color={data.rate == 2 ? '#0a860a' : '#575858'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setData({ ...data, rate: 3 }) }}>
                  <Good color={data.rate == 3 ? '#0a860a' : '#575858'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setData({ ...data, rate: 4 }) }}>
                  <Greate color={data.rate == 4 ? '#0a860a' : '#575858'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setData({ ...data, rate: 5 }) }}>
                  <Excellant color={data.rate == 5 ? '#0a860a' : '#575858'} />
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder='Type your feedback here'
                placeholderTextColor="#2B2B2B" numberOfLines={5} multiline={true}
                style={[CommonStyles.flex10, { height: 100, paddingBottom: 5, backgroundColor: '#fff', borderRadius: 10, marginTop: 10, borderWidth: 0.5 },]}
                textAlignVertical={"top"}
                value={data.choiceFeedback}
                onChangeText={(value) => setData({ ...data, choiceFeedback: value })}
              />

              <TouchableOpacity underlayColor="white" onPress={() => updateFeedback()}
                style={[CommonStyles.flexDirectionRow, CommonStyles.mt20, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.appBlackButton, CommonStyles.p15]} >
                <View style={[CommonStyles.flex1]}>
                  <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Submit Feedback</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

    </SafeAreaView>
  );
}