import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CommonStyles from '../common/CommonStyles'
import Calendar from '../assets/icons/calendar'
import DateTimePicker from '@react-native-community/datetimepicker';
import { getFormatedDate, getDateFormateForAPI } from '../common/Services';


export const CommonDatePicker = (props) => {
    let { getDate, PassDate } = props;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showDate, setShowDate] = useState('');


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setShowDate(selectedDate);
        getDate(getDateFormateForAPI(selectedDate));
    };

    useEffect(() => {
        console.log('PassDate1 ',PassDate);

        setShowDate(PassDate?PassDate:'');
        console.log('PassDate2 ',getFormatedDate(showDate));
    }, [PassDate])
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={[CommonStyles.mt20, CommonStyles.ml10, CommonStyles.mr10]}>
            <Text style={[CommonStyles.textStyle13, { opacity: showDate.length != 0 ? 1 : 0 }]}>Date of Birth</Text>
            <TouchableOpacity onPress={() => { showDatepicker() }}>

                <View style={[CommonStyles.flexDirectionRow]
                }>
                    <TextInput
                        placeholder="Date of Birth"
                        placeholderTextColor="#2B2B2B"
                        style={[CommonStyles.flex10, CommonStyles.textStyle16, { paddingBottom: 5, borderBottomWidth: 0.5 }, CommonStyles.p0]}
                        value={showDate.length != 0 ? getFormatedDate(showDate) : ''}
                        editable={false}

                    />
                    <View style={{ borderBottomWidth: 0.5, paddingBottom: 10 }}>
                        <Calendar />
                    </View>
                </View>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>



    );
}

