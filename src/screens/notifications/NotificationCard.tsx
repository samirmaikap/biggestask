import React from 'react';
import {AppCard} from '../../components/AppCard';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {Colors} from '../../theme/colors';
import {TransparentIcon} from '../../components/TransparentIcon';
import {DocumentIcon} from '../../components/icons/DocumentIcon';
import {AppSpacing} from '../../components/AppSpacing';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const NotificationCard = () => {
    return (
        <AppCard padding={16}>
            <View style={[styles.row, {alignItems: 'flex-start'}]}>
                <View>
                    <TransparentIcon color={'#FDD200'}>
                        <DocumentIcon color={'#FDD200'} />
                    </TransparentIcon>
                </View>
                <AppSpacing gap={16} isHorizontal={true} />
                <View style={{flex: 1}}>
                    <View
                        style={[
                            styles.row,
                            {justifyContent: 'space-between', marginTop: -5},
                        ]}>
                        <View style={{flex: 1}}>
                            <AppText maxLines={1}>
                                This a notification long text to display
                            </AppText>
                        </View>
                        <AppText variant={'caption'} color={Colors.grey_3}>
                            1 Day ago
                        </AppText>
                    </View>
                    <AppSpacing gap={8} />
                    <AppText color={Colors.grey_2}>
                        Your order has been shipped into your address
                    </AppText>
                </View>
            </View>
        </AppCard>
    );
};
