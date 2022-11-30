import React from 'react';
import {
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
        link: Screens.Help,
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
    const navigation = useNavigation<StackNavigationProp<any>>();
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
                                <>
                                    <TouchableOpacity
                                        key={`m-${index}`}
                                        activeOpacity={0.8}
                                        onPress={() =>
                                            navigation.navigate(item?.link)
                                        }>
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
                                </>
                            );
                        })}
                    </View>
                    <AppSpacing gap={16} />
                    <View>
                        <Button
                            contentStyle={AppStyles.buttonContent}
                            style={AppStyles.button}
                            mode={'contained'}>
                            Reset Milestones
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
