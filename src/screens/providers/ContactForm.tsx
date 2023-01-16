import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {Colors} from '../../theme/colors';
import AppStyles from '../../theme/AppStyles';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {AppSpacing} from '../../components/AppSpacing';
import DropDownPicker from 'react-native-dropdown-picker';
import {PlusIcon} from '../../components/icons/PlusIcon';
import AppButton from '../../components/AppButton';
import {useAppContext} from '../../contexts/AppContext';
import {useToast} from 'react-native-toast-notifications';
import useContactQuery from '../../hooks/useContactQuery';
import {toSlug} from '../../utils/utils';

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
        color: 'black',
    },
});

type Props = {
    onSaved: Function;
    contact?: any;
};

export const ContactForm = (props: Props) => {
    const {onSaved, contact} = props;
    const {state} = useAppContext();
    const toast = useToast();
    const [open, setOpen] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [titles, setTitles] = useState([
        {label: 'Fertility Doctor', value: 'Fertility Doctor'},
        {label: 'Agency Case Manager', value: 'Agency Case Manager'},
        {label: 'Surrogacy Lawyer', value: 'Surrogacy Lawyer'},
        {label: 'ObGyn', value: 'ObGyn'},
        {label: 'The Biggest Ask', value: 'The Biggest Ask'},
    ]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const {createContact, updateContact} = useContactQuery();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedTitle) {
            console.log(toSlug(selectedTitle));
        }
    }, [selectedTitle]);

    useEffect(() => {
        if (contact && contact?.id) {
            setName(contact?.name);
            setEmail(contact?.email);
            setPhone(contact?.phone);
            setSelectedTitle(contact?.title);
        } else {
            resetForm();
        }
    }, [contact]);

    const handleContactSave = async () => {
        if (!name) {
            toast.show('Name is required');
            return;
        }

        if (!selectedTitle) {
            toast.show('Please select a title');
            return;
        }

        if (phone && phone.length !== 10) {
            toast.show('Phone number must be 10 digit');
            return;
        }

        const payload = {
            name,
            email,
            title: selectedTitle,
            phone,
        };
        setLoading(true);
        const response = contact?.id
            ? await updateContact(payload, contact?.id)
            : await createContact(payload);

        setLoading(false);
        if (response?.error) {
            toast.show(response?.message);
            return;
        }

        toast.show(`Contact ${contact?.id ? 'Updated' : 'Created'}`);
        resetForm();
        onSaved();
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setSelectedTitle(null);
    };

    return (
        <View style={{backgroundColor: 'white'}}>
            <View style={[styles.inputGroup, {zIndex: 999}]}>
                <AppText variant={'title'}>Title</AppText>
                <AppSpacing />
                <DropDownPicker
                    open={open}
                    value={selectedTitle}
                    zIndex={3000}
                    zIndexInverse={1000}
                    items={titles}
                    setOpen={setOpen}
                    setValue={setSelectedTitle}
                    setItems={setTitles}
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
                    value={name}
                    onChangeText={e => setName(e)}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Contact Email</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    cursorColor={Colors.primary}
                    textContentType={'emailAddress'}
                    style={[styles.input]}
                    value={email}
                    onChangeText={e => setEmail(e)}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Contact phone number</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                    value={phone}
                    onChangeText={e => setPhone(e)}
                />
            </View>
            <AppSpacing gap={16} />
            <AppButton
                onPress={handleContactSave}
                loading={loading}
                disabled={loading}
                contentStyle={AppStyles.buttonContent}
                mode={'contained'}
                icon={() => <PlusIcon color={'white'} />}
                style={AppStyles.button}>
                {contact?.id ? 'Update Contact' : 'Add New Contact'}
            </AppButton>
            <AppSpacing gap={16} />
        </View>
    );
};
