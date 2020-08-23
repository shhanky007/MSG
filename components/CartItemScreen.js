import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import CommonStyles from '../common/CommonStyles'
import Trash from '../assets/icons/Trash';
import AsyncStorage from '@react-native-community/async-storage';
import { getHeaderService, postHeaderService } from '../common/Services';
import LoadingIcon from './LoadingIcon';
import { useNetInfo } from "@react-native-community/netinfo";
import { AuthContext } from '../context';

const CartItemScreen = ({ data }) => {
  const netInfo = useNetInfo();
  const [data1, setData1] = React.useState({
    orinalQuantity: 0,
    iconAnimating1: false,
  });
  const { signOut } = React.useContext(AuthContext);

  useEffect(() => {
    setData1({ ...data1, orinalQuantity: data.quantity })
  }, [])

  const removelocalCart = async () => {

    let cartArray = await AsyncStorage.getItem('MGS_cart_array');
    let ArrayData = [];
    if (cartArray) {
      ArrayData = JSON.parse(cartArray);
      let index = ArrayData.findIndex(function (element) {
        return element.id === data.id;
      })
      if (index !== -1) {
        ArrayData.splice(index, 1);
        await AsyncStorage.setItem('MGS_cart_array', JSON.stringify(ArrayData));

        data.refresh()
      }
    }
  }

  const removeCart = (cardId) => {

    data.showLoader()
    let bodyData = {};
    bodyData.cart_id = cardId;

    postHeaderService('cart/removeFromCart', bodyData).then(res => {
      if (res.status == 200) {

        data.refresh();

      } else if (res.status == 201) {
        signOut()
      } else {
        alert(res.message)
        data.DismissLoader()
      }
    }).catch(err => {
      console.log(err)
      data.DismissLoader()
    })
  }

  let updateCartList = async (testCode, price, cartId, updatedQuantity) => {
    data.showLoader()
    const customer_id = await AsyncStorage.getItem('MGS_customer_id')

    let bodyData = {};
    bodyData.customer_id = customer_id;
    bodyData.test_code = testCode;
    bodyData.quantity = updatedQuantity;
    bodyData.price = price;
    bodyData.cart_id = cartId;
    console.log("update body", bodyData);
    postHeaderService('cart/updateCart', bodyData).then(res => {
      if (res.status == 200) {
        data.refresh()
      } else if (res.status == 201) {
        signOut()
      } else {
        alert(res.message)
        data.DismissLoader()
      }
    }).catch(err => {
      console.log(err)
      data.DismissLoader()
    })
  }
  let localMinus = async () => {


    if (data1.orinalQuantity > 1) {
      let value = (data1.orinalQuantity - 1);

      setData1({ ...data1, orinalQuantity: value })
      let cartArray = await AsyncStorage.getItem('MGS_cart_array');
      let ArrayData = [];
      if (cartArray) {
        ArrayData = JSON.parse(cartArray);
        let obj = ArrayData.filter(x => x.id === data.id);
        obj[0].quantity = value
        obj[0].price = value * data.actualAmount;
        await AsyncStorage.setItem('MGS_cart_array', JSON.stringify(ArrayData));

        data.refresh()
      }
    }
  }
  let localPlus = async () => {

    let value = (data1.orinalQuantity) ? (data1.orinalQuantity + 1) : 0
    setData1({ ...data1, orinalQuantity: value })
    let cartArray = await AsyncStorage.getItem('MGS_cart_array');
    let ArrayData = [];
    if (cartArray) {
      ArrayData = JSON.parse(cartArray);
      let obj = ArrayData.filter(x => x.id === data.id);
      obj[0].quantity = value;
      obj[0].price = value * data.actualAmount;

      await AsyncStorage.setItem('MGS_cart_array', JSON.stringify(ArrayData));
      data.refresh()
    }
  }
  let minus = () => {
    if (!netInfo.isConnected) {
      alert('Please checked your internet connection')
      return false;
    }
    if (data1.orinalQuantity > 1) {
      let value = (data1.orinalQuantity - 1);

      setData1({ ...data1, orinalQuantity: value })

      updateCartList(data.test_code, data.price - data.actualAmount, data.cart_id, value)
    }
  }

  let plus = () => {
    if (!netInfo.isConnected) {
      alert('Please checked your internet connection')
      return false;
    }
    let value = (data1.orinalQuantity) ? (data1.orinalQuantity + 1) : 0
    setData1({ ...data1, orinalQuantity: value })
    updateCartList(data.test_code, data.actualAmount + data.price, data.cart_id, value)
  }

  return (
    <View style={[CommonStyles.flex1, CommonStyles.p20]}>
      <View style={[CommonStyles.flexDirectionRow, CommonStyles.justifyContentBetween]}>
        <View style={[CommonStyles.flex3]}>
          <Text style={[CommonStyles.fontBold, CommonStyles.greenColor, CommonStyles.font20, CommonStyles.pb10]}>{data.test_name}</Text>
          <Text style={[CommonStyles.pb10]}>({data.actualAmount} x {data.quantity}) HK$ {data.price}</Text>

          <View style={[CommonStyles.flexDirectionRow, { alignItems: 'center' }]}>
            <TouchableOpacity style={[CommonStyles.circle]} onPress={() => {
              if (data.token) { minus() } else {
                localMinus()
              }
            }}>
              <Text style={{ fontSize: 30, marginBottom: 5, color: '#CCCCCC' }}>-</Text>
            </TouchableOpacity>
            <Text style={[CommonStyles.ml10, CommonStyles.textStyleBold16, CommonStyles.mr10]}> {data1.orinalQuantity}  </Text>
            <TouchableOpacity style={[CommonStyles.circle]} onPress={() => {
              if (data.token) { plus() } else {
                localPlus()
              }

            }}>
              <Text style={{ marginBottom: 4, fontSize: 25, color: '#CCCCCC' }}>+</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={[CommonStyles.flex1, CommonStyles.alignItemEnd, CommonStyles.justifyContentCenter]}>
          <TouchableOpacity onPress={() => {
            if (data.token) {
              if (!netInfo.isConnected) {
                alert('Please checked your internet connection')
                return false;
              }
              removeCart(data.cart_id)
            } else {
              removelocalCart()
            }
          }}>
            <Trash />
          </TouchableOpacity>
        </View>
      </View>
      {data.iconAnimating1 ? <LoadingIcon isIconAnimating={data.iconAnimating1} /> : null}

    </View>
  )
}


export default CartItemScreen