import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {StyleSheet, View} from 'react-native';
import {CalendarIcon} from '../../components/icons/CalendarIcon';
import {Colors} from '../../theme/colors';
import {LocationPin} from '../../components/icons/LocationPin';
import {AppCard} from '../../components/AppCard';
import React from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    innerContainer: {
        flex: 1,
        // padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    milestonesContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flex: 1,
        padding: 16,
    },
    cardWrapper: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'white',
        marginVertical: 8,
    },
});

type Props = {
    item: any;
    isSelected: boolean;
    onRemoveSelection: Function;
};

export const MilestoneCard = (props: Props) => {
    const {item, isSelected, onRemoveSelection} = props;
    return (
        <View
            style={[
                styles.cardWrapper,
                isSelected
                    ? {borderColor: Colors.primary}
                    : {borderColor: 'white'},
            ]}>
            <AppCard padding={16}>
                <AppText variant={'h4'}>{item?.name}</AppText>
                <AppSpacing gap={24} />
                <View
                    style={[
                        styles.row,
                        {
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        },
                    ]}>
                    <View style={[styles.row, {flex: 1}]}>
                        <CalendarIcon color={Colors.grey_3} />
                        <AppSpacing isHorizontal={true} />
                        {item?.date && item?.location ? (
                            <AppText color={Colors.grey_3}>
                                {item?.date}
                            </AppText>
                        ) : (
                            <AppText>Not Yet Scheduled</AppText>
                        )}
                    </View>
                    <View style={[styles.centeredContainer, {marginLeft: 16}]}>
                        <LocationPin color={Colors.grey_3} />
                    </View>
                </View>
            </AppCard>
        </View>
    );
};
