import { StyleSheet ,Dimensions} from 'react-native';
const { width } = Dimensions.get('window');

const CommonStyles = StyleSheet.create({
  mlr0: {
    marginLeft: 0,
    marginRight: 0,
  },
  m0: {
    margin: 0
  },
  mb0: {
    marginBottom: 0
  },
  mb5: {
    marginBottom: 5
  },
  mb10: {
    marginBottom: 10
  },
  mb20: {
    marginBottom: 20
  },
  mb25: {
    marginBottom: 25
  },
  mb35: {
    marginBottom: 35
  },
  mr3: {
    marginRight: 3
  },
  mr5: {
    marginRight: 5
  },
  mr10: {
    marginRight: 10
  },
  mr20: {
    marginRight: 20
  },
  mr30: {
    marginRight: 30
  },
  mt_20: {
    marginTop: -20
  },
  mt0: {
    marginTop: 0
  },
  mt5: {
    marginTop: 5
  },
  mt10: {
    marginTop: 10
  },
  mt20: {
    marginTop: 20
  },
  mt40: {
    marginTop: 40
  },
  p0: {
    padding: 0
  },
  pt0: {
    paddingTop: 0
  },
  pt5: {
    paddingTop: 5
  },
  pb5: {
    paddingBottom: 5
  },
  pt10: {
    paddingTop: 10
  },
  pt20: {
    paddingTop: 20
  },
  p15: {
    padding: 15
  },
  p8: {
    padding: 8
  },
  p10: {
    padding: 10
  },
  p20: {
    padding: 20
  },
  plrb0: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  },
  plrb5: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  pb0: {
    paddingBottom: 0
  },
  pb10: {
    paddingBottom: 10
  },
  plr5: {
    paddingLeft: 5,
    paddingRight: 5
  },
  plr10: {
    paddingLeft: 10,
    paddingRight: 10
  },
  plr20: {
    paddingLeft: 20,
    paddingRight: 20
  },
  plr30: {
    paddingLeft: 30,
    paddingRight: 30
  },
  pb20: {
    paddingBottom: 20
  },
  fontBold: {
    fontWeight: 'bold'
  },
  font8: {
    fontSize: 8
  },
  font10: {
    fontSize: 10
  },
  font12: {
    fontSize: 12
  },
  font15: {
    fontSize: 15
  },
  font15: {
    fontSize: 16
  },
  font17: {
    fontSize: 17
  },
  font18: {
    fontSize: 18
  },
  font20: {
    fontSize: 20
  },
  font22: {
    fontSize: 22
  },
  font24: {
    fontSize: 24
  },
  font26: {
    fontSize: 26
  },
  font28: {
    fontSize: 28
  },
  font30: {
    fontSize: 30
  },
  font42: {
    fontSize: 42
  },
  lineHeight10: {
    lineHeight: 15
  },
  lineHeight15: {
    lineHeight: 22
  },
  themeFontColor: {
    color: '#e78200'
  },
  textCapitalize: {
    textTransform: 'capitalize'
  },
  textUppercase: {
    textTransform: 'uppercase'
  },
  colorBlack: {
    color: '#000'
  },
  colorLightBlack: {
    color: '#444'
  },
  colorGrey: {
    color: '#6C6867'
  },
  colorWhite: {
    color: '#fff'
  },
  themeBackgroundColor: {
    backgroundColor: 'rgb(82,169,233)'
  },
  bgWhite: {
    backgroundColor: '#ffffff'
  },
  buttonBackground: {
    backgroundColor: '#349'
  },
  flexBasis50: {
    flexBasis: '50%'
  },
  flexWrap: {
    flexWrap: 'wrap'
  },
  flexGrow1: {
    flexGrow: 1
  },
  flex05: {
    flex: 0.5
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  flex3: {
    flex: 3
  },
  flex5: {
    flex: 5
  },
  flex10: {
    flex: 10
  },
  flex15: {
    flex: 15
  },
  flex20: {
    flex: 20
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  flexDirectionColumn: {
    flexDirection: 'column'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  justifyContentStart: {
    justifyContent: 'flex-start'
  },
  justifyContentEnd: {
    justifyContent: 'flex-end'
  },
  justifyContentBetween: {
    justifyContent: 'space-between'
  },
  justifyContentAround: {
    justifyContent: 'space-around'
  },
  justifyContentEven: {
    justifyContent: 'space-evenly'
  },
  alignSelfStart: {
    alignSelf: 'flex-start'
  },
  alignSelfEnd: {
    alignSelf: 'flex-end'
  },
  alignSelfStretch: {
    alignSelf: 'stretch'
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  alignItemCenter: {
    alignItems: 'center'
  },
  alignItemStart: {
    alignItems: 'flex-start'
  },
  alignItemEnd: {
    alignItems: 'flex-end'
  },
  alignItemStretch: {
    alignItems: 'stretch'
  },
  anchor: {
    color: 'rgb(30,71,122)',
    //color:'rgb(82,169,233)',
    textDecorationLine: "underline",
  },
  iosDropdownBtn: {
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  activeTab: {
    backgroundColor: '#e78200'
  },
  nonActiveTab: {
    backgroundColor: 'transparent'
  },
  activeTextTab: {
    color: '#FFFFFF'
  },
  nonActiveTextTab: {
    color: '#808080'
  },
  tooltipHeading: {
    color: 'rgb(82,169,233)',
    // textDecorationLine : 'underline'
  },
  appDarkBlackButton: {
    backgroundColor: '#222222',
    borderColor: '#222222',
    borderWidth: 1,
    borderRadius: 50
  },
  appBlackButton: {
    backgroundColor: '#6C6867',
    borderColor: '#6C6867',
    borderWidth: 1,
    borderRadius: 50
  },
  appWhiteButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#6C6867',
    borderWidth: 1,
    borderRadius: 50,
    padding: 16
  },
  appGreenButton: {
    backgroundColor: '#55B9A7',
    borderColor: '#55B9A7',
    borderWidth: 1,
    borderRadius: 50
  },
  footerButton: {
    backgroundColor: 'transparent',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50
  },
  optionRatingBox: {
    borderColor: '#555555',
    borderWidth: 0.5,
    padding: 10
  },
  borderBox: {
    borderColor: '#eee',
    borderWidth: 1,
    padding: 20
  },
  switchLeftButton: {
    padding: 10,
    borderColor: '#e78200',
    borderWidth: 1,
    borderRightWidth: 0
  },
  switchRightButton: {
    padding: 10,
    borderColor: '#e78200',
    borderWidth: 1,
    borderLeftWidth: 0
  },
  tabLeftButton: {
    paddingTop: 10,
    paddingRight: 25,
    paddingBottom: 10,
    paddingLeft: 25,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderColor: '#e78200',
    borderWidth: 1,
    borderRightWidth: 0
  },

  tabRightButton: {
    paddingTop: 10,
    paddingRight: 25,
    paddingBottom: 10,
    paddingLeft: 25,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: '#e78200',
    borderWidth: 1,
    borderLeftWidth: 0
  },
  button: {
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',

  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    padding: 20,
    color: 'white'
  },
  headerLogo: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 0,
    paddingTop: 0
  },
  textBorderBottomWidth: {
    borderBottomWidth: 1
  },
  textBorderBottomColor: {
    borderBottomColor: '#dcdcdc'
  },
  buttonBorderWidth: {
    borderWidth: 1,
  },
  buttonBorderColor: {
    borderColor: '#349'
  },
  optionRatingCircle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#868686',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  optionRatingCheckedCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#ffe400',
    borderWidth: 1,
    borderColor: '#cc8600',

  },
  radioSquare: {
    height: 20,
    width: 20,
    borderRadius: 3,
    marginRight: 5,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCheckedSquare: {
    width: 10,
    height: 10,
    // borderRadius: 10,
    backgroundColor: '#e78200',
  },

  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 15,
    marginRight: 5,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCheckedCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(82,169,233)',
  },
  textLeft: {
    textAlign: 'left'
  },
  textCenter: {
    textAlign: 'center'
  },
  textRight: {
    textAlign: 'right'
  },
  textJustify: {
    textAlign: 'justify'
  },
  textAreaContainer: {
    marginTop: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    borderRadius: 2,
  },
  footer: {
    paddingTop: 1,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'transparent'
    //backgroundColor:'rgb(249,249,249)'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  StarImage: {
    width: 25,
    height: 25,
    marginLeft: 5,
    marginBottom: 5,
    marginRight: 5
  },
  fontColorBlue: {
    color: 'rgb(24,24,88)'
  },
  profileBox: {
    borderRadius: 100,
    backgroundColor: 'rgb(230,242,252)'
  },
  inputBox: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    padding: 10,
  },
  selectBox: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    padding: 0,
  },
  transparentBorderInput: {
    borderColor: 'transparent'
  },
  bannerText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  progressBar: {
    height: 6,
    width: '100%',
    backgroundColor: '#dcdcdc',
    borderColor: '#000',
    borderRadius: 5
  },
  absoluteFillProgressBar: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: "#60bee6",
    // backgroundColor: "rgb(0,226,199)", 

  },
  arrowIcon: {
    width: 30,
    height: 30,

  },
  invoiceListingCard: {
    height: 75,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 10,
    borderRadius: 6,
    backgroundColor: 'white',
    elevation: 10
  },
  myOderListingCard: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 10,
    borderRadius: 6,
    backgroundColor: 'white',
    // height: 104,
    elevation: 6
  },
  fontThemeColor: {

    color: '#e78200'
  },
  font16: {
    fontSize: 16
  }, font30: {
    fontSize: 30
  },
  radioSquare: {
    height: 20,
    width: 20,
    borderRadius: 3,
    marginRight: 5,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorListingCard: {
    marginTop: 5,
    marginRight: 10,
    width: 20,
    height: 20,
    borderRadius: 3,
    elevation: 0
  },
  ml20: {
    marginLeft: 20
  },
  mlrt16: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16
  },
  dropdownBox: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#eee',
    // padding:10,
  },

  bodyPartCircle: {
    width: 15,
    height: 15,
    borderRadius: 20
  }
  ,mlrt20: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  textStyleNotoSansKR14:{
    fontFamily: 'NotoSansKR-Regular',
    fontSize:14,
    color: '#000000'
  }, 
  textStyleLightBlackNotoSansKR14:{
    fontFamily: 'NotoSansKR-Regular',
    fontSize:14,
    color: '#2B2B2B'
  },
  textStyleNotoSansKRMedium14:{
    fontFamily: 'NotoSansKR-Medium',
    fontSize:16,
    color: '#2B2B2B'
  },
  textStyle14:{
    fontFamily: 'NunitoSans-SemiBold',
    fontSize:14,
    color: '#2B2B2B'
  },
  textStyleSemiBold14:{
    fontFamily: 'NunitoSans-SemiBold',
    fontSize:14,
    color: '#2B2B2B'
  },
  textStyle13:{
    fontFamily: 'NunitoSans-Regular',
    fontSize:13,
    color: '#2B2B2B'
  },
  textStyleBold16:{
    fontFamily: 'NunitoSans-Bold',
    fontSize:16,
    color: '#000'
  },
  textStyle16:{
    fontFamily: 'NunitoSans-Regular',
    fontSize:16,
    color: '#2B2B2B'
  },
  textStyle18:{
    fontFamily: 'NunitoSans-Bold',
    fontSize:18,
    color: '#2B2B2B'
  },
  textStyle20:{
    fontFamily: 'NunitoSans-Bold',
    fontSize:20,
    color: '#2B2B2B'
  },
  fontFamilyNunitoSansRegular: {
    fontFamily: 'NunitoSans-Regular'
  },
  fontFamilyNunitoSansSemiBold: {
    fontFamily: 'NunitoSans-SemiBold'
  },
  fontFamilyNunitoSansBold: {
    fontFamily: 'NunitoSans-Bold'
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
},
unCheckedcircle: {
  height: 20,
  width: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#707070',
  alignItems: 'center',
  justifyContent: 'center',
},
checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 7,
    backgroundColor: '#43AFE8',
},
ml10: {
  marginLeft: 10
},
bodyPartCircle:{
  width : 15, 
  height : 15,  
  borderRadius : 20
},
subCategoryCardView:{
  borderColor : 'transparent',  
  borderWidth : 1 , 
  borderRadius : 5,
  backgroundColor:'#ffffff', 
  elevation : 3,
  margin: 10,
  padding:20,
  alignItems:'center'
},
categoryCardView:{
  borderColor : 'transparent',  
  borderWidth : 1 , 
  borderRadius : 10,
  backgroundColor:'#ffffff', 
  elevation : 6,
  width: width - 80,
  margin: 10,
  justifyContent:'space-between',
  alignItems:'center'
},
greenColor:{
  color:'#81D600'
},
greenBG:{
  backgroundColor:'#81D600'
},
grayBG:{
  backgroundColor : '#6C6867'
},
roundBtn:{
  backgroundColor:'transparent',
  borderColor:'#808080',
  borderWidth:1,
  borderRadius:50,
  paddingTop:12,
  paddingBottom:12,
  paddingLeft:20,
  paddingRight:20
},


});

export default CommonStyles

