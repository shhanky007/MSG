
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';
import User from '../assets/icons/user';
import RightCheckmark from '../assets/icons/RightCheckmark';
import Mobile from '../assets/icons/mobile';
import { CommonInputBox } from './CommonInputText';
import { getFormatedDate, getHeaderService, postHeaderService, getDateFormateForAPI, putHeaderService } from '../common/Services';
import { CommonDatePicker } from './CommonDatePicker'
import LoadingIcon from '../components/LoadingIcon'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { useNetInfo } from "@react-native-community/netinfo";
import { AuthContext } from '../context';

function PersonalInformtionScreen({ navigation, route }) {
    const netInfo = useNetInfo();
    const { title } = route.params;
    const { customerId } = route.params;
    const { isLogin } = route.params;
    const { signUp, signOut } = React.useContext(AuthContext);

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        dob: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        gender: '',
        iconAnimating: false,

    });


    const checkInternet = () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                getsinglecustomerdetails();
            } else {
                alert('Please checked your internet connection.')
            }
        });
    }

    // React.useLayoutEffect(() => {

    //     navigation.setOptions({
    //         headerTitle: title,
    //         headerTitleAlign: 'center',
    //         headerStyle: {
    //             elevation: 0,
    //             shadowOpacity: 0,
    //             borderBottomWidth: 0,
    //             backgroundColor: '#D5D5D5'
    //         }, headerRight: () => (
    //             <TouchableOpacity style={[CommonStyles.flex1, CommonStyles.justifyContentCenter, CommonStyles.alignItemEnd]}
    //                 onPress={() => { updateProfileData() }}>
    //                 <RightCheckmark />
    //             </TouchableOpacity>),
    //         headerLeft: () => (
    //             null),
    //     });
    // }, [navigation]);


    useEffect(() => {
        checkInternet()

    }, [])


    let getsinglecustomerdetails = async () => {
        console.log('personal use effect');

        setData({ ...data, iconAnimating: true })
        const customer_id = await AsyncStorage.getItem('MGS_customer_id')
        let url;
        if (customer_id) {
            url = 'customer/getsinglecustomerdetails/' + customer_id;
        } else {
            url = 'customer/getsinglecustomerdetails/' + customerId;
        }
        getHeaderService(url).then(res => {
            if (res.status == 200) {
                let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : {}

                let rsData = responseData[0];

                let addressArray = rsData.address ? rsData.address.split("@") : []
                try {
                    setData({
                        ...data,
                        iconAnimating: false,
                        firstName: rsData.f_name ? rsData.f_name : '',
                        lastName: rsData.l_name ? rsData.l_name : '',
                        email: rsData.email ? rsData.email : '',
                        mobileNumber: rsData.mobile_no ? rsData.mobile_no.toString() : '',
                        dob: rsData.date_of_birth ? getDateFormateForAPI(rsData.date_of_birth) : '',

                        addressLine1: addressArray.length >=1 ? addressArray[0] : '',
                        addressLine2: addressArray.length >=2 ? addressArray[1] : '',
                        city: addressArray.length >= 3 ? addressArray[2] : '',
                        state: addressArray.length >= 4 ? addressArray[3] : '',
                        country: addressArray.length >= 5 ? addressArray[4] : '',
                        zipCode: addressArray.length >= 6 ? addressArray[5] : '',
                        gender: rsData.gender ? rsData.gender : ''
                    })
                } catch (e) {

                }
            } else if (res.status == 201) {
                signOut()
            } else {
                setData({ ...data, iconAnimating: false })
                alert(res.message)
            }
        }).catch(err => {
            setData({ ...data, iconAnimating: false })
            console.log(err)
        })
    }

    let updateProfileData = async () => {
        console.log('updateProfileData', data);


        let customer_id = await AsyncStorage.getItem('MGS_customer_id')
        if (customerId) {
            customer_id = customerId
        }
        setData({ ...data, iconAnimating: true })

        let bodydata = {};
        bodydata.f_name = data.firstName;
        bodydata.f_name = data.firstName;
        bodydata.l_name = data.lastName;
        bodydata.date_of_birth = data.dob;
        bodydata.gender = data.gender;
        bodydata.mobile_no = data.mobileNumber;
        bodydata.address = data.addressLine1 + "@" + data.addressLine2 + "@" + data.city + "@" + data.state + "@" + data.country + "@" + data.zipCode;
        bodydata.customerId = customer_id
        console.log('bodydata :', bodydata);


        putHeaderService('customer/editCustomerProfile', bodydata).then(res => {
            console.log('responce update', res);
            if (res.status == 200) {
                let responsedata = res.data && Object.keys(res.data).length > 0 ? res.data : {}
                setData({ ...data, iconAnimating: false })
                // navigation.navigate('App')
                if (isLogin) {
                    signUp()
                }
                else {
                    navigation.navigate("ProfileScreen");
                }
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
            <View style={[CommonStyles.flexDirectionRow, { backgroundColor: '#D5D5D5', height: 50 }, CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
                <View style={[CommonStyles.flex1, CommonStyles.alignItemEnd]}>
                    <Text style={[CommonStyles.fontFamilyNunitoSansBold, CommonStyles.font18]}>{title}</Text>
                </View>
                <TouchableOpacity style={[CommonStyles.flex1, CommonStyles.alignItemEnd]}
                    onPress={() => updateProfileData()} >
                    <RightCheckmark />
                </TouchableOpacity>

            </View>
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

                <View style={[CommonStyles.flex1, CommonStyles.flexDirectionColumn]}>

                    <View style={[CommonStyles.flexDirectionColumn, CommonStyles.mlrt20, CommonStyles.mb35]}>
                        <Text style={[CommonStyles.textStyle18, CommonStyles.ml10]}>Personal Information</Text>

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
                            edit={false}
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
                            keyboardType={'number-pad'}/>

                        <CommonDatePicker getDate={(date) => {
                            setData({ ...data, dob: date })
                        }} PassDate={data.dob} />

                        <View style={[CommonStyles.flexDirectionRow, CommonStyles.flex1, CommonStyles.mt20, CommonStyles.ml10, CommonStyles.mr10]}>
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

                        <Text style={[CommonStyles.textStyle18, CommonStyles.mt20, CommonStyles.ml10, CommonStyles.mr10]}>Address Details</Text>

                        <CommonInputBox

                            placeholederName={'Address Line 1'}
                            textValue={data.addressLine1}
                            onvalueChange={(value) => setData({ ...data, addressLine1: value })}
                            textStyle={CommonStyles.textStyle16} />

                        <CommonInputBox
                            placeholederName={'Address Line 2'}
                            textValue={data.addressLine2}
                            onvalueChange={(value) => setData({ ...data, addressLine2: value })}
                            textStyle={CommonStyles.textStyle16} />

                        <CommonInputBox
                            placeholederName={'Country'}
                            textValue={data.country}
                            onvalueChange={(value) => setData({ ...data, country: value })}
                            textStyle={CommonStyles.textStyle16} />


                        <CommonInputBox
                            placeholederName={'State'}
                            textValue={data.state}
                            onvalueChange={(value) => setData({ ...data, state: value })}
                            textStyle={CommonStyles.textStyle16} />
                        <CommonInputBox
                            placeholederName={'City'}
                            textValue={data.city}
                            onvalueChange={(value) => setData({ ...data, city: value })}
                            textStyle={CommonStyles.textStyle16} />

                        <CommonInputBox
                            placeholederName={'Zip Code'}
                            textValue={data.zipCode}
                            onvalueChange={(value) => setData({ ...data, zipCode: value })}
                            textStyle={CommonStyles.textStyle16} 
                            keyboardType={'number-pad'}/>


                    </View>

                </View>
                {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

            </ScrollView>
        </SafeAreaView>
    );
}

export default PersonalInformtionScreen