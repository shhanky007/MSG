import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';
import LoadingIcon from '../components/LoadingIcon'
import User from '../assets/icons/user';
import PassKey from '../assets/icons/pass_key';
import { postService, validateEmail, getDateFormateForAPI } from '../common/Services';
import { CommonInputBox } from './CommonInputText';
import AsyncStorage from '@react-native-community/async-storage';
import { useNetInfo } from "@react-native-community/netinfo";
import Mobile from '../assets/icons/mobile';
import { CommonDatePicker } from './CommonDatePicker'

function CreateAccountScreen({ navigation }) {
    const netInfo = useNetInfo();

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        dob: '',
        password: '',
        confirmPassword: '',
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
                let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : {}
                _storeToken(responseData[0]);
                setData({ ...data, iconAnimating: false })
                // navigation.navigate('PersonalInformtionScreen')
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'PersonalInformtionScreen', params: { title: 'Step 2'
                    ,customerId:responseData[0].registered_customer_unique_id 
                    ,isLogin:true} }],
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

                <View style={[CommonStyles.flex1, CommonStyles.mb35, CommonStyles.bgWhite, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter,]}>

                    <View style={[CommonStyles.flex2, CommonStyles.flexDirectionColumn, CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
                        <View style={[CommonStyles.flexDirectionColumn, CommonStyles.alignItemCenter]}>
                            <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansBold, CommonStyles.font30, { color: '#2B2B2B' }]}>Create Account</Text>

                        </View>
                    </View>

                    <View style={[, CommonStyles.flex1, CommonStyles.flexDirectionColumn, CommonStyles.ml20, CommonStyles.mr20]}>

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
                        }} PassDate={data.dob} />


                        <TouchableOpacity underlayColor="white" onPress={() => handleSignUp()
                        }
                            style={[CommonStyles.flexDirectionRow, CommonStyles.mt20, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.appDarkBlackButton, CommonStyles.p15]} >
                            <View style={[CommonStyles.flex1]}>
                                <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Create Account</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[CommonStyles.flexDirectionRow, CommonStyles.mt20, CommonStyles.mb20, CommonStyles.justifyContentCenter]}>
                            <View
                                style={{
                                    flex: 1,
                                    borderBottomColor: 'grey', alignSelf: 'center',
                                    borderBottomWidth: 0.5
                                }} />

                            <Text style={[CommonStyles.alignSelfCenter, { fontFamily: 'NunitoSans-SemiBold', color: '#6C6867' }, CommonStyles.font16, CommonStyles.mb5]}>or</Text>
                            <View
                                style={{
                                    flex: 1,
                                    borderBottomColor: 'grey', alignSelf: 'center',
                                    borderBottomWidth: 0.5
                                }} />
                        </View>
                        <TouchableOpacity underlayColor="white" onPress={() => { navigation.navigate('SignIn') }}
                            style={[CommonStyles.flexDirectionRow, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.appGreenButton, CommonStyles.p15]} >
                            <View style={[CommonStyles.flex1]}>
                                <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

            </ScrollView>
        </SafeAreaView>
    );
}

export default CreateAccountScreen