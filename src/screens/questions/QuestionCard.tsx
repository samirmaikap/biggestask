import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {Colors, primaryColor} from '../../theme/colors';
import {AppCard} from '../../components/AppCard';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

type Props = {
    title: string;
    user: any;
    answer: string;
    time: string;
};

export const QuestionCard = (props: Props) => {
    const {title, user, answer, time} = props;
    return (
        <AppCard padding={16}>
            <AppText fontWeight={'700'}>{title}</AppText>
            <AppSpacing gap={8} />
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <AppText color={primaryColor}>{user}</AppText>
                <AppText size={12} variant={'custom'} color={Colors.grey_3}>
                    {time}
                </AppText>
            </View>
            <AppSpacing gap={8} />
            <AppText>{answer}</AppText>
        </AppCard>
    );
};
