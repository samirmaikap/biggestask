import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import TabHeader from '../../components/TabHeader';
import {AppText} from '../../components/AppText';
import {Button} from 'react-native-paper';
import {TransparentIcon} from '../../components/TransparentIcon';
import {PlusIcon} from '../../components/icons/PlusIcon';
import AppStyles from '../../theme/AppStyles';
import {AppSpacing} from '../../components/AppSpacing';
import {AppCard} from '../../components/AppCard';
import {CalendarIcon} from '../../components/icons/CalendarIcon';
import {LocationPin} from '../../components/icons/LocationPin';
import {SheetLine} from '../../components/SheetLine';
import {Colors} from '../../theme/colors';
import Screens from '../../navigations/Screens';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});

const milestones = [
    {
        name: 'Medical Clearance Exam',
        date: 'Jul 8, 2022 at 3:00pm',
        location: "Fisherman's Bay, SF",
    },
    {
        name: 'Embryo Transfer Day',
        date: 'Jul 8, 2022 at 3:00pm',
        location: "Fisherman's Bay, SF",
    },
    {
        name: 'Beta Test #1',
        date: 'Jul 8, 2022 at 3:00pm',
        location: "Fisherman's Bay, SF",
    },
    {
        name: 'Beta Test #2',
        date: 'Jul 8, 2022 at 3:00pm',
        location: "Fisherman's Bay, SF",
    },
    {
        name: 'Heartbeat Confirmation',
        date: '',
        location: '',
    },
    {
        name: 'Medical Clearance Exam',
        date: '',
        location: '',
    },
    {
        name: 'Anatomy Scan',
        date: '',
        location: '',
    },
    {
        name: 'Medical Clearance Exam',
        date: '',
        location: '',
    },
];

export const MilestonesScreen = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    return (
        <View style={styles.container}>
            <StatusBar />
            <TabHeader title={'Milestones'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    <View style={[styles.centeredContainer, {padding: 16}]}>
                        <AppText textAlign={'center'}>
                            Check back as your gestational carrier updated her
                            appointments along with the surrogacy journey
                        </AppText>
                        <AppSpacing gap={16} />
                        <View style={[styles.row, styles.centeredContainer]}>
                            <Button
                                onPress={() =>
                                    navigation.navigate(
                                        Screens.MilestoneDetails,
                                    )
                                }
                                contentStyle={{flexDirection: 'row-reverse'}}
                                mode={'contained'}
                                icon={() => (
                                    <TransparentIcon
                                        size={20}
                                        color={'#ffffff'}>
                                        <PlusIcon color={'white'} />
                                    </TransparentIcon>
                                )}
                                style={AppStyles.button}>
                                Add New Milestone
                            </Button>
                        </View>
                        <AppSpacing gap={8} />
                    </View>

                    {/*Section Milestones*/}

                    <View style={styles.milestonesContainer}>
                        <SheetLine />
                        <AppSpacing gap={8} />
                        {milestones.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(
                                            Screens.MilestoneDetails,
                                        )
                                    }
                                    activeOpacity={0.8}
                                    key={`ca-${index}`}>
                                    <AppCard padding={16} marginVertical={8}>
                                        <AppText variant={'h2'}>
                                            {item?.name}
                                        </AppText>
                                        <AppSpacing gap={24} />
                                        <View
                                            style={[
                                                styles.row,
                                                {
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'flex-start',
                                                },
                                            ]}>
                                            <View
                                                style={[styles.row, {flex: 1}]}>
                                                <CalendarIcon
                                                    color={Colors.grey_3}
                                                />
                                                <AppSpacing
                                                    isHorizontal={true}
                                                />
                                                {item?.date &&
                                                item?.location ? (
                                                    <AppText
                                                        color={Colors.grey_3}>
                                                        {item?.date}
                                                    </AppText>
                                                ) : (
                                                    <AppText>
                                                        Not Yet Scheduled
                                                    </AppText>
                                                )}
                                            </View>
                                            <View
                                                style={[
                                                    styles.centeredContainer,
                                                    {marginLeft: 16},
                                                ]}>
                                                <LocationPin
                                                    color={Colors.grey_3}
                                                />
                                            </View>
                                        </View>
                                    </AppCard>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
