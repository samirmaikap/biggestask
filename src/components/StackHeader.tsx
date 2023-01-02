import React, {useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import appStyles from '../theme/AppStyles';
import {ChevronLeftIcon} from './icons/ChevronLeftIcon';
import {AppText} from './AppText';
import {Colors} from '../theme/colors';
import {CancelIcon} from './icons/CancelIcon';
import {SearchIcon} from './icons/SearchIcon';
import {StackNavigationProp} from '@react-navigation/stack';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        marginLeft: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar: {
        position: 'absolute',
        top: -10,
        right: 16,
        zIndex: 99,
    },
    input: {
        // height: 40
    },
});

type Props = {
    title: string;
    actions?: any[];
    goBackAction?: Function;
    showSearch?: boolean;
};

const StackHeader = (props: Props) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const {width} = useWindowDimensions();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const onPressGoBack = () => {
        navigation.goBack();
    };

    const cancelSearch = () => {
        setIsSearchOpen(false);
    };

    const {
        title,
        actions,
        goBackAction = onPressGoBack,
        showSearch = false,
    } = props;

    return (
        <View
            style={[
                appStyles.appBarContainer,
                {marginTop: insets.top, backgroundColor: 'white'},
            ]}>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => goBackAction()}>
                    <ChevronLeftIcon />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <AppText variant={'custom'} size={20} fontWeight={'700'}>
                    {title}
                </AppText>
            </View>

            {showSearch && isSearchOpen && (
                <View style={styles.searchBar}>
                    <TextInput
                        mode={'outlined'}
                        placeholder={'Search'}
                        right={
                            <TextInput.Icon
                                onPress={cancelSearch}
                                icon={() => (
                                    <CancelIcon color={Colors.grey_3} />
                                )}
                            />
                        }
                        outlineStyle={{borderColor: Colors.grey_bg}}
                        style={[
                            styles.input,
                            {
                                width: width - 32,
                                backgroundColor: Colors.grey_bg,
                            },
                        ]}
                        theme={{roundness: 12}}
                    />
                </View>
            )}

            {showSearch ? (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setIsSearchOpen(true)}
                    style={{width: 40}}>
                    <SearchIcon />
                </TouchableOpacity>
            ) : (
                <View style={[styles.row, {minWidth: 40}]}>{actions}</View>
            )}
        </View>
    );
};

export default StackHeader;
