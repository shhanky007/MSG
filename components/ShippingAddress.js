
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import CommonStyles from '../common/CommonStyles';
import User from '../assets/icons/user';
import Mobile from '../assets/icons/mobile';
import { CommonInputBox } from './CommonInputText';
import { getHeaderService, validateEmail } from '../common/Services';
import LoadingIcon from './LoadingIcon'
import AsyncStorage from '@react-native-community/async-storage';

function ShippingAddressScreen({ navigation }) {
    const route = useRoute();
    let orderSummary = route.params;

    const [data, setData] = useState({
        ...orderSummary || {},
        registeredCustomerId: null,
        isRegistered: 0,
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',

        iconAnimating: false,

    });

    useEffect(() => {
        getsinglecustomerdetails();
    }, [])


    let getsinglecustomerdetails = async () => {
        const customer_id = await AsyncStorage.getItem('MGS_customer_id')
        if (customer_id) {
            setData({ ...data, registeredCustomerId: customer_id, isRegistered: 1 })


        }
    }

    const sendToShipping = () => {
        if (!data.firstName || !data.lastName || !data.firstName || !data.email || !data.mobileNumber || !data.addressLine1 || !data.country || !data.state || !data.zipCode || !data.city) {
            alert('Please fill all the required fields.')
            return false
        }
        
        if (!validateEmail(data.email)) {
            alert('Please enter a valid email.')
            return false
        }
        if (data.mobileNumber.length != 12) {
            alert('Please enter 12 digit mobile number.')
            return false
        }

        navigation.replace('OrderSummaryScreen', { ...data })


    }

    return (
        <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

                <View style={[CommonStyles.flex1, CommonStyles.flexDirectionColumn]}>

                    <View style={[CommonStyles.flexDirectionColumn, CommonStyles.mlrt20, CommonStyles.mb35]}>

                        <CommonInputBox
                            icon={<User />}
                            placeholederName={'First Name *'}
                            textValue={data.firstName}
                            onvalueChange={(value) => setData({ ...data, firstName: value })}
                            textStyle={CommonStyles.textStyle16} />
                        <CommonInputBox
                            icon={<User />}
                            placeholederName={'Last Name *'}
                            textValue={data.lastName}
                            onvalueChange={(value) => setData({ ...data, lastName: value })}
                            textStyle={CommonStyles.textStyle16} />

                        <CommonInputBox
                            icon={<Text style={{ fontSize: 30, color: '#b3b3b3' }}>@</Text>
                            }
                            placeholederName={'Email Address *'}
                            textValue={data.email}
                            onvalueChange={(value) => setData({ ...data, email: value })}
                            textStyle={CommonStyles.textStyle16} />

                        <CommonInputBox
                            icon={<Mobile />}
                            placeholederName={'Mobile Number *'}
                            textValue={data.mobileNumber}
                            onvalueChange={(value) => setData({ ...data, mobileNumber: value })}
                            textStyle={CommonStyles.textStyle16}
                            keyboardType={'number-pad'}
                            maxLength={12}
                        />


                        <CommonInputBox
                            placeholederName={'Country *'}
                            textValue={data.country}
                            onvalueChange={(value) => setData({ ...data, country: value })}
                            textStyle={CommonStyles.textStyle16} />

                        <CommonInputBox
                            placeholederName={'State *'}
                            textValue={data.state}
                            onvalueChange={(value) => setData({ ...data, state: value })}
                            textStyle={CommonStyles.textStyle16} />
                        <CommonInputBox
                            placeholederName={'City *'}
                            textValue={data.city}
                            onvalueChange={(value) => setData({ ...data, city: value })}
                            textStyle={CommonStyles.textStyle16} />
                        <CommonInputBox

                            placeholederName={'Address Line 1 *'}
                            textValue={data.addressLine1}
                            onvalueChange={(value) => setData({ ...data, addressLine1: value })}
                            textStyle={CommonStyles.textStyle16} />

                        <CommonInputBox
                            placeholederName={'Address Line 2'}
                            textValue={data.addressLine2}
                            onvalueChange={(value) => setData({ ...data, addressLine2: value })}
                            textStyle={CommonStyles.textStyle16} />
                        <CommonInputBox
                            placeholederName={'Zip Code *'}
                            textValue={data.zipCode}
                            onvalueChange={(value) => setData({ ...data, zipCode: value })}
                            textStyle={CommonStyles.textStyle16}
                            keyboardType={'number-pad'} />
                        <TouchableOpacity underlayColor="white" onPress={() => sendToShipping()}
                            style={[CommonStyles.flexDirectionRow, CommonStyles.mt20, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.appBlackButton, CommonStyles.p15]} >
                            <View style={[CommonStyles.flex1]}>
                                <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Proceed to Pay</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

            </ScrollView>
        </SafeAreaView>
    );
}

export default ShippingAddressScreen