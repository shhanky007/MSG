import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import CommonStyles from '../common/CommonStyles'


export const SubCategoryScreen = ({ route, navigation }) => {
  const { description } = route.params;
  const { subCategory } = route.params;
  const { title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#D5D5D5'
      }
    });
  }, [])
  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.justifyContentStart]}>
      <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[CommonStyles.p20, CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
          <View style={[CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter, CommonStyles.pb20]}>
            <Text style={[CommonStyles.textCenter, CommonStyles.textStyleNotoSansKR14, CommonStyles.lineHeight15]}>{description}</Text>
          </View>
          <View>
            {
              subCategory.map((x, i) => {

                return (
                  <View style={[CommonStyles.subCategoryCardView,]} key={i}>
                    <View style={[CommonStyles.pb20]}>
                      <Image source={x.icon} />
                    </View>
                    <View style={[CommonStyles.pb20]}>
                      <Text style={[CommonStyles.fontBold, CommonStyles.font22, CommonStyles.textStyleNotoSansKRMedium14, CommonStyles.textCapitalize, CommonStyles.textCenter]}>{x.name}</Text>
                    </View>
                    <View>
                      <Text style={[CommonStyles.textCenter, CommonStyles.textStyleLightBlackNotoSansKR14, CommonStyles.lineHeight15]}>{x.description}</Text>
                    </View>

                  </View>
                )
              })
            }

          </View>
       
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
