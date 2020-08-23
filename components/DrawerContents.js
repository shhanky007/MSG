import React, { useEffect } from 'react';
import { View, Platform, Text, TouchableOpacity, Share } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import ShareIcon from '../assets/icons/Share'
import Box from '../assets/icons/Box';
import Contact from '../assets/icons/Contact';
import Order from '../assets/icons/Order';
import Feedback from '../assets/icons/Feedback';
import Reports from '../assets/icons/Reports';
import About from '../assets/icons/About';
import CommonStyles from '../common/CommonStyles';
import EditBlue from '../assets/icons/EditBlue';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingIcon from './LoadingIcon';
import { postHeaderService, clearSession, getHeaderService, getService } from '../common/Services';
import { useNetInfo } from "@react-native-community/netinfo";
import { AuthContext } from '../context';


export function DrawerContents(props) {

    const netInfo = useNetInfo();
    const [data, setData] = React.useState({
        iconAnimating: false,
        // firstName: 'Guest',
        // token: null
        shareLink: '',
        appVersion: '1.0.0'
    });

    const { signOut } = React.useContext(AuthContext);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: data.shareLink,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        // getLoginData()
        getAppversionNumber()
    }, [])

    let logout = async () => {
        if (!netInfo.isConnected) {
            alert('Please checked your internet connection')
            return false;
        }
        setData({ ...data, iconAnimating: true })
        const token = props.token

        let bodyData = {};
        bodyData.token = token;

        postHeaderService('customer/customerLogout', bodyData).then(res => {
            if (res.status == 200) {
                setData({ ...data, iconAnimating: false })

                signOut()

            } else {
                setData({ ...data, iconAnimating: false })
                signOut()
                // alert(res.message)
            }
        }).catch(err => {
            setData({ ...data, iconAnimating: false })
            console.log(err)
            signOut()
        })
    }
    let getAppversionNumber = () => {
        let platform = Platform.OS === 'ios' ? 'ios' : 'android'
        let url = 'contactUs/appVersion/' + platform;
        getService(url).then(res => {
            if (res.status == 200) {
                let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : {}
                setData({ ...data, appVersion: responseData.app_version, shareLink: responseData.store_link })
            } else {
                alert(res.message)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const getLoginData = async () => {
        let token = await AsyncStorage.getItem('MGS_token');

        let fName = await AsyncStorage.getItem('MGS_f_name');
        console.log("chekc for reposne", fName)
        console.log("chekc for reposne", token)

        if (token != null) {
            setData({ ...data, firstName: fName, token: token })
        } else {
            setData({ ...data, firstName: 'Guest', token: '' })
        }
    }





    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={{ flexDirection: 'column', marginTop: 20, marginLeft: 25, marginBottom: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'flex-start' }}>

                            <Text style={[CommonStyles.textStyleBold16]}>Welcome,{props.firstName}</Text>
                        </View>
                        {props.token ? <View style={{ alignItems: 'flex-end', marginEnd: 20 }}>
                            <TouchableOpacity onPress={() => { props.navigation.navigate("ProfilesScreen") }}>
                                <EditBlue />
                            </TouchableOpacity>

                        </View> : null}
                    </View>
                    {props.token ? <TouchableOpacity onPress={() => { logout() }}>

                        <Text style={{ alignItems: 'flex-start', marginTop: 5, color: '#0000ff' }}>Logout</Text>
                    </TouchableOpacity>
                        : <TouchableOpacity onPress={() => { props.navigation.replace('LoginScreen') }}>

                            <Text style={{ alignItems: 'flex-start', marginTop: 5, color: '#0000ff' }}>Please Sign In</Text>
                        </TouchableOpacity>}
                </View>
                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                    }} />
                {/* <DrawerItemList {...props}/> */}
                <DrawerItem
                    icon={({ color, size }) => (
                        <Box />
                    )}
                    labelStyle={{ marginLeft: -20 }}

                    label="Services/Products"
                    onPress={() => { props.navigation.navigate('ServicesScreen') }}
                />
                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                    }} />
                {props.token ? <DrawerItem
                    icon={({ color, size }) => (
                        <Reports />
                    )}
                    label="Reports"
                    labelStyle={{ marginLeft: -10 }}
                    onPress={() => { props.navigation.navigate('ReportsScreen') }}
                /> : null}
                {props.token ? <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                    }} /> : null}
                {props.token ? <DrawerItem
                    icon={({ color, size }) => (
                        <Order />
                    )}
                    label="Orders"
                    labelStyle={{ marginLeft: -20 }}
                    onPress={() => { props.navigation.navigate('OrdersScreen') }}
                /> : null}
                {props.token ? <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                    }} /> : null}
                <DrawerItem
                    icon={({ color, size }) => (
                        <Feedback />
                    )}
                    label="Feedback"
                    labelStyle={{ marginLeft: -14 }}
                    onPress={() => { props.navigation.navigate('FeedbackScreen') }}
                />
                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                    }} />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Contact />
                    )}
                    label="Contact Us"
                    labelStyle={{ marginLeft: -14 }}
                    onPress={() => { props.navigation.navigate('ContactUsScreen') }}
                />
                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                    }} />
                <DrawerItem
                    icon={({ color, size }) => (
                        <About />
                    )}
                    labelStyle={{ marginLeft: -14 }}
                    label="About Us" style={[CommonStyles.align]}
                    onPress={() => { props.navigation.navigate('AboutUsScreen') }}
                />
                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                    }} />
                <DrawerItem
                    icon={({ color, size }) => (
                        <ShareIcon />
                    )}
                    label="Share"
                    labelStyle={{ marginLeft: -14 }}
                    onPress={() => { if (data.shareLink) { onShare() } }}
                />
                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 0.5, marginLeft: 20, marginRight: 20, marginStart: 20
                    }} />

            </DrawerContentScrollView >
            <View style={{ marginLeft: 15 }}>
                <DrawerItem
                    label={'Version ' + data.appVersion}
                />
            </View>
            {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

        </View>
    );
}

