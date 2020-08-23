import React, {Component,useEffect, useState } from 'react';
import { Modal,TouchableWithoutFeedback,Platform,View,Text,Image,StyleSheet,Picker,TouchableHighlight,TouchableOpacity} from 'react-native';
import CommonStyles from '../common/CommonStyles'
import AsyncStorage from '@react-native-community/async-storage';

const getToken = async () =>{
    const customer_id = await AsyncStorage.getItem('MGS_token')
    if(customer_id)return true

    return false
}


function CartDialog( {navigation , isCartOpen, closeDialog}  ) {
    const [isVisible , setModalVisible] = React.useState(false)
    const sendToCart = async () =>{
        const customer_id = await AsyncStorage.getItem('MGS_token')
        navigation.navigate('CartScreen',{ token : customer_id ? true : false })
        closeDialog()
    }

    setTimeout(()=>{closeDialog()}, 5000)


    return(
        <View style={styles.container, { position : 'absolute' } }>
            <View style={styles.content }> 
                <View style={styles.inputContainer}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isCartOpen}
                        onRequestClose={() => closeDialog()   }
                        >
                        <TouchableWithoutFeedback
                        onPress={()=> closeDialog() }
                        >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                            <View style={[CommonStyles.flex1, CommonStyles.flexDirectionRow,CommonStyles.justifyContentCenter,CommonStyles.alignItemCenter]}>
                                <Text>An item has been added to your cart.&nbsp;&nbsp;</Text>    
                                <TouchableOpacity onPress={ () => sendToCart()  }>
                                    <Text style={[CommonStyles.anchor]}>View Cart</Text>
                                </TouchableOpacity>
                            </View>
                            
                            
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>               
            </View>
        </View>
    )
}

export default CartDialog



const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      justifyContent: "center",
      alignItems: "center"
    },
    content: {
      
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 5,
      alignSelf: "stretch",
      justifyContent: "center"
    },
    inputContainer: {
      ...Platform.select({
        ios: {
          //borderBottomColor: "gray",
          //borderBottomWidth: 1
        }
      })
    },
    input: {
      height: 40
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      
    },
    modalContent: {
      
      justifyContent: "flex-end",
      flexDirection: "row",
      paddingTop: 7,
      paddingBottom : 7,
      paddingRight : 7,
      backgroundColor: "#ececec"
    }
  });