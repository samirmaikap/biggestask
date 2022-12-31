import React, {useContext, useEffect, useState} from 'react';
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
import {useAppContext} from '../../contexts/AppContext';

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

export const MilestonesScreen = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [selectedItem, setSelectedItems] = useState<any>([]);
    const [selectionVisible, setSelectionVisible] = useState(false);
    const {state, dispatch} = useAppContext();

    useEffect(() => {
        if (selectedItem.length > 0) {
            setSelectionVisible(true);
        } else {
            setSelectionVisible(false);
        }
    }, [selectedItem]);

    const toggleSelectAll = () => {
        if (state.milestones.length === selectedItem.length) {
            setSelectedItems([]);
        } else {
            const items = state.milestones.map(
                (item: any, index: any) => index,
            );
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

    console.log('m check', state.milestones.length, selectedItem.length);

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
                        {state.user.id === state.surrogate?.id && (
                            <View
                                style={[styles.row, styles.centeredContainer]}>
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
                        )}

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
                                        {state.milestones.length ===
                                        selectedItem.length
                                            ? 'Unselect All'
                                            : 'Select All'}
                                    </AppText>
                                </TouchableOpacity>
                            </View>
                        )}

                        {state.milestones.map((item: any, index: number) => {
                            return (
                                <TouchableOpacity
                                    onLongPress={() => updateSelection(index)}
                                    onPress={() => {
                                        if (selectionVisible) {
                                            updateSelection(index);
                                        } else {
                                            navigation.navigate(
                                                Screens.MilestoneDetails,
                                                {activeMilestoneId: item?.id},
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
