
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import CommonStyles from '../common/CommonStyles'
const { width } = Dimensions.get('window');
import { useNetInfo } from "@react-native-community/netinfo";
import LoadingIcon from './LoadingIcon';
import { postHeaderService } from '../common/Services';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../context';
import { API_URL } from '../config/path';
import Checkmark from '../assets/icons/checkmark';
import CheckmarkForList from '../assets/icons/CheckmarkForList';
const ExerciseAndActivity = [
  {
    name: 'Power',
    description: 'Recruit more fast-twitch fibers which contract quickly but tire rapidly',
    icon: require('../assets/Mask_Group_1.png')
  },
  {
    name: 'Endurance',
    description: 'Recruit more slow-twitch fibers which contract slowly but can work for a long time without tiring'
    , icon: require('../assets/Mask_Group_2.png')
  },
  {
    name: 'Injury and Recovery',
    description: 'Some are at greater risk of injury than others due to collagen production and repair-related hormones'
    , icon: require('../assets/Mask_Group_3.png')
  },
]

const health = [
  {
    name: 'Blood Pressure',
    description: 'Understand the risk of high blood pressure by factors such as family history and genes'
    , icon: require('../assets/Mask_Group_7.png')
  },
  {
    name: 'Cholesterol',
    description: 'Understand the tendency towards high or low cholesterol levels'
    , icon: require('../assets/Mask_Group_6.png')
  },
  {
    name: 'Blood Sugar',
    description: 'Understand the risk towards developing high blood sugar levels'
    , icon: require('../assets/Mask_Group_5.png')
  }
]

const BeverageReaction = [
  {
    name: 'Lactose',
    description: 'Genetic impact on the ability to digest lactose'
    , icon: require('../assets/Mask_Group_10.png')
  }, {
    name: 'Caffeine',
    description: 'The speed of metabolizing caffeine'
    , icon: require('../assets/Mask_Group_9.png')
  }, {
    name: 'Alcohol',
    description: 'The speed of metabolizing alcohol'
    , icon: require('../assets/Mask_Group_8.png')
  }
]

const Behavior = [
  {
    name: 'Food Cravings',
    description: 'Understand how to obtain satisfaction from your meals'
    , icon: require('../assets/Mask_Group_11.png')
  },
  {
    name: 'Bitter Taste',
    description: 'Understand your sensitivity to bitter foods'
    , icon: require('../assets/Mask_Group_12.png')
  },
  {
    name: 'Sweet Tooth',
    description: 'Understand your likelihood to have a sweet tooth'
    , icon: require('../assets/Mask_Group_13.png')
  }, {
    name: 'Emotional Eating',
    description: 'Learn to differentiate physical and emotional hunger and a false feeling of “fullness”'
    , icon: require('../assets/Mask_Group_14.png')
  }, {
    name: 'Addictive Behaviors',
    description: 'Understand the genes that impact the reward-system of our brain'
    , icon: require('../assets/Mask_Group_15.png')
  },
]

const StressResponse = [
  {
    name: 'Short-term Stress',
    description: 'Understand if you are more prone to suffering from acute stress'
    , icon: require('../assets/Mask_Group_18.png')
  }, {
    name: 'Long-term Stress',
    description: 'Understand if you are more prone to suffering from chronic stress'
    , icon: require('../assets/Mask_Group_17.png')
  }, {
    name: 'Stress Hypertension',
    description: 'Hormones from a stressful situation may increase blood pressure'
    , icon: require('../assets/Mask_Group_16.png')
  }
]

const flats = [
  {
    name: 'MUFAs',
    description: 'Monounsaturated Fatty Acids – a healthy type of fat'
    , icon: require('../assets/Mask_Group_19.png')
  }, {
    name: 'PUFAs',
    description: 'Polyunsaturated Fatty Acids – essential fatty acids'
    , icon: require('../assets/Mask_Group_20.png')
  }, {
    name: 'Saturated Fats',
    description: 'A type of dietary fat – one of the unhealthy fats'
    , icon: require('../assets/Mask_Group_21.png')
  }
]

const VitaminsAndSupplements = [
  {
    name: 'Vitamin A',
    description: 'Important for growth and development, the immune system, and normal vision'
    , icon: require('../assets/Mask_Group_22.png')
  }, {
    name: 'Vitamin B6',
    description: 'Reduces symptoms of depression and promotes brain health'
    , icon: require('../assets/Mask_Group_23.png')
  }, {
    name: 'Vitamin B12',
    description: 'Assists to keep the body’s nerve and blood cells healthy'
    , icon: require('../assets/Mask_Group_24.png')
  }, {
    name: 'Vitamin D',
    description: 'Regulates calcium and phosphate levels in the body'
    , icon: require('../assets/Mask_Group_23.png')
  }, {
    name: 'Vitamin E',
    description: 'Reduces free radical damage and slows the aging process of the cells'
    , icon: require('../assets/Mask_Group_26.png')
  }, {
    name: 'Folate',
    description: 'Is needed to convert carbohydrates into energy, form red blood cells, and produce DNA and RNA.'
    , icon: require('../assets/Mask_Group_27.png')
  }, {
    name: 'Iron',
    description: 'Important for the production of red blood cells, general energy and focus, gastrointestinal processes, the immune system, and the regulation of body temperature'
    , icon: require('../assets/Mask_Group_28.png')
  }
]

const Obesity = [
  {
    name: 'Awareness and Effort Score',
    description: ''
    , icon: require('../assets/Mask_Group_29.png')
  }, {
    name: 'Resting metabolic rate',
    description: ''
    , icon: require('../assets/Mask_Group_30.png')
  }, {
    name: 'Overeating',
    description: ''
    , icon: require('../assets/Mask_Group_31.png')
  }, {
    name: 'Childhood Obesity',
    description: ''
    , icon: require('../assets/Mask_Group_32.png')
  }, {
    name: 'Satiety',
    description: ''
    , icon: require('../assets/Mask_Group_33.png')
  }, {
    name: 'Obesity risk',
    description: ''
    , icon: require('../assets/Mask_Group_34.png')
  }
]

const HealthAndWellness = [
  {
    name: 'Exercise & Activity',
    description: 'The test results support your fitness goals and help you choose the most optimal exercises and sports that fit your genetic predisposition.'
    , subCategory: ExerciseAndActivity
  },
  {
    name: 'Health',
    description: 'Hypertension, High Blood Sugar and High Cholesterol are three common risk to serious health issues.'
    , subCategory: health
  },
  {
    name: 'Beverage Reaction',
    description: 'We eat and drink items that contain these ingredients'
    , subCategory: BeverageReaction
  },

  {
    name: 'Behavior',
    description: 'Next frontier in applying genetics for life-improvement'
    , subCategory: Behavior
  },
  {
    name: 'Stress Response',
    description: 'Knowing how your genetics impact stress can allow you to plan your day, adjust your career goals, and communicate to others'
    , subCategory: StressResponse
  },
  {
    name: 'Fats',
    description: 'Understand the function of different fats, such as a source of energy, vitamin absorption, and insulation and temperature regulation'
    , subCategory: flats
  },
  {
    name: 'Vitamins & Supplements',
    description: 'This section provides information that will help you decide if you need to complement your diet with a daily vitamin supplement.'
    , subCategory: VitaminsAndSupplements
  },
  {
    name: 'Obesity',
    description: ''
    , subCategory: Obesity
  }
]



const ElasticityandFirmness = [
  {
    name: 'Wrinkling',
    description: 'Understand your genetic predisposition to wrinkles'
    , icon: require('../assets/Mask_Group_35.png')
  }, {
    name: 'Eye Laxity',
    description: 'Determine if you are susceptible to looseness of skin around the eyes',
    icon: require('../assets/Mask_Group_36.png')
  }, {
    name: 'Skin Glycation',
    description: 'The leading cause of skin aging- a process where sugar molecules attach to other molecules'
    , icon: require('../assets/Mask_Group_37.png')
  }
]

const SkinCondition = [
  {
    name: 'Hydration',
    description: 'Understand the amount of water in your skin cells'
    , icon: require('../assets/Mask_Group_38.png')
  }, {
    name: 'Oil Production',
    description: 'Determine the amount of oil in your skin cells, which keeps your skin hydrated and healthy'
    , icon: require('../assets/Mask_Group_39.png')
  }, {
    name: 'Acne',
    description: 'Understand acne-prone skin'
    , icon: require('../assets/Mask_Group_40.png')
  }
]

const EnvironmentalSensitivity = [
  {
    name: 'Skin Sensitivity',
    description: 'Learn if your skin is sensitive to stinging, burning, redness, tightness, or feeling uncomfortable'
    , icon: require('../assets/Mask_Group_41.png')
  }, {
    name: 'Sun Sensitivity',
    description: 'Understand your skin sensitivity to sunlight'
    , icon: require('../assets/Mask_Group_47.png')
  }, {
    name: 'Inflammation',
    description: 'Potential to have skin inflammation from an internal or external cause'
    , icon: require('../assets/Mask_Group_43.png')
  }, {
    name: 'Crow’s feet',
    description: 'Potential for branching wrinkles to form at the outer corner of a person’s eye'
    , icon: require('../assets/Mask_Group_44.png')
  }
]

const VitaminsandAntioxidants = [
  {
    name: 'Antioxidants',
    description: 'Protects the skin by reducing counteracting free radical production'
    , icon: require('../assets/Mask_Group_45.png')
  }, {
    name: 'Vitamin A',
    description: 'Helps keep hydration of your skin'
    , icon: require('../assets/Mask_Group_46.png')
  }, {
    name: 'Vitamin D',
    description: 'Assists in skin cell growth, repair, and metabolism as well as prevents skin aging'
    , icon: require('../assets/Mask_Group_47.png')
  }
]
const SkinHealth = [
  {
    name: 'Elasticity and Firmness',
    description: 'Wrinkling is related to the degradation of structural proteins'
    , subCategory: ElasticityandFirmness
  },
  {
    name: 'Skin Condition',
    description: 'Understand your oil production, moisture retention, and risk of acne and pimple formation'
    , subCategory: SkinCondition
  },
  {
    name: 'Environmental Sensitivity',
    description: 'Determine your reaction level when exposed to airborne toxins and other chemicals'
    , subCategory: EnvironmentalSensitivity
  }, {
    name: 'Vitamins and Antioxidants',
    description: 'Key protectors of healthy skin'
    , subCategory: VitaminsandAntioxidants
  }
]

const PGx = [
  {
    name: 'Pain Management',
    description: 'This category includes the medications that are involved in pain management or controlling the pain of the client such as anti-inflammatory agents, analgesic, anti-pyretic, opioid and antirheumatic drugs'
  }, {
    name: 'Neurology',
    description: 'This category includes the medications that are related to neurological disorders such as ADHD, epilepsy, anticonvulsant, anxiolytic, Alzheimer’s, Parkinson’s and other related drugs'
  }, {
    name: 'Anesthesiology',
    description: 'This category includes the medications that are involved in anesthetic and muscle relaxant'
  }, {
    name: 'Modulation of Cardiovascular',
    description: 'This category includes the medications that are involved in the modulation of cardiovascular functions such as the antiarrhythmic, antihypertensive, cardiac stimulant, vasodilator, dyslipidemia, anticoagulant and antiplatelet drugs'
  }, {
    name: 'Infectology',
    description: 'This category includes the medications that are used in the treatment of infectious diseases such as the antibiotics, antimalarial, anthelmintic, antifungal and antiviral drugs'
  }, {
    name: 'Urology',
    description: 'This category includes the medications that are involved in the treatments of urological disorders such as the incontinence, erectile dysfunction and prostatic hypertrophy drugs'
  }, {
    name: 'Internal Medicine',
    description: 'This category includes the medications that are classified under internal medicine such as drugs that are used in modulation of respiratory functions, antiemetic, treatment of Peptic Ulcers, gastrointestinal disorders, diabetes, migraine and hyperparathyroidism.'
  }, {
    name: 'Oncology, Hematology',
    description: 'This category includes the medications that are involved in the treatment of cancer disorders and blood diseases such as the antineoplastic drugs'
  }, {
    name: 'Endocrinology',
    description: 'This category includes the medications that are used in hormonal controls of the clients such as contraceptives, androgens, antiandrogens and thyroid drugs'
  }, {
    name: 'Psychiatry',
    description: 'This category includes the medications that are involved in psychiatric management of the client such as anti-depressants and antipsychotic drugs'
  }, {
    name: 'Organ Transplantation',
    description: 'This category includes the medications that are involved in organ transplantation such as the immunosuppressive and immunomodulation drugs'
  }, {
    name: 'Recreational Drugs',
    description: 'This category includes the medications that are involved in recreational use of drugs such as barbiturates, cannabis, dissociative drugs and tobacco'
  }
]
const DATA = [
  {
    id: 55,
    HealthAndWellness
  },
  {
    id: 54,
    SkinHealth
  },
  {
    id: 47,
    PGx
  }
]

export const ProductCategoryScreen = ({ route, navigation }) => {
  const netInfo = useNetInfo();
  const productData = route.params;


  const { index } = route.params;
  const { price } = route.params;
  const { test_name } = route.params;
  const { test_code } = route.params;
  const { token } = route.params;
  const { id } = route.params;

  const [data, setData] = React.useState({
    ...productData,
    productList: [],
    iconAnimating: true,
  });
  useEffect(() => {
    navigation.setOptions({
      headerTitle: test_name,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#D5D5D5'
      }
    });

    switch (id) {
      case 55:
        setData({ ...data, iconAnimating: false, productList: DATA[0].HealthAndWellness })
        break;
      case 54:
        setData({ ...data, iconAnimating: false, productList: DATA[1].SkinHealth })
        break;
      case 47:
        setData({ ...data, iconAnimating: false, productList: DATA[2].PGx })
        break;
      default:
        setData({ ...data, iconAnimating: false, productList: [] })

        break;
    }

  }, [])

  const { signOut } = React.useContext(AuthContext);

  const addToCart = async (data) => {
    const customer_id = await AsyncStorage.getItem('MGS_customer_id')
    if (customer_id) {
      if (!netInfo.isConnected) {
        alert('Please checked your internet connection')
        return false;
      }
      setData({ ...data, iconAnimating: true })
      data['customer_id'] = customer_id
      data['quantity'] = 1
      data['actualAmount'] = data['price']
      postHeaderService('cart/addCartData', data).then(res => {
        if (res.status == 200) {
          setData({ ...data, iconAnimating: false })
          navigation.navigate('CartScreen', { token: true })
        } else if (res.status == 201) {
          signOut()
        } else {
          alert(res.message)
          DismissLoader()
        }
      }).catch(err => {
        setData({ ...data, iconAnimating: false })
        console.log(err)
      })

    } else {
      let cartArray = await AsyncStorage.getItem('MGS_cart_array');
      let ArrayData;
      if (cartArray) {
        ArrayData = JSON.parse(cartArray);
        let isExist = ArrayData.some(o => o.id === id);
        if (isExist) {
          alert("Product Item already added cart.")
          return false;
        }
      } else {
        ArrayData = [];
      }
      data['customer_id'] = customer_id
      data['quantity'] = 1
      data['actualAmount'] = data['price']

      ArrayData[ArrayData.length] = data;
      await AsyncStorage.setItem('MGS_cart_array', JSON.stringify(ArrayData));
      navigation.navigate('CartScreen', { token: false })
    }
  }

  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.bgWhite, CommonStyles.justifyContentStart]}>

      {
        data.productList.length != 0 ?
          <View style={[CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter, CommonStyles.pt20, CommonStyles.pb20]}>
            <Text style={[CommonStyles.fontBold, CommonStyles.font24]}>HK$ {price}</Text>
          </View>
          : null
      }
      <View style={{ flex: 5 }}>
        {
          data.productList.length != 0 ?
            <ScrollView
              horizontal={true}
              decelerationRate={0}
              snapToInterval={width - 60}
              showsHorizontalScrollIndicator={false}
              snapToAlignment={"center"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}>
              {

                data.productList.map((value, index) => {
                  return (<View key={index} style={[CommonStyles.categoryCardView]}>

                    <View style={[CommonStyles.pt20]}>
                      <Text style={[CommonStyles.fontBold, CommonStyles.font22]}>{value.name}</Text>
                    </View>
                    <View>
                      {value.subCategory ? <Image source={value.subCategory[0].icon} /> : null}
                    </View>
                    <View>
                      <Text style={[CommonStyles.textCenter, CommonStyles.lineHeight15, CommonStyles.textStyleNotoSansKR14, CommonStyles.p20]}>{value.description}</Text>
                    </View>
                    <View style={{ borderTopWidth: 1, borderColor: '#DDD8D5', width: '100%', padding: 20, alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => { navigation.navigate('SubCategoryScreen', { subCategory: value.subCategory ? value.subCategory : [], title: value.name, description: value.description }) }}>
                        <Text style={[CommonStyles.fontBold, CommonStyles.greenColor]}> Learn More</Text>
                      </TouchableOpacity>

                    </View>
                  </View>);
                })
              }
            </ScrollView>
            :
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

              <View style={[CommonStyles.flexDirectionColumn]}>
                <View style={[CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter, { height: 100 }]}>
                  <Image source={require('../assets/covid2.jpg')} style={{ resizeMode: 'cover', position: 'absolute', width: '100%', height: 150 }} />
                  <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginTop: 10 }}>COVID-19 TEST</Text>
                  {/* <TouchableOpacity
                    onPress={() => {
                      
                        navigation.navigate('CovidFormScreen', { oderId: data.oderId })
                    }}
                    style={[CommonStyles.appGreenButton, { padding: 20, marginTop: 20 }, CommonStyles.justifyContentCenter, CommonStyles.mr10, { borderColor: 'transparent' }]}>

                    <Text style={[CommonStyles.fontBold, CommonStyles.textCenter, CommonStyles.colorWhite, CommonStyles.textUppercase]}>FILL THE COVID-19 REQUISITION FORM</Text>

                  </TouchableOpacity> */}
                </View>

                <View style={{ margin: 10 }}>
                  <Image source={require('../assets/covid2.jpg')} style={{ resizeMode: 'contain', marginTop: 30, position: 'absolute', height: 300, width: '100%', }} />
                  <Text style={[{ fontSize: 30, color: 'white', textAlign: 'center', marginTop: 100 }, CommonStyles.fontFamilyNunitoSansSemiBold]}>MGS is a Hong Kong SAR Government recognized laboratory for COVID 19 nucleic acid testing</Text>
                </View >

                <View style={{ marginTop: 50, }}>

                  <View style={[CommonStyles.flex1, CommonStyles.p20,]}>
                    <Text style={[{ fontSize: 30 }, CommonStyles.fontFamilyNunitoSansBold]}>MGS COVID-19 Test</Text>
                    <Text style={[{ fontSize: 16, marginTop: 20 }, CommonStyles.fontFamilyNunitoSansRegular]}>As a Hong Kong SAR Government recognized lab, Modern Genomic Services (MGS) provides the real-time Reverse Transcription Polymerase Chain Reaction (RT-PCR) testing kit, which is the global gold standard of viral diagnosis, to all inbound travelers and non-travelers.  RT-PCR is the most sensitive and the preferred methodology to detect SARS-CoV-2 from your genes. Once you have received our test kit and scheduled your sample pick up, all you need to do is collect your deep throat saliva first thing in the morning. Once our laboratory receives your sample, we will provide the test result via email within 1-business day.</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 20 }}>
                  <CheckmarkForList />
                  <Text style={{ marginLeft: 5, marginTop: 3 }}>CLIA and CAP Accredited Laboratory: Highest quality standards for testing performed on specimens from humans</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>
                  <CheckmarkForList />
                  <Text style={{ marginLeft: 5, marginTop: 3 }}>U.S FDA/CE/KCDC Approved Detection Kit</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                  <CheckmarkForList />
                  <Text style={{ marginLeft: 5, marginTop: 3 }}>Molecular Diagnostic Testing (RT-PCR): A Gold Standard of Viral Testing recommended by WHO and CDC – 99.9% Accuracy</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                  <CheckmarkForList />
                  <Text style={{ marginLeft: 5, marginTop: 3 }}>Standard of Viral Testing recommended by WHO and CDC – 99.9% Accuracy</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                  <CheckmarkForList />
                  <Text style={{ marginLeft: 5, marginTop: 3 }}>Hong Kong SAR Government recognized COVID-19 nucleic acid testing institute </Text>
                </View>

                <View style={[CommonStyles.flex1, CommonStyles.p20,]}>
                  <Text style={[{ fontSize: 30 }, CommonStyles.fontFamilyNunitoSansBold]}>Who should take a COVID-19 test?</Text>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                  <CheckmarkForList />
                  <Text style={{ marginLeft: 5, marginTop: 3 }}>Outgoing travelers who need to obtain a health certificate prior to departure</Text>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                  <CheckmarkForList />
                  <Text style={{ marginLeft: 5, marginTop: 3 }}>Healthcare facility workers who are in constant contact with infected or potentially infected patients</Text>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                  <CheckmarkForList />
                  <Text style={{ marginLeft: 5, marginTop: 3 }}>People with mild or no symptoms of COVID-19 who want to check their status for peace of mind</Text>
                </View>
              </View>

            </ScrollView>

        }
      </View>


      <View style={[CommonStyles.pb20, CommonStyles.pt20, { flex: 0.5 }, CommonStyles.justifyContentEven, CommonStyles.alignItemEnd, CommonStyles.flexDirectionRow]}>
        <TouchableOpacity style={[CommonStyles.roundBtn, CommonStyles.flex1, CommonStyles.mr10, CommonStyles.ml10]}
          onPress={() => addToCart(data)}
        >
          <Text style={[CommonStyles.fontBold, CommonStyles.textCenter, CommonStyles.textUppercase]}>Add to cart</Text>
        </TouchableOpacity>
        {
          data.productList.length != 0 ?
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ShippingAddressScreen', { orderSummary: { testId: data.test_code, test_image_path: API_URL + data.test_image_path, test_name: data.test_name, quantity: 1, price: data.price, actualAmount: data.price } })
              }}
              style={[CommonStyles.roundBtn, CommonStyles.greenBG, CommonStyles.mr10, CommonStyles.flex1, { borderColor: 'transparent' }]}>

              <Text style={[CommonStyles.fontBold, CommonStyles.textCenter, CommonStyles.colorWhite, CommonStyles.textUppercase]}>Buy now</Text>

            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ShippingAddressScreen', { orderSummary: { testId: data.test_code, test_image_path: API_URL + data.test_image_path, test_name: data.test_name, quantity: 1, price: data.price, actualAmount: data.price } })
              }}
              style={[CommonStyles.roundBtn, CommonStyles.greenBG, CommonStyles.mr10, CommonStyles.flex1, { borderColor: 'transparent' }]}>

              <Text style={[CommonStyles.fontBold, CommonStyles.textCenter, CommonStyles.colorWhite, CommonStyles.textUppercase]}>Buy now (HK$ {price})</Text>

            </TouchableOpacity>
        }
      </View>
      {data.iconAnimating ? <LoadingIcon isIconAnimating={data.iconAnimating} /> : null}

    </SafeAreaView>
  )
}

