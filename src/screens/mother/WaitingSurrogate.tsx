import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {Button} from 'react-native-paper';
import {HeartIcon} from '../../components/icons/HeartIcon';
import {images} from '../../utils/constants';
import {UnknownIcon} from '../../components/icons/UnknowIcon';
import {AppSpacing} from '../../components/AppSpacing';
import AppButton from '../../components/AppButton';
import {Colors} from '../../theme/colors';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        marginTop: 30,
        marginBottom: 100,
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
});

export const WaitingSurrogate = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={images.WAITING_SURROGATE}
            />
            <View style={styles.overlay}>
                <AppSpacing gap={16} />
                <UnknownIcon size={88} />
                <AppSpacing gap={32} />
                <View style={{paddingVertical: 16, paddingHorizontal: 32}}>
                    <AppText
                        textAlign={'center'}
                        color={Colors.primary}
                        variant={'h2'}>
                        {
                            'Hang Tight. We are waiting for your gestational carrier to accept the invitation'
                        }
                    </AppText>
                </View>
                <View style={{flex: 1}} />
                <View style={styles.row}>
                    <AppButton
                        disabled={true}
                        mode={'contained'}
                        icon={() => <HeartIcon color={Colors.grey_3} />}>
                        Add Gestational Carrier
                    </AppButton>
                </View>
                <AppSpacing gap={32} />
            </View>
        </View>
    );
};
