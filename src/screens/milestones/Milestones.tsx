import React, {useEffect, useState} from 'react';
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
import {MilestoneCard} from './MilestoneCard';
import AppButton from '../../components/AppButton';

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
    const [selectedItem, setSelectedItems] = useState<any>([]);
    const [selectionVisible, setSelectionVisible] = useState(false);

    useEffect(() => {
        if (selectedItem.length > 0) {
            setSelectionVisible(true);
        } else {
            setSelectionVisible(false);
        }
    }, [selectedItem]);

    const toggleSelectAll = () => {
        if (milestones.length === selectedItem.length) {
            setSelectedItems([]);
        } else {
            const items = milestones.map((item, index) => index);
            setSelectedItems([...items]);
        }
    };

    const updateSelection = (item: any) => {
        const updatedItems = selectedItem;
        if (selectedItem.includes(item)) {
            const index = updatedItems.indexOf(item);
            updatedItems.splice(index, 1);
            setSelectedItems([...updatedItems]);
        } else {
            setSelectedItems((prevState: any) => [...prevState, item]);
        }
    };

    const removeSelection = (item: number) => {
        const updatedItems = selectedItem;
        const index = updatedItems.indexOf(item);
        updatedItems.splice(index, 1);
        setSelectedItems([...updatedItems]);
    };

    console.log('m check', milestones.length, selectedItem.length);

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
                            Check back as your gestational carrier updates her
                            appointments along with the surrogacy journey
                        </AppText>
                        <AppSpacing gap={16} />
                        <View style={[styles.row, styles.centeredContainer]}>
                            <AppButton
                                onPress={() =>
                                    navigation.navigate(
                                        Screens.MilestoneDetails,
                                    )
                                }
                                contentStyle={[
                                    AppStyles.buttonContent,
                                    {flexDirection: 'row-reverse'},
                                ]}
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
                            </AppButton>
                        </View>
                        <AppSpacing gap={8} />
                    </View>

                    {/*Section Milestones*/}

                    <View style={styles.milestonesContainer}>
                        <SheetLine />
                        <AppSpacing gap={8} />
                        {selectionVisible && (
                            <View
                                style={[
                                    styles.row,
                                    {
                                        justifyContent: 'flex-end',
                                        marginVertical: 8,
                                    },
                                ]}>
                                <TouchableOpacity
                                    onPress={() => toggleSelectAll()}
                                    activeOpacity={0.8}>
                                    <AppText
                                        variant={'custom'}
                                        fontWeight={'700'}
                                        color={Colors.primary}>
                                        {milestones.length ===
                                        selectedItem.length
                                            ? 'Unselect All'
                                            : 'Select All'}
                                    </AppText>
                                </TouchableOpacity>
                            </View>
                        )}

                        {milestones.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onLongPress={() => updateSelection(index)}
                                    onPress={() => {
                                        if (selectionVisible) {
                                            updateSelection(index);
                                        } else {
                                            navigation.navigate(
                                                Screens.MilestoneDetails,
                                            );
                                        }
                                    }}
                                    activeOpacity={0.8}
                                    key={`ca-${index}`}>
                                    <MilestoneCard
                                        isSelected={selectedItem.includes(
                                            index,
                                        )}
                                        onRemoveSelection={() =>
                                            removeSelection(index)
                                        }
                                        item={item}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                        {selectionVisible && (
                            <View>
                                <AppSpacing gap={8} />
                                <View>
                                    <AppButton mode={'contained'}>
                                        Reset Milestones
                                    </AppButton>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
