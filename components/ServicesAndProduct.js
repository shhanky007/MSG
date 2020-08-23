import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import CommonStyles from '../common/CommonStyles'
import { getHeaderService, postHeaderService, getService } from '../common/Services';
import LoadingIcon from './LoadingIcon';
import NetInfo from "@react-native-community/netinfo";
import ServicesAndProductItemScreen from './ServicesAndProductItemScreen';
import CartDialog from './CartDialog'

export const ServiceScreen = ({navigation,route }) => {
  const [isCartOpen , setCartDialog] = React.useState(false)
  const [data, setData] = React.useState({
    productList: [],
    iconAnimating: false,
  });
  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        getProductList()
      } else {
        alert('Please checked your internet connection.')
      }
    });
  }
  useEffect(() => { 
    checkInternet()
  }, [])
  let getProductList = () => {
    setData({ ...data, iconAnimating: true })
    let url = 'test/getAllProduct/0/5';
    getService(url).then(res => {
      if (res.status == 200) {
        let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : {}
        setData({ ...data, iconAnimating: false, productList: responseData.AllTestData })
      } else {
        setData({ ...data, iconAnimating: false })
        alert(res.message)
      }
    }).catch(err => {
      setData({ ...data, iconAnimating: false })
      console.log(err)
    })
  }
  const isModalOpen = () =>{
    setCartDialog(true)
   
  }
  const showLoader = () => {
    setData({ ...data, iconAnimating: true })
  }
  const DismissLoader = () => {
    setData({ ...data, iconAnimating: false })
  }
  const renItem = ({ item, index }) => {
    return (<ServicesAndProductItemScreen data={item} onCartAdded = {isModalOpen}
      index={index} navigation={navigation} showLoader={showLoader} DismissLoader={DismissLoader}
    />)
  }
  const sepComponet = () => <View style={{
    borderBottomWidth: 1,
    borderColor: '#ddd'
  }} />
  const keyExtractor1 = (item, index) => index.toString()
 
  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.bgWhite, CommonStyles.justifyContentStart]}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 25 }}
        data={data.productList}
        ItemSeparatorComponent={sepComponet}
        renderItem={renItem}
        keyExtractor={keyExtractor1}

      />
      <CartDialog isCartOpen = {isCartOpen} closeDialog = {()=>setCartDialog(false)} navigation  = {navigation } />     
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}
      
    </SafeAreaView>

  );
}

