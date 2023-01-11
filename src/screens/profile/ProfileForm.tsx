import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
import AppButton from '../../components/AppButton';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import {useAppContext} from '../../contexts/AppContext';
import useAuthQuery from '../../hooks/useAuthQuery';
import {useToast} from 'react-native-toast-notifications';

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

type Props = {
    onSaved: Function;
};

export const ProfileForm = (props: Props) => {
    const {onSaved} = props;
    const {state} = useAppContext();
    const {updateMe} = useAuthQuery();
    const toast = useToast();
    const [gender, setGender] = useState(
        state.user?.gender ? state.user?.gender : 'male',
    );
    const [openDatepicker, setOpenDatepicker] = useState(false);
    var startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 25);
    const [date, setDate] = useState(
        state.user?.dob ? new Date(state.user?.dob) : null,
    );
    const [name, setName] = useState(state.user?.name);
    const [address, setAddress] = useState(state.user?.address);
    const [phone, setPhone] = useState(state.user?.phone);
    const [loading, setLoading] = useState(false);

    const handleProfileUpdate = async () => {
        const payload = {
            name: name,
            address: address,
            phone: phone,
            dob: date ? format(new Date(date), 'yyyy-MM-dd') : '',
            gender: gender,
        };

        setLoading(true);
        const response = await updateMe(payload);
        setLoading(false);
        if (response?.error) {
            toast.show(response?.message);
            return;
        }

        toast.show('Profile Updated');
        onSaved();
    };

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
                    value={name}
                    onChangeText={e => setName(e)}
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
                    value={phone}
                    onChangeText={e => setPhone(e)}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Email</AppText>
                <TextInput
                    disabled
                    value={state.user?.email}
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
                    value={address}
                    onChangeText={e => setAddress(e)}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Your date of birth</AppText>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setOpenDatepicker(true)}>
                    <View
                        style={[
                            AppStyles.textInput,
                            {
                                paddingVertical: 16,
                                height: 50,
                                paddingHorizontal: 8,
                            },
                        ]}>
                        <AppText>
                            {date ? format(new Date(date), 'yyyy-MM-dd') : null}
                        </AppText>
                    </View>
                </TouchableOpacity>
                {/*<TextInput*/}
                {/*    mode={'outlined'}*/}
                {/*    right={*/}
                {/*        <TextInput.Icon*/}
                {/*            icon={() => <CalendarIcon color={Colors.grey_3} />}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    outlineStyle={{borderColor: Colors.grey_bg}}*/}
                {/*    style={[styles.input, {backgroundColor: Colors.grey_bg}]}*/}
                {/*    theme={{roundness: 12}}*/}
                {/*/>*/}
            </View>
            <View style={styles.inputGroup}>
                <AppButton
                    disabled={loading}
                    loading={loading}
                    onPress={handleProfileUpdate}
                    contentStyle={AppStyles.buttonContent}
                    style={AppStyles.button}
                    mode={'contained'}>
                    Save Editing
                </AppButton>
            </View>
            <DatePicker
                modal
                mode="date"
                open={openDatepicker}
                date={date ? new Date(date) : new Date(startDate)}
                onConfirm={(d: any) => {
                    setOpenDatepicker(false);
                    setDate(d);
                }}
                onCancel={() => {
                    setOpenDatepicker(false);
                }}
            />
        </View>
    );
};
