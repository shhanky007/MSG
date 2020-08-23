import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import CommonStyles from '../common/CommonStyles'
import AsyncStorage from '@react-native-community/async-storage';
import { getHeaderService, postHeaderService } from '../common/Services';
import LoadingIcon from './LoadingIcon';
import NetInfo from "@react-native-community/netinfo";
import CartItemScreen from './CartItemScreen';
import { AuthContext } from '../context';


export const CartScreen = ({ navigation, route }) => {
  const { token } = route.params;

  let totalPrice = 0;
  const [data, setData] = React.useState({
    cartList: [],
    iconAnimating: false,
  });
  const { signOut } = React.useContext(AuthContext);

  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        getCartList()
      } else {
        alert('Please checked your internet connection.')
      }
    });
  }


  useEffect(() => {
    if (token) {
      checkInternet()
    } else {
      getCartLocalArrayData()
    }
  }, [])

  const getCartLocalArrayData = async () => {

    let cartArray = await AsyncStorage.getItem('MGS_cart_array');
    let ArrayData = [];
    if (cartArray) {
      ArrayData = JSON.parse(cartArray);

    }

    setData({ ...data, cartList: ArrayData })

  }

  let getCartList = async () => {

    setData({ ...data, iconAnimating: true, cartList: [] })
    const customer_id = await AsyncStorage.getItem('MGS_customer_id')

    let url = 'cart/getCartData/' + customer_id;
    getHeaderService(url).then(res => {
      if (res.status == 200) {
        let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : []
        console.log(responseData)
        setData({ ...data, iconAnimating: false, cartList: responseData })

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
  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.bgWhite, CommonStyles.justifyContentStart]}>
      {
        data.cartList.length == 0 ?
        <View style={[CommonStyles.flex1, CommonStyles.mt20,CommonStyles.justifyContentCenter,CommonStyles.alignItemCenter]}>
          <Text style={[CommonStyles.fontBold,CommonStyles.font18,CommonStyles.pb10]}>No Item available in your cart.</Text>

          <TouchableOpacity style={[CommonStyles.roundBtn, CommonStyles.grayBG]}
            onPress={() => navigation.navigate('ServiceScreen')}
          >
            <Text style={[CommonStyles.textCenter, CommonStyles.colorWhite]}>Back to Products</Text>
          </TouchableOpacity>

        </View>
        : null
      }
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 25 }}
        data={data.cartList ? data.cartList : []}
        ItemSeparatorComponent={() => <View style={{
          borderBottomWidth: 1,
          borderColor: '#ddd'
        }} />}
        renderItem={({ item }) => {

          return (<CartItemScreen data={{
            ...item, navigation: navigation, token: token, refresh: () => {
              if (token) {
                getCartList()
              } else {
                console.log('refresh');
                getCartLocalArrayData()
              }
            }, showLoader: () => {
              setData({ ...data, iconAnimating: true })
            }, DismissLoader: () => {
              setData({ ...data, iconAnimating: false })
            }
          }} />)
        }}
        keyExtractor={(item, index) => index.toString()}

      />

      {
        data.cartList.map((x, i) => {
          totalPrice = totalPrice + x.price;
      })}

      {
        data.cartList && data.cartList.length > 0 ?
        <View style={[CommonStyles.justifyContentEnd, CommonStyles.p20, { borderTopWidth: 1, borderColor: '#DCDCDC' }]}>
          <View style={[CommonStyles.flexDirectionRow, CommonStyles.justifyContentBetween, CommonStyles.pb10]}>
            <Text>Total Purchase</Text>
            <Text style={[CommonStyles.fontBold]}>HK$ {totalPrice}</Text>
          </View>
          <View>
            <TouchableOpacity style={[CommonStyles.roundBtn, CommonStyles.grayBG]}
              onPress={() => navigation.replace('ShippingAddressScreen')}
            >
              <Text style={[CommonStyles.textCenter, CommonStyles.colorWhite]}>Continue</Text>
            </TouchableOpacity>
          </View>


        </View> : null

      }
      
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

    </SafeAreaView>
  )
}
