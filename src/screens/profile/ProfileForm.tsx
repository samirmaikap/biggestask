import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../theme/colors';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {AppText} from '../../components/AppText';
import {PhoneIcon} from '../../components/icons/PhoneIcon';
import {EmailIcon} from '../../components/icons/EmailIcon';
import {LocationPin} from '../../components/icons/LocationPin';
import {CalendarIcon} from '../../components/icons/CalendarIcon';
import {UserIcon} from '../../components/icons/UserIcon';
import AppStyles from '../../theme/AppStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import {AppSpacing} from '../../components/AppSpacing';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputGroup: {
        marginVertical: 8,
    },
    input: {},
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export const ProfileForm = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Male', value: '1'},
        {label: 'Female', value: '2'},
    ]);
    const [gender, setGender] = useState('male');

    return (
        <View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Full name</AppText>
                <TextInput
                    mode={'outlined'}
                    right={
                        <TextInput.Icon
                            icon={() => <UserIcon color={Colors.grey_3} />}
                        />
                    }
                    outlineStyle={{borderColor: Colors.grey_bg}}
                    style={[styles.input, {backgroundColor: Colors.grey_bg}]}
                    theme={{roundness: 12}}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Gender</AppText>
                <AppSpacing gap={8} />
                <View style={styles.row}>
                    <View style={styles.row}>
                        <RadioButton.Android
                            value="male"
                            status={gender === 'male' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('male')}
                        />
                        <AppText>Male</AppText>
                    </View>
                    <AppSpacing gap={16} isHorizontal={true} />
                    <View style={styles.row}>
                        <RadioButton.Android
                            value="female"
                            status={
                                gender === 'female' ? 'checked' : 'unchecked'
                            }
                            onPress={() => setGender('female')}
                        />
                        <AppText>Female</AppText>
                    </View>
                </View>
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Phone number</AppText>
                <TextInput
                    mode={'outlined'}
                    right={
                        <TextInput.Icon
                            icon={() => <PhoneIcon color={Colors.grey_3} />}
                        />
                    }
                    outlineStyle={{borderColor: Colors.grey_bg}}
                    style={[styles.input, {backgroundColor: Colors.grey_bg}]}
                    theme={{roundness: 12}}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Email</AppText>
                <TextInput
                    mode={'outlined'}
                    right={
                        <TextInput.Icon
                            icon={() => <EmailIcon color={Colors.grey_3} />}
                        />
                    }
                    outlineStyle={{borderColor: Colors.grey_bg}}
                    style={[styles.input, {backgroundColor: Colors.grey_bg}]}
                    theme={{roundness: 12}}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Home Address</AppText>
                <TextInput
                    mode={'outlined'}
                    right={
                        <TextInput.Icon
                            icon={() => <LocationPin color={Colors.grey_3} />}
                        />
                    }
                    outlineStyle={{borderColor: Colors.grey_bg}}
                    style={[styles.input, {backgroundColor: Colors.grey_bg}]}
                    theme={{roundness: 12}}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Your date of birth</AppText>
                <TextInput
                    mode={'outlined'}
                    right={
                        <TextInput.Icon
                            icon={() => <CalendarIcon color={Colors.grey_3} />}
                        />
                    }
                    outlineStyle={{borderColor: Colors.grey_bg}}
                    style={[styles.input, {backgroundColor: Colors.grey_bg}]}
                    theme={{roundness: 12}}
                />
            </View>
            <View style={styles.inputGroup}>
                <Button
                    contentStyle={AppStyles.buttonContent}
                    style={AppStyles.button}
                    mode={'contained'}>
                    Save Editing
                </Button>
            </View>
        </View>
    );
};
