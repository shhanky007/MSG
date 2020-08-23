import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';


function BarcodeConfirmationScreen({ navigation }) {
  
    return (
        <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

                <View style={[CommonStyles.flex1, CommonStyles.flexDirectionColumn,]}>
                <View style={[CommonStyles.justifyContentCenter,CommonStyles.mt20,CommonStyles.alignItemCenter, CommonStyles.flexDirectionColumn,{elevation:40,backgroundColor:'#ffffff',margin:10,height:200}]}>

                   <Text style={[CommonStyles.textStyle20,CommonStyles.alignItemCenter]}>Thank You!</Text>
                   <Text style={[CommonStyles.textStyle20,CommonStyles.alignItemCenter,CommonStyles.mt10]}>Order Placed Successfully!</Text>

                   <Text style={[CommonStyles.fontFamilyNunitoSansSemiBold,CommonStyles.font18,{color:'#2B2B2B'},CommonStyles.alignItemCenter,CommonStyles.mt20]}>Your order number is</Text>
                   <Text style={[CommonStyles.fontFamilyNunitoSansSemiBold,CommonStyles.font18,{color:'#2B2B2B'},CommonStyles.alignItemCenter]}>RFK08983</Text>

                </View>

                   <TouchableOpacity underlayColor="white" style={[CommonStyles.flexDirectionRow, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.ml20, CommonStyles.mr20, CommonStyles.mt40, CommonStyles.appGreenButton, CommonStyles.p15]} >
                            <View style={[CommonStyles.flex1]}>
                                <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Done</Text>
                            </View>
                        </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default BarcodeConfirmationScreen