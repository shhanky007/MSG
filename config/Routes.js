import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../components/LoginScreen';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import { Button, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DrawerContents } from '../components/DrawerContents';
import { ServiceScreen } from '../components/ServicesAndProduct';
import { ProductCategoryScreen } from '../components/ProductCategory';
import { SubCategoryScreen } from '../components/SubCategory';
import { ReportsScreen } from '../components/Reports';
import { CartScreen } from '../components/Cart';
import { OrdersScreen } from '../components/Orders';
import { FeedbackScreen } from '../components/Feedback';
import { ContactUsScreen } from '../components/ContactUs';
import { AboutUsScreen } from '../components/AboutUs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from '../components/SplashScreen';
import SignInScreen from '../components/SignInScreen';
import CreateAccountScreen from '../components/CreateAccountScreen';
import PersonalInformtionScreen from '../components/PersonalInformationScreen';
import RegisterForKitScreen from '../components/RegisterForKitScreen';
import BarCodeScreen from '../components/BarCodeScreen';
import BarcodeConfirmationScreen from '../components/BarcodeConfirmation';
import Hamburger from '../assets/icons/Hamburger.js'
import Cart from '../assets/icons/Cart.js'
import ShippingAddressScreen from '../components/ShippingAddress';
import OrderSummaryScreen from '../components/OrderSummaryScreen';
import PaymentScreen from '../components/PaymentScreen';
import Filter from '../assets/icons/Filter';
import { ProfileScreen } from '../components/ProfileScreen';
import { ReportViewScreen } from '../components/ReportViewScreen';
import EditBlack from '../assets/icons/EditBlack';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../context';
import { clearSession } from '../common/Services';
import { MenuContext, Menu, MenuOption, MenuOptions, MenuTrigger, MenuProvider } from 'react-native-popup-menu'
import ForgetPasswordScreen from '../components/ForgetPasswordScreen';
import GenerateNewPasswordScreen from '../components/GenerateNewPassword';
import { CovidFormScreen } from '../components/CovidFormScreen';
import WhiteArrow from '../assets/icons/WhiteArrow';

export function Routes(props) {

  // const [data, setData] = useState({
  //   token: null
  // });

  const AuthStack = createStackNavigator();
  const AuthStackScreen = () => (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="splash" component={SplashScreen} />
      <AuthStack.Screen name="BarcodeConfirmationScreen" component={BarcodeConfirmationScreen} options={{
        title: 'Confirmation', headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#D5D5D5',

        }
      }} />
      <AuthStack.Screen name="BarCodeScreen" component={BarCodeScreen} options={{
        title: 'Enter Your Barcode', headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#D5D5D5',

        }
      }} />
      <AuthStack.Screen name="RegisterForKitScreen" component={RegisterForKitScreen} options={{
        title: 'Register For Kit', headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#D5D5D5',

        }
      }} />
      <AuthStack.Screen name="PersonalInformtionScreen" component={PersonalInformtionScreen} options={{ headerShown: true }} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} options={{
        title: '',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      }} />
      <AuthStack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{
        title: '',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      }} />
      <AuthStack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{
        title: '',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      }} />
      <AuthStack.Screen name="GenerateNewPasswordScreen" component={GenerateNewPasswordScreen} options={{
        title: '',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      }} />
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          headerShown: false
        }}
      />
    </AuthStack.Navigator>

  );
  const headerStyles = {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: '#D5D5D5',

  }

  const ServiceStack = createStackNavigator();
  const ServiceStackScreen = ({ navigation }) => (
    <ServiceStack.Navigator  >
      <ServiceStack.Screen
        name="ServiceScreen"
        component={ServiceScreen}

        options={{
          title: "Services/Products", headerStyle: headerStyles
          , headerTitleAlign: 'center',
           headerLeft: () => (showDrawerIcon(navigation)),
            headerRight: () => (showcartIcon(navigation)
          )
        }}
      />
      <ServiceStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: "Cart", headerStyle: headerStyles, headerTitleAlign: 'center' }}
      />
      <ServiceStack.Screen
        name="ProductCategoryScreen"
        component={ProductCategoryScreen}
        options={{ title: "Category", headerTitleAlign: 'center' }}
      />
      <ServiceStack.Screen
        name="SubCategoryScreen"
        component={SubCategoryScreen}
        options={{ title: "SubCategory", headerTitleAlign: 'center' }}
      />
      <ServiceStack.Screen
        name="ShippingAddressScreen"
        component={ShippingAddressScreen}
        options={{ title: "Shipping Address",headerStyle: headerStyles, headerTitleAlign: 'center' }}
      />
      <ServiceStack.Screen
        name="OrderSummaryScreen"
        component={OrderSummaryScreen}
        options={{ title: "Order Summary",headerStyle: headerStyles, headerTitleAlign: 'center' }}
      />

      <ServiceStack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ title: "Payment",headerStyle: headerStyles,
        // headerLeft:()=>{return <WhiteArrow/>},
         headerTitleAlign: 'center' }}
      />
      <ServiceStack.Screen
        name="CovidFormScreen"
        component={CovidFormScreen}
        options={{ title: "COVID-19 FORM", headerStyle: headerStyles, headerTitleAlign: 'center' }}
      />
    </ServiceStack.Navigator>
  );

  const ReportStack = createStackNavigator();
  const ReportStackScreen = ({ navigation }) => (
    <ReportStack.Navigator>
      <ReportStack.Screen
        name="ReportsScreen"
        component={ReportsScreen}
      />
      <ReportStack.Screen
        name="ReportViewScreen"
        component={ReportViewScreen}
        options={{ title: "View Reports", headerStyle: headerStyles, headerTitleAlign: 'center' }}
      />
      
    </ReportStack.Navigator>
  );

  const OrderStack = createStackNavigator();
  const OrderStackScreen = ({ navigation }) => (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
      />

    </OrderStack.Navigator>
  );

  const FeedbackStack = createStackNavigator();
  const FeedbackStackScreen = ({ navigation }) => (
    <FeedbackStack.Navigator>
      <FeedbackStack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{ title: "Feedback", headerStyle: headerStyles, headerTitleAlign: 'center', headerLeft: () => (showDrawerIcon(navigation)) }}
      />

    </FeedbackStack.Navigator>
  );

  const ContactUsStack = createStackNavigator();
  const ContactUsStackScreen = ({ navigation }) => (
    <ContactUsStack.Navigator>
      <ContactUsStack.Screen
        name="ContactUsScreen"
        component={ContactUsScreen}
        options={{ title: "Contact Us", headerStyle: headerStyles, headerTitleAlign: 'center', headerLeft: () => (showDrawerIcon(navigation)) }}
      />

    </ContactUsStack.Navigator>
  );

  const AboutUsStack = createStackNavigator();
  const AboutUsStackScreen = ({ navigation }) => (
    <AboutUsStack.Navigator>
      <AboutUsStack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{ title: "About Us", headerStyle: headerStyles, headerTitleAlign: 'center', headerLeft: () => (showDrawerIcon(navigation)) }}
      />

    </AboutUsStack.Navigator>
  );

  const ProfileStack = createStackNavigator();
  const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile", headerStyle: headerStyles, headerTitleAlign: 'center', headerRight: () => (showEditIcon(navigation)) }}
      />
      <AuthStack.Screen name="PersonalInformtionScreen" component={PersonalInformtionScreen} options={{ headerShown: false }} />

    </ProfileStack.Navigator>
  );

  const showDrawerIcon = (navigation) => {
    return (
      <TouchableOpacity activeOpacity={1} underlayColor="white"
        onPress={() => navigation.openDrawer()}
        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <Hamburger />
      </TouchableOpacity>
    );
  }

  const showcartIcon = (navigation) => {
    return (
      <TouchableOpacity activeOpacity={1} underlayColor="white"
        onPress={() => {
          if (loginState.userToken) { navigation.navigate('CartScreen', { token: true }) } else {
            navigation.navigate('CartScreen', { token: false })
          }
        }}
        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <Cart />
      </TouchableOpacity>
    );
  }

  const showEditIcon = (navigation) => {
    return (
      <TouchableOpacity activeOpacity={1} underlayColor="white"
        onPress={() => navigation.navigate('PersonalInformtionScreen', { title: 'Edit Profile' })}
        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <EditBlack />
      </TouchableOpacity>
    );
  }

  const showFilterIcon = (navigation) => {
    return (
      // <TouchableOpacity activeOpacity={1} underlayColor="white"
      //   onPress={() => navigation.navigate('CartScreen')}
      //   style={{ height: '100%', alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
      //   <Filter />
      // </TouchableOpacity>
      <Menu style={{ position: 'absolute', alignItems: 'center', right: 8 }}>
        <MenuTrigger>
          <Filter />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ marginTop: 30, width: 100, borderRadius: 6 }}>
          <MenuOption style={{ paddingLeft: 6 }} text='sort by date' />
          <MenuOption style={{ paddingLeft: 6 }} text='Logout' />
        </MenuOptions>
      </Menu>
    );
  }


  const Drawer = createDrawerNavigator();
  const DrawerScreen = (props) => {

    return (
      <Drawer.Navigator drawerContent={props => <DrawerContents {...props} token={loginState.userToken} firstName={loginState.userName} />}>
        <Drawer.Screen options={{ swipeEnabled: false }} name="ServicesScreen" component={ServiceStackScreen}></Drawer.Screen>
        <Drawer.Screen options={{ swipeEnabled: false }} name="ReportsScreen" component={ReportStackScreen} />
        <Drawer.Screen options={{ swipeEnabled: false }} name="OrdersScreen" component={OrderStackScreen}></Drawer.Screen>
        <Drawer.Screen options={{ swipeEnabled: false }} name="FeedbackScreen" component={FeedbackStackScreen} />
        <Drawer.Screen options={{ swipeEnabled: false }} name="ContactUsScreen" component={ContactUsStackScreen} />
        <Drawer.Screen options={{ swipeEnabled: false }} name="AboutUsScreen" component={AboutUsStackScreen} />
        <Drawer.Screen options={{ swipeEnabled: false }} name="ProfilesScreen" component={ProfileStackScreen} />

      </Drawer.Navigator>
    );
  }
  const RootStack = createStackNavigator();
  const RootStackScreen = () => (

    <RootStack.Navigator headerMode="none" >
      {loginState.userToken !== null ? (
        <RootStack.Screen
          name="App"
          component={DrawerScreen}
          options={{
            animationEnabled: false
          }}
        />
      ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{
              animationEnabled: false
            }}
          />
        )
      }
    </RootStack.Navigator>
  );

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userName: action.userName,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.userName,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };


    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const _storeToken = async (data) => {
    try {

      await AsyncStorage.setItem('MGS_token', data.token)
      await AsyncStorage.setItem('MGS_customer_id', "" + data.registered_customer_unique_id)
      await AsyncStorage.setItem('MGS_f_name', "" + data.f_name)
      await AsyncStorage.setItem('MGS_Login_Data', JSON.stringify(data))

    } catch (error) {
      console.log('sign catch ', error)
    }
  }
  const authContext = React.useMemo(() => ({
    signIn: (data) => {
      let userToken = data.token;
      let userName = data.f_name;
      _storeToken(data)
      dispatch({ type: 'LOGIN', userName: userName, token: userToken });
    },
    signOut: () => {
      clearSession();
      dispatch({ type: 'LOGOUT' });
    }
    , signUp: async () => {
      let userToken = null;
      let userName = null;
      try {
        userToken = await AsyncStorage.getItem('MGS_token');
        userName = await AsyncStorage.getItem('MGS_f_name');
      } catch (e) {
        console.log(e);
      }
      // _storeToken(data)
      dispatch({ type: 'LOGIN', userName: userName, token: userToken });
    }

  }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      let userName = null;
      try {
        userToken = await AsyncStorage.getItem('MGS_token');
        userName = await AsyncStorage.getItem('MGS_f_name')
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', userName: userName, token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SplashScreen />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>

          <RootStackScreen />
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

