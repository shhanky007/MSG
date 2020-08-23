import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';
import { Image } from 'react-native';
import User from '../assets/icons/user';
import LoadingIcon from '../components/LoadingIcon'
import { postService, getCustomerId ,postHeaderService} from '../common/Services';
import { CommonDatePicker } from './CommonDatePicker'
import { CommonInputBox } from './CommonInputText';
import AsyncStorage from '@react-native-community/async-storage';
import { useNetInfo } from "@react-native-community/netinfo";
import {AuthContext} from '../context';


function BarCodeScreen({ route, navigation }) {
    const netInfo = useNetInfo();
    const { signUp } = React.useContext(AuthContext);

    const { f_name } = route.params;
    const { l_name } = route.params;
    const { dob } = route.params;


    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        usingKit: '',
        iconAnimating: false,
        barcodeNumber: ''
    });

    useEffect(() => {
        setData({ ...data, firstName: f_name ? f_name : '', lastName: l_name ? l_name : '',dob:dob?dob:'' })
    }, []);

    let handleBarcodeRegister =async () => {
        

        if (!data.barcodeNumber) {
            alert('Please enter 9 digit barcode number')
            return false;
        }
        
        if (!data.usingKit) {
            alert('Please select who will be using this kit')
            return false;
        }
        
        if (!data.gender) {
            alert('Please select gender')
            return false;
        }
        if (!netInfo.isConnected) {
            alert('Please checked your internet connection')
            return false;
        }
        const customer_id = await AsyncStorage.getItem('MGS_customer_id')

        setData({ ...data, iconAnimating: true })
        let bodydata = {};
        bodydata.barcdeNumber = data.barcodeNumber;
        bodydata.customerId = customer_id;
        bodydata.gender = data.gender;
        bodydata.self_used_barcode = data.usingKit;
console.log(bodydata);
        postHeaderService('customer/barcodestatus', bodydata).then(res => {
            console.log(res);
            if (res.status == 200) {
                let data = res.data && Object.keys(res.data).length > 0 ? res.data : {}
                setData({ ...data, iconAnimating: false })
                navigation.navigate('BarcodeConfirmationScreen')
                
            } else {
                setData({ ...data, iconAnimating: false })
                alert(res.message)
            }
        }).catch(err => {
            setData({ ...data, iconAnimating: false })
            console.log(err)
        })
    }

    let barcode_example = require('../assets/barcode_example.png');
    return (
        <SafeAreaView style={[CommonStyles.flex1, CommonStyles.bgWhite, CommonStyles.justifyContentStart]}>
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

                <View style={[CommonStyles.flex1, CommonStyles.mlrt20, CommonStyles.mb35, CommonStyles.flexDirectionColumn]}>

                    <CommonInputBox
                        placeholederName={'9 Digit BarCode'}
                        textValue={data.barcodeNumber}
                        onvalueChange={(value) => setData({ ...data, barcodeNumber: value })}
                        textStyle={CommonStyles.textStyle16} />

                    <View style={[CommonStyles.ml10]}>
                        <Image style={CommonStyles.justifyContentCenter, CommonStyles.alignSelfCenter, { resizeMode: 'contain', width: 350 }} source={barcode_example} />
                    </View>
                    <Text style={[CommonStyles.textStyle18, CommonStyles.ml10, CommonStyles.mt10]}>Who will be using this kit?</Text>

                    <View style={[CommonStyles.flexDirectionColumn, CommonStyles.flex1, CommonStyles.mt20, CommonStyles.ml10]}>
                        <View style={[CommonStyles.flexDirectionRow]}>
                            <TouchableOpacity
                                style={CommonStyles.circle}
                                onPress={() => { setData({ ...data, usingKit: 'self' }) }}
                            >
                                {data.usingKit == 'self' ? <View style={CommonStyles.checkedCircle} /> : <View style={CommonStyles.unCheckedcircle} />}
                            </TouchableOpacity>
                            <Text style={[CommonStyles.textStyle16, { marginLeft: 5 }]}>I'll be using this kit</Text>
                        </View>
                        <View style={[CommonStyles.flexDirectionRow, CommonStyles.mt20]}>
                            <TouchableOpacity
                                style={CommonStyles.circle}
                                onPress={() => { setData({ ...data, usingKit: 'other' }) }}

                            >
                                {data.usingKit == 'other' ? <View style={CommonStyles.checkedCircle} /> : <View style={CommonStyles.unCheckedcircle} />}
                            </TouchableOpacity>
                            <Text style={[CommonStyles.textStyle16, { marginLeft: 5 }]}>Someone else is using this kit</Text>
                        </View>
                    </View>


                    <CommonInputBox
                        icon={<User />}
                        placeholederName={'First Name'}
                        textValue={data.firstName}
                        onvalueChange={(value) => setData({ ...data, firstName: value })}
                        textStyle={CommonStyles.textStyle16} />


                    <CommonInputBox
                        icon={<User />}
                        placeholederName={'Last Name'}
                        textValue={data.lastName}
                        onvalueChange={(value) => setData({ ...data, lastName: value })}
                        textStyle={CommonStyles.textStyle16} />


                    <CommonDatePicker getDate={(date) => {
                        setData({ ...data, dob: date })
                    }} PassDate={dob} />

                    <View style={[CommonStyles.flexDirectionRow, CommonStyles.ml10, CommonStyles.flex1, CommonStyles.mt20]}>
                        <View style={[CommonStyles.flexDirectionRow]}>
                            <TouchableOpacity
                                style={CommonStyles.circle}
                                onPress={() => { setData({ ...data, gender: 'male' }) }}
                            >
                                {data.gender == 'male' ? <View style={CommonStyles.checkedCircle} /> : <View style={CommonStyles.unCheckedcircle} />}
                            </TouchableOpacity>
                            <Text style={[CommonStyles.textStyle16, { marginLeft: 5 }]}>Male</Text>
                        </View>
                        <View style={[CommonStyles.flexDirectionRow, { marginLeft: 40 }]}>
                            <TouchableOpacity
                                style={CommonStyles.circle}
                                onPress={() => { setData({ ...data, gender: 'female' }) }}

                            >
                                {data.gender == 'female' ? <View style={CommonStyles.checkedCircle} /> : <View style={CommonStyles.unCheckedcircle} />}
                            </TouchableOpacity>
                            <Text style={[CommonStyles.textStyle16, { marginLeft: 5 }]}>Female</Text>
                        </View>


                    </View>

                    <TouchableOpacity underlayColor="white" onPress={() => {  signUp()
                     }}
                        style={[CommonStyles.flexDirectionRow, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.ml20, CommonStyles.mr20, CommonStyles.mt40, CommonStyles.appGreenButton, CommonStyles.p15]} >
                        <View style={[CommonStyles.flex1]}>
                            <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* </View> */}
                {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

            </ScrollView>
        </SafeAreaView>
    );
}

export default BarCodeScreen