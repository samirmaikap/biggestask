import React from 'react';
import {
    Alert,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {HelpIcon} from '../../components/icons/HelpIcon';
import Screens from '../../navigations/Screens';
import {DocumentIcon} from '../../components/icons/DocumentIcon';
import {DetailedSettingsIcon} from '../../components/icons/DetailedSettingsIcon';
import {useNavigation} from '@react-navigation/native';
import {AppSpacing} from '../../components/AppSpacing';
import {Button, Divider} from 'react-native-paper';
import {AppText} from '../../components/AppText';
import AppStyles from '../../theme/AppStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import AppButton from '../../components/AppButton';
import {useAppContext} from '../../contexts/AppContext';
import useContactQuery from '../../hooks/useContactQuery';
import useMilestoneQuery from '../../hooks/useMilestoneQuery';
import {useToast} from 'react-native-toast-notifications';

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
    menuItem: {
        paddingVertical: 16,
    },
});

const menus = [
    {
        name: 'Help',
        icon: <HelpIcon />,
        link: 'https://thebiggestask.com/the-biggest-ask-surrogacy-service/',
    },
    {
        name: 'About',
        icon: <HelpIcon />,
        link: Screens.About,
    },
    {
        name: 'Detailed Settings',
        icon: <DetailedSettingsIcon />,
        link: Screens.DetailedSettings,
    },
    {
        name: 'Privacy Policy',
        icon: <DocumentIcon />,
        link: Screens.Privacy,
    },
    {
        name: 'Terms of Service',
        icon: <DocumentIcon />,
        link: Screens.Terms,
    },
];

export const SettingsScreen = () => {
    const {state} = useAppContext();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const {resetMilestones, getMilestones} = useMilestoneQuery();
    const toast = useToast();

    const handleResetMilestones = async () => {
        const ids = state.milestones.map((item: {id: any}) => item.id);
        if (ids?.length > 0) {
            Alert.alert('Are you sure?', 'All milestones will be reset', [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        const payload = {
                            ids: ids,
                        };

                        const response = await resetMilestones(payload);
                        if (response?.error) {
                            toast.show(response?.message);
                            return;
                        }

                        toast.show(response?.message);
                        await getMilestones();
                    },
                },
            ]);
        } else {
            toast.show('No milestones available to reset');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader title={'Settings'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    <View>
                        {menus.map((item, index) => {
                            return (
                                <View key={`me-${index}`}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            if (index === 0) {
                                                Linking.canOpenURL(item?.link)
                                                    .then(() =>
                                                        Linking.openURL(
                                                            item?.link,
                                                        ),
                                                    )
                                                    .catch(e => console.log(e));
                                            } else {
                                                navigation.navigate(item?.link);
                                            }
                                        }}>
                                        <View
                                            style={[
                                                styles.row,
                                                styles.menuItem,
                                            ]}>
                                            <View>{item?.icon}</View>
                                            <AppSpacing
                                                isHorizontal={true}
                                                gap={16}
                                            />
                                            <View>
                                                <AppText fontWeight={'600'}>
                                                    {item.name}
                                                </AppText>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {index + 1 !== menus.length && <Divider />}
                                </View>
                            );
                        })}
                    </View>
                    <AppSpacing gap={16} />
                    <View>
                        <AppButton
                            onPress={handleResetMilestones}
                            contentStyle={AppStyles.buttonContent}
                            style={AppStyles.button}
                            mode={'contained'}>
                            Reset Milestones
                        </AppButton>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
