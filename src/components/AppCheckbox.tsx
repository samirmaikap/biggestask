import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {AppText} from './AppText';

type Props = {
    label: any;
    status: any;
    onPress: any;
};

function AppCheckBox(props: Props) {
    const {label, status, onPress} = props;

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(!status)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                    style={{width: 22, height: 22, padding: 0, margin: 0}}
                    boxType={'square'}
                    tintColor={'black'}
                    onCheckColor={'white'}
                    onFillColor={'black'}
                    onTintColor={'black'}
                    value={status}
                    onValueChange={(v: any) => onPress(v)}
                />
                <View style={{marginLeft: 8}}>
                    <AppText>{label}</AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default AppCheckBox;
