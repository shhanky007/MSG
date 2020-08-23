
import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, Image } from 'react-native';
import CommonStyles from '../common/CommonStyles';

export function AboutUsScreen({ navigation }) {

  return (
    <SafeAreaView style={[CommonStyles.flex1, CommonStyles.bgWhite, CommonStyles.justifyContentStart]}>
      <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }}>

        <View style={[CommonStyles.flexDirectionColumn]}>
          <View style={[CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter, { height: 100 }]}>
            <Image source={require('../assets/about_us_1.png')} style={{ resizeMode: 'cover', position: 'absolute', width: '100%', height: 150 }} />
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>Our Mission</Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image source={require('../assets/about_us_3.png')} style={{ resizeMode: 'contain', marginTop: 30, height: 300, width: '100%', }} />
            <Text style={[{ fontSize: 30 }, CommonStyles.fontFamilyNunitoSansBold]}>About MGS</Text>
            <Text style={[{ fontSize: 18, color: 'blue' }, CommonStyles.fontFamilyNunitoSansSemiBold]}>To supply you with your unique genetic data, empowering and inspiring you to make smarter lifestyle choices</Text>
            <Text style={[{ fontSize: 14, marginTop: 10 }, CommonStyles.fontFamilyNunitoSansRegular]}>Modern Genomic Services (MGS) is a privately-owned DNA testing services company that empowers individuals to make smarter lifestyle choices based on their unique genes. MGS simplifies and summarizes complicated genetic data into an easy-to-read and actionable report that can be used to tailor medication, nutrition, and diet choices most efficiently.</Text>
          </View >
          <View style={{ margin: 10 }}>
            <Image source={require('../assets/about_us_2.png')} style={{ resizeMode: 'contain', marginTop: 30, height: 300, width: '100%', }} />
            <Text style={[{ fontSize: 18, color: 'blue' }, CommonStyles.fontFamilyNunitoSansSemiBold]}>MGS adheres to strict confidentiality and privacy laws that ensure all our clients' genetic information is kept private.</Text>
            <Text style={[{ fontSize: 14, marginTop: 10 }, CommonStyles.fontFamilyNunitoSansRegular]}>Utilizing our global reach, state-of-the-art laboratory, and expertise, MGS integrates genomic testing into personal health management for corporate sectors including insurance companies, clinics, fitness center, medical institutes, financial corporations, and more.</Text>
            <Text style={[{ fontSize: 16, marginTop: 10 }, CommonStyles.fontFamilyNunitoSansRegular]}>MGS is the leading expert in integrating Pharmacogenomics and Health & Wellness testing into physicians’ practices to provide a clearer path towards healthier living using both predictive and preventive insights.</Text>
            <Text style={[{ fontSize: 16, marginTop: 10 }, CommonStyles.fontFamilyNunitoSansRegular]}>MGS does not sell any of our client’s data. MGS adheres to strict confidentiality and privacy laws that ensure all our clients' genetic information is kept private. No exceptions.</Text>
          </View >

          <View style={{ height: 410, marginTop: 50, backgroundColor: '#cccccc9e' }}>

            <View style={[CommonStyles.flex1, CommonStyles.bgWhite, CommonStyles.p20, CommonStyles.mlrt20, { marginBottom: 16, elevation: 20 }]}>
              <Text style={[{ fontSize: 30 }, CommonStyles.fontFamilyNunitoSansBold]}>Why choose MGS</Text>
              <Text style={[{ fontSize: 18, color: 'gray', marginTop: 10 }, CommonStyles.fontFamilyNunitoSansBold]}>Our process is simple with no hidden agendas or conditions.</Text>
              <Text style={[{ fontSize: 16, marginTop: 20 }, CommonStyles.fontFamilyNunitoSansRegular]}>MGS operates with the fundamental business ethic of complete transparency. This means the full, accurate, and timely disclosure of information. We approach the genomics industry from a position of personal empowerment and privacy. We do not claim ownership of the sample collected nor the analysis we run on it including the resulting information.</Text>
            </View>
          </View>
          <View style={[CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter, CommonStyles.mt20]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, CommonStyles.alignSelfCenter, CommonStyles.fontFamilyNunitoSansBold]}>Choose the right DNA partner</Text>
            <Text style={[{ fontSize: 18, color: 'gray', margin: 20, textAlign: 'center' }, CommonStyles.fontFamilyNunitoSansBold]}>Get empowered by your unique genes to make healthier lifestyle choices.</Text>
            <View style={[CommonStyles.flexDirectionRow]}>
              <View style={[CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
                <Image source={require('../assets/about_us_4.png')} />
                <Text>Comprehensive Test</Text>
              </View>
              <View style={[CommonStyles.justifyContentCenter, CommonStyles.ml20, CommonStyles.mr20, CommonStyles.alignItemCenter]}>
                <Image source={require('../assets/about_us_5.png')} />
                <Text>99.9% Accuracy</Text>
              </View>
              <View style={[CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
                <Image source={require('../assets/about_us_6.png')} />
                <Text>Private & Secure</Text>
              </View>
            </View>
            <View style={[CommonStyles.flexDirectionRow, CommonStyles.mb35,CommonStyles.mt10]}>
              <View style={[CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter,CommonStyles.mr10,CommonStyles.mt10]}>
                <Image source={require('../assets/about_us_7.png')} />
                <Text style={{ flexWrap: 'wrap', textAlign: 'center' }}>Over 60 Unique Genetic {"\n"}Variations</Text>
              </View>
              <View style={[CommonStyles.justifyContentCenter, , CommonStyles.ml10, CommonStyles.mr20, CommonStyles.alignItemCenter]}>
                <Image source={require('../assets/about_us_8.png')} />
                <Text>Actionable Report</Text>
              </View>
              <View style={[CommonStyles.justifyContentCenter, CommonStyles.alignItemCenter]}>
                <Image source={require('../assets/about_us_9.png')} />
                <Text>1:1 Consultation</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}