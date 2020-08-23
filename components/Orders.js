
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, Text, Button, TextInput } from 'react-native';
import CommonStyles from '../common/CommonStyles'
import { getHeaderService, getFormatedDate } from '../common/Services';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import LoadingIcon from './LoadingIcon';
import PassKey from '../assets/icons/pass_key';
import Search from '../assets/icons/Search';
import { AuthContext } from '../context';
import { MenuContext, Menu, MenuOption, MenuOptions, MenuTrigger, MenuProvider } from 'react-native-popup-menu'
import Hamburger from '../assets/icons/Hamburger.js';
import Filter from '../assets/icons/Filter';

export function OrdersScreen({ navigation }) {
  const [searchText,setSearchText]=useState('')
  const [orderExpand,setOrderExpanded] = React.useState({
    selectedId: '',
    isExpanded: false,
  });
  const [data, setData] = React.useState({
    oderList: [],
    iconAnimating: false,
  });
  
  const RenderList = ({ data }) => {
    return (
      <>
      <View style={[CommonStyles.flex1, CommonStyles.bgWhite, CommonStyles.p20, CommonStyles.mlrt16, { marginBottom: 5,  borderRadius: 10 }, { elevation: 10 }]}>
        <View style={[CommonStyles.flexDirectionRow,CommonStyles.justifyContentBetween]}>
          <View>
            <Text style={[CommonStyles.font12]}>Order#</Text>
            <TouchableOpacity onPress={ () =>  setOrderExpanded({...orderExpand, isExpanded : !orderExpand.isExpanded , selectedId : data.order_id}) }>
              <Text style={[CommonStyles.fontBold,CommonStyles.anchor,CommonStyles.lineHeight15]}>{data.order_id}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[CommonStyles.font12]}>Qty</Text>
            <Text style={[CommonStyles.fontBold,CommonStyles.lineHeight15]}>{data.order_quantity}</Text>
          </View>

          <View>
            <Text style={[CommonStyles.font12]}>Amount</Text>
            <Text style={[CommonStyles.fontBold,CommonStyles.lineHeight15]}>HK$ {data.total_order_amount}</Text>
          </View>

          <View>
            <Text style={[CommonStyles.font12]}>Ordered On</Text>
            <Text style={[CommonStyles.fontBold,CommonStyles.lineHeight15]}>{getFormatedDate(data.orderDate) }</Text>
          </View>
        </View>
        <View style={[CommonStyles.mt10]}>
          <Text> <Text style={[CommonStyles.fontBold]}>Shipping Address:</Text> { data.order_shipping } </Text>
        </View>
      </View>
      {
        orderExpand.isExpanded == true && orderExpand.selectedId == data.order_id ?
        <View style={[CommonStyles.flex1, CommonStyles.p10,{ marginLeft : 16 ,marginRight:16 , marginBottom:10, borderColor:'#C0C0C0', borderWidth : 1 , borderRadius :5 }]}>
          <View style={[CommonStyles.flexDirectionRow,CommonStyles.justifyContentBetween]}>
            <View style={[CommonStyles.flex05]}>
            <Text style={[CommonStyles.fontBold]}>S.No</Text>
            </View>
            <View style={[CommonStyles.flex1]}>
              <Text style={[CommonStyles.fontBold]}>Test Product</Text>
            </View>
            
            <View style={[CommonStyles.flex1]}>
              <Text style={[CommonStyles.fontBold]}>Amount</Text>
            </View>
          </View>
          <>
            {
              data.productData && data.productData.length > 0 ?
              data.productData.map((x,i)=>{
                return(
                <View style={[CommonStyles.flexDirectionRow,{keyExtractor:i.toString()},CommonStyles.pt10, CommonStyles.justifyContentBetween]}>
                  <View style={[CommonStyles.flex05]}>
                    <Text>{i+1}</Text>
                  </View>
                  <View style={[CommonStyles.flex1]}>
                    <Text>{x.test_name}</Text>
                  </View>
                  
                  <View style={[CommonStyles.flex1]}>
                    <Text>HK$ {x.total_order_amount}</Text>
                  </View>  
                </View>)
                
              }) : null
            }
          </>
        </View>
        : null
      }
      </>
    )
  }
  const { signOut } = React.useContext(AuthContext);

  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        getOrderList()
      } else {
        alert('Please checked your internet connection.')
      }
    });
  }
  const headerStyles = {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: '#D5D5D5',

  }
  React.useLayoutEffect(() => {

    navigation.setOptions({
       title: "Orders",
        headerStyle: headerStyles,
         headerTitleAlign: 'center',
          headerLeft: () => (showDrawerIcon(navigation)),
          headerRight: () => (showFilterIcon(navigation)) 
    });
  }, [navigation]);

  const showDrawerIcon = (navigation) => {
    return (
      <TouchableOpacity activeOpacity={1} underlayColor="white"
        onPress={() => navigation.openDrawer()}
        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <Hamburger />
      </TouchableOpacity>
    );
  }

  const showFilterIcon = (navigation) => {
    return (
      <Menu style={{ position: 'absolute', alignItems: 'center', right: 8 }}>
        <MenuTrigger>
          <Filter />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ marginTop: 30, width: 100, borderRadius: 6 }}>
          <MenuOption style={{ paddingLeft: 6 }} onSelect={() => {
            const copy = [...data.orderList];
            copy.sort(function(a, b) {
              return   new Date(b.orderDate) - new Date(a.orderDate);
            });
            setData({ ...data,  orderList: copy })
          }} text='Sort by Date' />
          <MenuOption style={{ paddingLeft: 6 }} onSelect={() => {
            const copy = [...data.orderList];
            copy.sort(function(a, b) {
              return   b.total_order_amount - a.total_order_amount;
            });
            
            setData({ ...data,  orderList: copy })
            
          }} text='Sort by Price' />
        </MenuOptions>
      </Menu>
    );
  }


  useEffect(() => {
    checkInternet()
  }, [])

  let getOrderList = async () => {
    setData({ ...data, iconAnimating: true })
    const customer_id = await AsyncStorage.getItem('MGS_customer_id')
    let url = 'order/CustomerOrders/' + customer_id;
    getHeaderService(url).then(res => {
      if (res.status == 200) {
       let responseData = res.data && res.data.order_ids ? res.data.order_ids : []
        responseData.map( (x,i)=>{
          x.order_quantity = x.productData.length;
          x.order_shipping = x.productData[0].customer_order_address + ', ' + (  x.productData[0].city ? x.productData[0].city + ', ' : ''  ) + (  x.productData[0].state ? x.productData[0].state + ', ' : ''  ) + (  x.productData[0].country ? x.productData[0].country + ', ' : ''  ) + (  x.productData[0].zip ? x.productData[0].zip + ', ' : ''  ) ;
          x.orderDate = x.productData[0]['order_date']
          x.total_order_amount = x.productData.length > 0 ? x.productData.reduce((prev,next) => prev + next.total_order_amount,0) : 0
        })
        setData({ ...data, iconAnimating: false, orderList: responseData })
      } else if (res.status == 201) {
        signOut()
    }else {
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
      <View>
       <FlatList
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 25 }}
          data={data.orderList}
          ItemSeparatorComponent={() => <View style={{
            borderBottomWidth: 1,
            borderColor: '#ddd'
          }} />}
          renderItem={({ item }) => (<RenderList data={{ ...item, navigation: navigation }} />)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}
    </SafeAreaView>
  );
}