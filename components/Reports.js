
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, Linking, Text, PermissionsAndroid } from 'react-native';
import CommonStyles from '../common/CommonStyles'
import Download from '../assets/icons/Download'
import AsyncStorage from '@react-native-community/async-storage';
import { getFormatedDate, getHeaderService, downloadPDF } from '../common/Services';
import LoadingIcon from '../components/LoadingIcon'
import NetInfo from "@react-native-community/netinfo";
import { TextInput } from 'react-native-gesture-handler';
import Search from '../assets/icons/Search';
import { AuthContext } from '../context';
import { MenuContext, Menu, MenuOption, MenuOptions, MenuTrigger, MenuProvider } from 'react-native-popup-menu'
import Hamburger from '../assets/icons/Hamburger.js';
import Filter from '../assets/icons/Filter';
import { debug } from 'react-native-reanimated';

export const ReportsScreen=({ navigation })=> {
  const [searchText, setSearchText] = useState('')
  const [reportsList, setReportsList] = useState([])
  const [forceRender, setforceRender] = useState(false)

  const [data, setData] = useState({
    iconAnimating: false,
    customer_id: 0,
    temparray: []
  });
  const { signOut } = React.useContext(AuthContext);
  const downloadFile = async (url, fileName) => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to memory to download the file "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permission Granted", url);
        setData({ ...data, iconAnimating: true })
        downloadPDF(url, fileName).then(res => {
          // console.log('response: ', res)
          setData({ ...data, iconAnimating: false })

        }).catch(err => {
          console.log(err)
        })
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const RenderList = ({ data }) => {
    return (
      <View style={[CommonStyles.flex1, CommonStyles.bgWhite, CommonStyles.p20, CommonStyles.mlrt16, { marginBottom: 20, borderRadius: 10 }, { elevation: 20 }]}>
        <View style={[CommonStyles.flexDirectionRow,]}>

          <View style={[CommonStyles.flexDirectionColumn,]}>
            <Text style={[CommonStyles.textStyle14]}>{getFormatedDate(data.sample_received_date)}</Text>
            <TouchableOpacity activeOpacity={1} onPress={() => { data.Organization_ID ? navigation.navigate("ReportViewScreen", { reportId: data.report_unique_id }) : null }}>
              <Text style={[CommonStyles.textStyle18, { color: '#DDDA2C' }]}>{data.test_name}</Text>
            </TouchableOpacity>
          </View>
          <View style={[CommonStyles.flex1, CommonStyles.alignItemEnd, CommonStyles.justifyContentCenter]}>
            {
              data.test_report_path ?
                <TouchableOpacity onPress={() => downloadFile(data.test_report_path, data.filename)}>
                  <Download />
                </TouchableOpacity> : null
            }
          </View>
        </View>
        {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

      </View>
    )
  }

  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        getReportsList()
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

  useEffect(() => {
    navigation.setOptions({
      title: "Report",
      headerStyle: headerStyles,
      headerTitleAlign: 'center',
      headerLeft: () => (showDrawerIcon(navigation)),
      headerRight: () => (showFilterIcon(navigation))
    });
  });

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
            let shortedV=reportsList.sort((x,y)=>{
              let a = new Date(x.sample_received_date),
                  b = new Date(y.sample_received_date);
                  return a-b
            })
            setReportsList(c=>c=shortedV);
            setforceRender(!forceRender)
            console.log("checl fpr value",reportsList)
          }} text='Sort by Date' />
          <MenuOption style={{ paddingLeft: 6 }} onSelect={() => {
            setReportsList(copy => copy.sort((a, b) => a.test_name.localeCompare(b.test_name)))
          }} text='Sort by Name' />
        </MenuOptions>
      </Menu>
    );
  }
  useEffect(() => {
    checkInternet()
  }, [])

  let getReportsList = async () => {
    setData({ ...data, iconAnimating: true })
    const customer_id = await AsyncStorage.getItem('MGS_customer_id')

    let url = 'customer/getAllCustomerReport/' + customer_id;
    getHeaderService(url).then(res => {
      if (res.status == 200) {
        let responseData = res.data && Object.keys(res.data).length > 0 ? res.data : []
        setReportsList(responseData)
        //navigation.setParams({ orderlist: responseData })
        setData({ ...data, iconAnimating: false, temparray: responseData })
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
  const searchData = (text) => {

    setSearchText(text)
    const newData = data.temparray.filter(item => {

      const itemData = ` ${item.test_name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

    setReportsList(newData)

  }
  
  console.log('before return ', reportsList);
  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
      <View style={{ marginBottom: 40 }}>
        <View style={{ backgroundColor: '#D5D5D5' }}>
          <View style={{ margin: 20, flexDirection: 'row' }}>
            <TextInput
              placeholder='Search with Test Name'
              placeholderTextColor="#2B2B2B"
              style={[CommonStyles.flex10, { paddingBottom: 5, borderBottomWidth: 1 }, CommonStyles.p0]}
              value={searchText}
              onChangeText={value => { searchData(value) }}
            />
            <View style={{ borderBottomWidth: 1, }}>
              <Search />
            </View>
          </View>
        </View>

        <FlatList
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 25 }}
          data={reportsList}
          ItemSeparatorComponent={() => <View style={{
            borderBottomWidth: 1,
            borderColor: '#ddd'
          }} />}

          renderItem={({ item }) => (<RenderList data={{ ...item, navigation: navigation }} />)}
          keyExtractor={(item, index) => index.toString()}

        /></View>
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

    </SafeAreaView>
  );
}