
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonStyles from '../common/CommonStyles';
import User from '../assets/icons/user';
import Mobile from '../assets/icons/mobile';
import { CommonInputBox } from './CommonInputText';
import { getHeaderService, postService, validateEmail, getService, clearLocalCart } from '../common/Services';
import LoadingIcon from './LoadingIcon'
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../context';
import stripe from 'tipsi-stripe'
import NetInfo from "@react-native-community/netinfo";



function OrderSummaryScreen({ navigation }) {
    const { signOut } = React.useContext(AuthContext);
    const route = useRoute();
    let shippingData = route.params;
    // console.log(shippingData)
    const [data, setData] = useState({
        ...shippingData,
        physicianName: '',
        physicianMobileNo: '',
        physicianEmail: '',
        iconAnimating: false,
        cartArray: [],

    });
    const checkInternet = () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                getpublishableKey()
            } else {
                alert('Please checked your internet connection.')
            }
        });
    }
    useEffect(() => {
       // showCardDetail()
        checkInternet()
        
    }, [])

    let showCardDetail = () => {
        if (data.orderSummary && Object.keys(data.orderSummary).length > 0) {
            let cartArray = [];
            cartArray.push(data.orderSummary)
            setData({ ...data, cartArray: cartArray })
        } else {
            getCartDetails()
        }
    }

    let getpublishableKey = () => {
        setData({ ...data, iconAnimating: true })
        let url = 'contactUs/paymentData';
        getService(url).then(res => {
            if (res.status == 200) {
                let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : {}

                setData({ ...data, iconAnimating: false })
                let key = responseData.mode === 'sandbox' ?
                    responseData.sandbox_stripe_public_key : responseData.production_stripe_public_key;
                stripe.setOptions({
                    publishableKey: key  //androidPayMode:'production'
                });

                showCardDetail()

            } else {
                setData({ ...data, iconAnimating: false })
                alert(res.message)
            }
        }).catch(err => {
            setData({ ...data, iconAnimating: false })
            console.log(err)
        })
    }

    const getCartList = async (customer_id) => {

        setData({ ...data, iconAnimating: true, cartArray: [] })
        let url = 'cart/getCartData/' + customer_id;
        getHeaderService(url).then(res => {
            if (res.status == 200) {
                let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : []
                // console.log('price  ', responseData)
                setData({ ...data, iconAnimating: false, cartArray: responseData })

            } else if (res.status == 201) {
                signOut()
            } else {
                setData({ ...data, iconAnimating: false })
                //alert(res.message)
            }
        }).catch(err => {
            setData({ ...data, iconAnimating: false })
            console.log(err)
        })
    }

    const getCartDetails = async () => {
        // console.log('data.isRegistered', data.isRegistered);
        if (data.isRegistered == 1) {
            getCartList(data.registeredCustomerId)
        } else {
            let cartArray = await AsyncStorage.getItem('MGS_cart_array');
            if (cartArray) {
                cartArray = JSON.parse(cartArray);
                setData({ ...data, cartArray: cartArray })
            }

        }
    }
    const getTotalAmount = () => {
        return data.cartArray.reduce((prev, next) => prev + next.price, 0)
    }

    const payNow = async () => {
        if (!data.physicianName || !data.physicianMobileNo || !data.physicianEmail) {
            alert('Please fill all the required fields.')
            return false
        }
        if (!data.physicianEmail) {
            alert('Please enter a valid email.')
            return false
        }
        if (data.physicianMobileNo.length != 12) {
            alert('Please enter 12 digit mobile number.')
            return false
        }
        try {
            const token = await stripe.paymentRequestWithCardForm({
                // Only iOS support this options
                smsAutofillDisabled: true,
                requiredBillingAddressFields: 'full',
                name: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.mobileNumber,
                prefilledInformation: {
                    billingAddress: {
                        name: data.firstName + ' ' + data.lastName,
                        line1: data.addressLine1,
                        line2: data.addressLine2,
                        city: data.city,
                        state: data.state,
                        country: data.country,
                        postalCode: data.zipCode,
                        email: data.email,
                    },
                },
            })

            if (token && token.tokenId) {
                setData({ ...data, iconAnimating: true })

                let object = {};
                object.source = token.tokenId
                object.session_id = null
                object.charge_id = token.tokenId
                object.payment_from = 'app'
                object.exp_year = token.card ? token.card.expYear : ''
                object.exp_month = token.card ? token.card.expMonth : ''

                object.firstName = data.firstName
                object.lastName = data.lastName
                object.address = data.addressLine1
                object.mobileNumber = data.mobileNumber
                object.isRegistered = data.isRegistered
                object.registeredCustomerId = data.registeredCustomerId
                object.physicianName = data.physicianName
                object.physicianMobileNo = data.physicianMobileNo
                object.physicianEmail = data.physicianEmail
                object.receipt_email = data.email
                object.email = data.email
                object.city = data.city
                object.state = data.state
                object.country = data.country
                object.zip = data.zipCode

                let productData = [];

                productData = await data.cartArray.map((x, i) => {
                    return {
                        testId: x.testId ? x.testId : x.test_code,
                        testName: x.test_name,
                        quantity: x.quantity,
                        totalAmount: x.price,
                        actualAmount: x.actualAmount
                    }
                })

                object.productData = productData

                object.amount = productData.length > 0 ? productData.reduce((prev, next) => prev + next.totalAmount, 0) : 0

                object.amount = object.amount * 100

                postService('payment/charge-mobile', object).then(res => {
                        console.log('charge ',res);
                    if (res.status == 200) {
                        let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : []
                        setData({ ...data, iconAnimating: false })
                        if(data.isRegistered != 1){
                            clearLocalCart()
                        }
                        navigation.replace('PaymentScreen', { status: 'success',orderId:res.data })
                    
                        
                    } else if (res.status == 201) {
                        signOut()
                    } else {
                        setData({ ...data, iconAnimating: false })
                        navigation.navigate('PaymentScreen', { status: 'failed' })
                    }
                   
                }).catch(err => {
                    setData({ ...data, iconAnimating: false })
                    navigation.navigate('PaymentScreen', { status: 'failed' })
                    console.log(err)
                })

            }else{
                setData({ ...data, iconAnimating: false })

            }

            // console.log(token)

        } catch (error) {
            console.log(error)



        }



    }

    return (
        <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

                <View style={[CommonStyles.flex1, CommonStyles.flexDirectionColumn]}>

                    <View style={[CommonStyles.flexDirectionColumn, CommonStyles.mlrt20]}>
                        <Text style={[CommonStyles.fontBold, CommonStyles.font22, CommonStyles.pt0]}>Physician Details</Text>
                        <CommonInputBox
                            icon={<User />}
                            placeholederName={'Physician Name *'}
                            textValue={data.physicianName}
                            onvalueChange={(value) => setData({ ...data, physicianName: value })}
                            textStyle={CommonStyles.textStyle16} />
                        <CommonInputBox
                            icon={<Mobile />}
                            placeholederName={'Contact Number *'}
                            textValue={data.physicianMobileNo}
                            onvalueChange={(value) => setData({ ...data, physicianMobileNo: value })}
                            textStyle={CommonStyles.textStyle16} 
                            keyboardType={'number-pad'}
                            maxLength={12}/>

                        <CommonInputBox
                            icon={<Text style={{ fontSize: 30, color: '#b3b3b3' }}>@</Text>
                            }
                            placeholederName={'Email *'}
                            textValue={data.physicianEmail}
                            onvalueChange={(value) => setData({ ...data, physicianEmail: value })}
                            textStyle={CommonStyles.textStyle16} />

                        <Text style={[CommonStyles.fontBold, CommonStyles.font22, CommonStyles.pt20]}>Order Details</Text>
                        <View style={[CommonStyles.flex1, CommonStyles.p10, { marginLeft: 10, marginRight: 10, marginTop: 10, borderColor: '#DCDCDC', borderWidth: 1, borderRadius: 5 }]}>

                            {
                                data.cartArray.length > 0 ?
                                    data.cartArray.map((x, i) => {
                                        // console.log(x)
                                        return (<View key={i} style={[CommonStyles.flexDirectionRow, CommonStyles.pt10, CommonStyles.justifyContentBetween, CommonStyles.alignItemCenter]}>
                                            <View style={[CommonStyles.flex1, CommonStyles.alignItemCenter]}>
                                                <Image source={{ uri: x.test_image_path, cache: "force-cache" }} style={{ width: 40, height: 40 }} />
                                            </View>
                                            <View style={[CommonStyles.flex1, CommonStyles.alignItemCenter]}>
                                                <Text style={[CommonStyles.fontBold]}>{x.test_name}</Text>
                                            </View>

                                            <View style={[CommonStyles.flex1, CommonStyles.alignItemCenter]}>
                                                <Text style={[CommonStyles.fontBold]}>HK$ {x.price}</Text>
                                            </View>
                                        </View>)
                                    })
                                    : null
                            }
                        </View>
                    </View>
                    <View style={[CommonStyles.justifyContentEnd, CommonStyles.flex1, CommonStyles.alignItemEnd, CommonStyles.mlrt20, CommonStyles.mb10]}>
                        <TouchableOpacity underlayColor="white" onPress={() =>{ if(data.cartArray.length!=0)payNow()}}
                            style={[CommonStyles.flexDirectionRow, CommonStyles.mt20, CommonStyles.alignItemCenter, CommonStyles.justifyContentCenter, CommonStyles.appBlackButton, CommonStyles.p15]} >
                            <View style={[CommonStyles.flex1]}>
                                <Text style={[CommonStyles.textCenter, CommonStyles.fontFamilyNunitoSansSemiBold, CommonStyles.textCenter, CommonStyles.font16, CommonStyles.colorWhite]}>Proceed to Pay (HK$ {getTotalAmount()})  </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

            </ScrollView>
        </SafeAreaView>
    );
}

export default OrderSummaryScreen