import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CommonStyles from '../common/CommonStyles'


export const CommonInputBox = (props) => {
    let { icon, placeholederName, textValue, onvalueChange, textStyle, secureTextEntry,edit,keyboardType,maxLength} = props
    return (<View style={[CommonStyles.mt20,CommonStyles.ml10, CommonStyles.mr10]}>
        {<Text style={[CommonStyles.textStyle13, { opacity: textValue.length != 0 ? 1 : 0 }]}>{placeholederName}</Text>}
        <View style={[CommonStyles.flexDirectionRow]
        }>
            <TextInput
            editable={edit}
                secureTextEntry={secureTextEntry}
                placeholder={placeholederName}
                placeholderTextColor="#2B2B2B"
                style={[CommonStyles.flex10, textStyle, { paddingBottom: 5, borderBottomWidth: 0.5 }, CommonStyles.p0]}
                value={textValue}
                onChangeText={onvalueChange}
                keyboardType={keyboardType}
                maxLength={maxLength}
            />
            <View style={{ borderBottomWidth: 0.5, paddingBottom: 10 }}>
                {icon}
            </View>
        </View>
    </View>
    )
}