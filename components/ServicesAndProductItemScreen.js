import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import CommonStyles from '../common/CommonStyles'
import NextArrow from '../assets/icons/NextArrow';
import { useNetInfo } from "@react-native-community/netinfo";
import { postHeaderService } from '../common/Services';
import { API_URL } from '../config/path';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../context';



const ServicesAndProductItemScreen = (props) => {
  
  const netInfo = useNetInfo();
  // const [data, setData] = React.useState({
  //   token: ''
  // });
  let { data, index, navigation, showLoader, DismissLoader } = props;
  const { signOut } = React.useContext(AuthContext);
  const addToCart = async (data) =>{
    const customer_id = await AsyncStorage.getItem('MGS_customer_id')
    if(customer_id){
      if (!netInfo.isConnected) {
        alert('Please checked your internet connection')
        return false;
      }
      showLoader()
      data['customer_id'] = customer_id
      data['quantity'] = 1
      data['actualAmount'] = data['price']
      postHeaderService('cart/addCartData', data).then(res => {
        if (res.status == 200) {
          props.onCartAdded()
          DismissLoader()
        }else if (res.status == 201) {
          signOut()
        } else {
          alert(res.message)
          DismissLoader()
        }
      }).catch(err => {
        DismissLoader()
        console.log(err)
      })

    }else{
      let cartArray = await AsyncStorage.getItem('MGS_cart_array');
      let ArrayData;
      if (cartArray){
        ArrayData=JSON.parse(cartArray);
        let isExist = ArrayData.some(o => o.id ===data.id);
        if(isExist){
          alert("Product Item already added cart.")
          return false;
        }
      }else{
        ArrayData = [];
      }
      data['customer_id'] = customer_id
      data['quantity'] = 1
      data['actualAmount'] = data['price']

        ArrayData[ArrayData.length] = data;
        await AsyncStorage.setItem('MGS_cart_array',JSON.stringify(ArrayData));
        props.onCartAdded()
    }
  }

  
  return (
    <View style={[CommonStyles.flex1, CommonStyles.p20]}>
      <View style={[CommonStyles.flexDirectionRow, CommonStyles.justifyContentBetween]}>
        <View style={[CommonStyles.flex3]}>
          <Text style={[CommonStyles.fontBold, CommonStyles.greenColor, CommonStyles.font20, CommonStyles.pb10]}>{props.data.test_name}</Text>
          <Text style={[CommonStyles.pb10]}>{data.description}</Text>
          <Text style={[CommonStyles.fontBold, CommonStyles.font20]}>HK$ {props.data.price}</Text>
        </View>
        <View style={[CommonStyles.flex1, CommonStyles.alignItemCenter]}>
          <Image source={{ uri: API_URL + '' + data.test_image_path, cache: "force-cache" }} style={{ width: 100, height: 80 }} />
        </View>
      </View>

      <View style={[CommonStyles.flexDirectionRow, CommonStyles.justifyContentBetween]}>

        <View style={[CommonStyles.pt10, CommonStyles.flex3, CommonStyles.flexDirectionRow]}>
          <TouchableOpacity style={[CommonStyles.roundBtn, CommonStyles.flex1, CommonStyles.mr10]}
            onPress = {  () => addToCart(data) }         
          >
            <Text style={[CommonStyles.fontBold, CommonStyles.textCenter, CommonStyles.textUppercase]}>Add to cart</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[CommonStyles.roundBtn, CommonStyles.greenBG,CommonStyles.justifyContentCenter, CommonStyles.flex1, { borderColor: 'transparent' }]} 
            onPress={() => { 
              navigation.navigate('ShippingAddressScreen',{ orderSummary : { testId : props.data.test_code , test_image_path :  API_URL + props.data.test_image_path, test_name : props.data.test_name , quantity : 1 , price : props.data.price , actualAmount : props.data.price }  })
            }}>
            <Text style={[CommonStyles.fontBold, CommonStyles.textCenter, CommonStyles.colorWhite, CommonStyles.textUppercase]}>Buy now</Text>
          </TouchableOpacity>

        </View>

        <View style={[CommonStyles.flex1, CommonStyles.alignItemEnd, CommonStyles.justifyContentCenter]}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ProductCategoryScreen', { index: index, ...props.data })
          }}>
            <NextArrow />
          </TouchableOpacity>

        </View>
      </View>
       
    </View>
  )
}


export default ServicesAndProductItemScreen
