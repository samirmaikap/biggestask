import React from 'react';
import {AppCard} from '../../components/AppCard';
import {Divider, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {images} from '../../utils/constants';
import {AppCompactButton} from '../../components/AppCompactButton';
import {Colors} from '../../theme/colors';
import {AppImage} from '../../components/AppImage';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: 56,
        height: 56,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    textItem: {
        paddingVertical: 6,
    },
});

type Props = {
    // onEditPress: Function
};

export const CommunityCard = (props: Props) => {
    // const {onEditPress} = props;
    const theme = useTheme();
    return (
        <AppCard>
            <View style={[styles.row, {alignItems: 'flex-start', padding: 16}]}>
                <View style={styles.imageContainer}>
                    <AppImage
                        size={56}
                        isLocal={true}
                        uri={images.AVOCADO}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={{flex: 1, marginLeft: 16}}>
                    <AppText fontWeight={'600'}>Biggest Ask</AppText>
                    <AppSpacing gap={8} />
                    <AppText color={Colors.grey_3}>
                        Your Surrogacy Community
                    </AppText>
                </View>
            </View>
            <Divider style={{backgroundColor: Colors.grey_bg, height: 1}} />
            <View style={[styles.row, {alignItems: 'center', padding: 16}]}>
                <View style={{flex: 1, marginRight: 8}}>
                    <AppCompactButton
                        color={Colors.grey_bg}
                        textColor={Colors.grey_3}
                        onPress={() => {}}
                        name={'Instagram'}
                        outlined={true}
                    />
                </View>
                <View style={{flex: 1, marginLeft: 8}}>
                    <AppCompactButton onPress={() => {}} name={'To Forum'} />
                </View>
            </View>
        </AppCard>
    );
};
