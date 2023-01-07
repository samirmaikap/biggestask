import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import appStyles from '../theme/AppStyles';
import {MenuIcon} from './icons/MenuIcon';
import {AppText} from './AppText';
import {StackNavigationProp} from '@react-navigation/stack';
import {setUser} from '../contexts/actions';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        marginLeft: 8,
        flex: 1,
        alignItems: 'center',
    },
    button: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

type Props = {
    title: string;
    actions?: any[];
    goBackAction?: Function;
};

const TabHeader = (props: Props) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<StackNavigationProp<any>>();

    const {title, actions} = props;

    const openMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer);
    };

    return (
        <View style={[appStyles.appBarContainer, {marginTop: insets.top}]}>
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => openMenu()}>
                    <MenuIcon />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <AppText variant={'custom'} size={20} fontWeight={'700'}>
                    {title}
                </AppText>
            </View>
            <View style={[styles.row, {minWidth: 40}]}>{actions}</View>
        </View>
    );
};

export default TabHeader;
