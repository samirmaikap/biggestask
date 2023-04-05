import React, {useState} from 'react';
import {Image, Keyboard, Platform, StyleSheet, View} from 'react-native';
import useInvitationQuery from '../../hooks/useInvitationQuery';
import {useToast} from 'react-native-toast-notifications';
import useAuthQuery from '../../hooks/useAuthQuery';
import {AppBottomSheet} from '../../components/AppBottomSheet';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {Colors} from '../../theme/colors';
import AppButton from '../../components/AppButton';
import AppStyles from '../../theme/AppStyles';
import {images} from '../../utils/constants';
import {UnknownIcon} from '../../components/icons/UnknowIcon';
import {HeartIcon} from '../../components/icons/HeartIcon';
import {useAppContext} from '../../contexts/AppContext';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        marginTop: 100,
        marginBottom: 50,
        resizeMode: 'cover',
        width: '100%',
    },
    contentContainer: {},
    container: {
        flex: 1,
    },
    row: {},
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheetInput: {
        backgroundColor: Colors.grey_bg,
        paddingVertical: Platform.OS === 'ios' ? 16 : 12,
        paddingHorizontal: 8,
        borderRadius: 12,
        color: 'black',
    },
});

export const SurrogateInviteScreen = () => {
    const {state, dispatch} = useAppContext();
    const {sendInvitation} = useInvitationQuery();
    const {getMe, logout} = useAuthQuery();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const [openSheet, setOpenSheet] = useState(false);
    const [email, setEmail] = useState('');
    const isSurrogate = state.user?.user_type === 'surrogate';

    console.log('isSurrogate', isSurrogate);

    const handleInvitePress = async () => {
        if (!email) {
            toast.show('Email address is required', {placement: 'top'});
            return;
        }

        setLoading(true);

        const response = await sendInvitation({
            email: email,
            type: isSurrogate ? 'parent' : 'surrogate',
        });

        setLoading(false);

        if (response?.error) {
            toast.show(response?.message, {placement: 'top'});
            return;
        }

        await getMe();

        Keyboard.dismiss();
        setTimeout(() => {
            setOpenSheet(false);
        }, 300);
        toast.show('Invitation sent', {placement: 'top'});
    };

    const onLogoutPress = async () => {
        await logout();
    };

    const renderBottomSheet = () => {
        return (
            <AppBottomSheet
                isOpen={openSheet}
                onClose={() => setOpenSheet(false)}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <AppText variant={'h2'}>
                        {isSurrogate
                            ? 'Invite Intended Parent'
                            : 'Invite Gestational Carrier'}
                    </AppText>
                </View>
                <AppSpacing gap={16} />
                <AppText variant={'title'}>
                    {isSurrogate
                        ? "Intended Parent's Email Address"
                        : " Gestational Carrier's Email Address"}
                </AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    autoCapitalize={'none'}
                    autoComplete={'email'}
                    autoCorrect={false}
                    keyboardType={'email-address'}
                    textContentType={'emailAddress'}
                    cursorColor={Colors.primary}
                    style={[styles.sheetInput]}
                    onChangeText={e => setEmail(e)}
                />
                <AppSpacing gap={16} />
                <AppButton
                    loading={loading}
                    disabled={loading}
                    onPress={async () => {
                        await handleInvitePress();
                    }}
                    contentStyle={AppStyles.buttonContent}
                    mode={'contained'}
                    style={AppStyles.button}>
                    Send Invitation
                </AppButton>
                <AppSpacing gap={16} />
            </AppBottomSheet>
        );
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={images.ADD_SURROGATE}
            />
            <View style={styles.overlay}>
                <AppSpacing gap={70} />
                <UnknownIcon size={88} />
                <View style={{paddingVertical: 16, paddingHorizontal: 32}}>
                    <AppText textAlign={'center'} variant={'h2'}>
                        You don't have a{' '}
                        {isSurrogate
                            ? 'Intended Parent'
                            : 'Gestational Carrier'}{' '}
                        yet. Add a{' '}
                        {isSurrogate
                            ? 'Intended Parent'
                            : 'Gestational Carrier'}{' '}
                        to your profile
                    </AppText>
                </View>
                <View style={{flex: 1}} />
                <View style={styles.row}>
                    <AppButton
                        onPress={() => setOpenSheet(true)}
                        mode={'contained'}
                        icon={() => <HeartIcon color={'white'} />}>
                        Add{' '}
                        {isSurrogate
                            ? 'Intended Parent'
                            : 'Gestational Carrier'}{' '}
                    </AppButton>
                </View>
                <AppSpacing gap={16} />
                <AppButton onPress={() => onLogoutPress()}>Logout</AppButton>
                <AppSpacing gap={32} />
            </View>
            {renderBottomSheet()}
        </View>
    );
};
