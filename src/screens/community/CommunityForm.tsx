import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {Colors} from '../../theme/colors';
import {Button} from 'react-native-paper';
import AppStyles from '../../theme/AppStyles';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {AppSpacing} from '../../components/AppSpacing';
import {PlusIcon} from '../../components/icons/PlusIcon';
import {AppImage} from '../../components/AppImage';
import {images} from '../../utils/constants';
import AppButton from '../../components/AppButton';

const styles = StyleSheet.create({
    inputGroup: {
        marginVertical: 8,
        zIndex: -1,
    },
    input: {
        backgroundColor: Colors.grey_bg,
        paddingVertical: Platform.OS === 'ios' ? 16 : 12,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    row: {
        flexDirection: 'row',
    },
});

export const CommunityForm = () => {
    return (
        <View style={{backgroundColor: 'white'}}>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Title</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Description</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    textContentType={'emailAddress'}
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Link to Forum</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                />
            </View>
            <View style={styles.inputGroup}>
                <AppText variant={'title'}>Link to Instagram</AppText>
                <AppSpacing />
                <BottomSheetTextInput
                    cursorColor={Colors.primary}
                    style={[styles.input]}
                />
            </View>
            <View style={styles.inputGroup}>
                <View
                    style={[
                        styles.row,
                        {justifyContent: 'center', alignItems: 'center'},
                    ]}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <AppImage
                            uri={images.LOGO_PLACEHOLDER}
                            isLocal={true}
                            size={100}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <AppSpacing gap={16} />
            <AppButton
                contentStyle={AppStyles.buttonContent}
                mode={'contained'}
                icon={() => <PlusIcon color={'white'} />}
                style={AppStyles.button}>
                Add New Community
            </AppButton>
            <AppSpacing gap={16} />
        </View>
    );
};
