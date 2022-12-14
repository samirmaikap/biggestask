import React, {useState} from 'react';
import {
    Image,
    ImageBackground,
    Keyboard,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import {AppText} from '../../components/AppText';
import {Button} from 'react-native-paper';
import {HeartIcon} from '../../components/icons/HeartIcon';
import {images} from '../../utils/constants';
import {UnknownIcon} from '../../components/icons/UnknowIcon';
import {AppSpacing} from '../../components/AppSpacing';
import AppButton from '../../components/AppButton';
import {AppBottomSheet} from '../../components/AppBottomSheet';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {Colors} from '../../theme/colors';
import AppStyles from '../../theme/AppStyles';

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
    },
});

type Props = {
    onPressAdd: Function;
};

export const AddSurrogate = (props: Props) => {
    const {onPressAdd} = props;

    const [openSheet, setOpenSheet] = useState(false);

    const renderBottomSheet = () => {
        return (
            <AppBottomSheet
                isOpen={openSheet}
                onClose={() => setOpenSheet(false)}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <AppText variant={'h2'}>
                        Invite Gestational Carrier{' '}
                    </AppText>
                </View>
                <AppSpacing gap={16} />
                <AppText variant={'title'}>
                    Gestational Carrier's Phone Number
                </AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    keyboardType={'phone-pad'}
                    textContentType={'telephoneNumber'}
                    cursorColor={Colors.primary}
                    style={[styles.sheetInput]}
                />
                <AppSpacing gap={16} />
                <AppButton
                    onPress={() => {
                        onPressAdd();
                        Keyboard.dismiss();
                        setOpenSheet(false);
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
                <AppSpacing gap={16} />
                <UnknownIcon size={88} />
                <View style={{paddingVertical: 16, paddingHorizontal: 32}}>
                    <AppText textAlign={'center'} variant={'h2'}>
                        You don't have a Gestational Carrier yet. Add a
                        Gestational Carrier to your profile
                    </AppText>
                </View>
                <View style={{flex: 1}} />
                <View style={styles.row}>
                    <AppButton
                        onPress={() => setOpenSheet(true)}
                        mode={'contained'}
                        icon={() => <HeartIcon color={'white'} />}>
                        Add Gestational Carrier
                    </AppButton>
                </View>
                <AppSpacing gap={32} />
            </View>
            {renderBottomSheet()}
        </View>
    );
};
