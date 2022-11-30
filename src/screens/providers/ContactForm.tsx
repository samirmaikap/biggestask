import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {Colors} from '../../theme/colors';
import {Button} from 'react-native-paper';
import AppStyles from '../../theme/AppStyles';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {AppSpacing} from '../../components/AppSpacing';
import DropDownPicker from 'react-native-dropdown-picker';
import {PlusIcon} from '../../components/icons/PlusIcon';
import AppButton from '../../components/AppButton';

const styles = StyleSheet.create({
    inputGroup: {
        marginVertical: 8,
        zIndex: 0,
    },
    input: {
        backgroundColor: Colors.grey_bg,
        paddingVertical: Platform.OS === 'ios' ? 16 : 12,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
});

export const ContactForm = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Fertility Doctor', value: '1'},
        {label: 'Agency Case Manager', value: '2'},
        {label: 'Surrogacy Lawyer', value: '3'},
        {label: 'ObGyn', value: '4'},
    ]);

    return (
        <View style={{backgroundColor: 'white'}}>
            <View style={[styles.inputGroup, {zIndex: 999}]}>
                <AppText variant={'title'}>Title</AppText>
                <AppSpacing />
                <DropDownPicker
                    open={open}
                    value={value}
                    zIndex={3000}
                    zIndexInverse={1000}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select Title"
                    style={AppStyles.dropdownInput}
                    containerStyle={{height: 40, marginBottom: 10}}
                    dropDownContainerStyle={AppStyles.dropdownContainerStyle}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Contact Rep Name</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Contact Email</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    cursorColor={Colors.primary}
                    textContentType={'emailAddress'}
                    style={[styles.input]}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Contact phone number</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                />
            </View>
            <AppSpacing gap={16} />
            <AppButton
                contentStyle={AppStyles.buttonContent}
                mode={'contained'}
                icon={() => <PlusIcon color={'white'} />}
                style={AppStyles.button}>
                Add New Contact
            </AppButton>
            <AppSpacing gap={16} />
        </View>
    );
};
