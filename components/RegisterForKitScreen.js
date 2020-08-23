import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';
import LoadingIcon from '../components/LoadingIcon'
import User from '../assets/icons/user';
import PassKey from '../assets/icons/pass_key';
import Checkmark from '../assets/icons/checkmark';
import { postService, validateEmail, } from '../common/Services';
import { CommonDatePicker } from './CommonDatePicker'
import { CommonInputBox } from './CommonInputText';
import AsyncStorage from '@react-native-community/async-storage';
import Mobile from '../assets/icons/mobile';
import { useNetInfo } from "@react-native-community/netinfo";

function RegisterForKitScreen({ navigation }) {
    const netInfo = useNetInfo();

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber:'',
        password: '',
        confirmPassword: '',
        dob: '',
        checkbox: false,
        iconAnimating: false,
    });
    const _storeToken = async (data) => {
        try {
            await AsyncStorage.setItem('MGS_token', data.token)
            await AsyncStorage.setItem('MGS_customer_id', "" + data.registered_customer_unique_id)
            await AsyncStorage.setItem('MGS_f_name', "" + data.f_name)
            await AsyncStorage.setItem('MGS_Login_Data', JSON.stringify(data))

        } catch (error) {
            console.log(error)
        }
    }

    let handleSignUp = () => {

        if (!data.firstName) {
            alert('Please enter first name')
            return false;
        }
        if (!data.lastName) {
            alert('Please enter last name')
            return false;
        }
        if (!data.email) {
            alert('Please enter email address')
            return false;
        }
        if (!data.mobileNumber) {
            alert('Please enter mobile number')
            return false;
        }
        if (data.mobileNumber.length != 12) {
            alert('Please enter 12 digit mobile number.')
            return false
        }
        if (!data.password) {
            alert('Please enter password')
            return false;
        }
        if (!data.confirmPassword) {
            alert('Please enter confirm password')
            return false;
        }
        if (!data.dob) {
            alert('Please select Date of Birth')
            return false;
        }
        if (!validateEmail(data.email)) {
            alert('Email Address is not valid')
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
        let bodyData = {};
        bodyData.f_name = data.firstName;
        bodyData.l_name = data.lastName;
        bodyData.email = data.email;
        bodyData.mobile_no = data.mobileNumber;
        bodyData.password = data.password;
        bodyData.confirmPassword = data.confirmPassword;
        bodyData.date_of_birth = data.dob;

        postService('customer/customerRegistration', bodyData).then(res => {
            if (res.status == 200) {
                let responsedata = res.data && Object.keys(res.data).length > 0 ? res.data : {}
                _storeToken(responsedata[0])
                setData({ ...data, iconAnimating: false })
                navigation.navigate('BarCodeScreen', {
                    f_name: data.firstName,
                    l_name: data.lastName,
                    dob: data.dob,

                })
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
        <SafeAreaView style={[CommonStyles.flex1, CommonStyles.bgWhite, CommonStyles.justifyContentStart]}>
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

                <View style={[CommonStyles.mt20, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter, CommonStyles.ml20, CommonStyles.mr20]}>


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

                    <CommonInputBox
                        icon={<Text style={{ fontSize: 30, color: '#b3b3b3' }}>@</Text>
                        }
                        placeholederName={'Email Address'}
                        textValue={data.email}
                        onvalueChange={(value) => setData({ ...data, email: value })}
                        textStyle={CommonStyles.textStyle16} />
                    <CommonInputBox
                        icon={<Mobile />}
                        placeholederName={'Mobile Number'}
                        textValue={data.mobileNumber}
                        onvalueChange={(value) => setData({ ...data, mobileNumber: value })}
                        textStyle={CommonStyles.textStyle16} 
                        keyboardType={'number-pad'}
                        maxLength={12}/>
                    <CommonInputBox
                        icon={<PassKey />
                        }
                        secureTextEntry={true}
                        placeholederName={'Password'}
                        textValue={data.password}
                        onvalueChange={(value) => setData({ ...data, password: value })}
                        textStyle={CommonStyles.textStyle16} />
                    <CommonInputBox
                        icon={<PassKey />
                        }
                        secureTextEntry={true}
                        placeholederName={'Confirm Password'}
                        textValue={data.confirmPassword}
                        onvalueChange={(value) => setData({ ...data, confirmPassword: value })}
                        textStyle={CommonStyles.textStyle16} />


                    <CommonDatePicker getDate={(date) => {
                        setData({ ...data, dob: date })
                    }} />

                    <View style={[CommonStyles.flexDirectionRow, , CommonStyles.p10, CommonStyles.mt10]}>
                        <TouchableOpacity style={[CommonStyles.radioSquare, { marginTop: 5 }]}
                            onPress={() => { data.checkbox == false ? setData({ ...data, checkbox: true }) : setData({ ...data, checkbox: false }) }}>
                            {data.checkbox == true ? <Checkmark /> : null}
                        </TouchableOpacity>
                        <Text style={[CommonStyles.ml10]}>I have read and agree to the Terms of Service and Privacy Statement</Text>
                    </View>

                    <TouchableOpacity underlayColor="white" disabled={data.checkbox == true ? false : true} activeOpacity={1.0}
                        onPress={() => { handleSignUp() }}
                        style={[CommonStyles.mt20, CommonStyles.mb35, CommonStyles.flexDirectionRow, {
                            backgroundColor: data.checkbox == true ? '#55B9A7' : '#D5D5D5',
                            borderColor: '#55B9A7',
                            borderWidth: 1,
                            borderRadius: 50
                        }, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.p15]} >
                        <View style={[CommonStyles.flex1]}>
                            <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Register Kit</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

            </ScrollView>
        </SafeAreaView>
    );
}

export default RegisterForKitScreen