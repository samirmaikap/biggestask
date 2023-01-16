import React from 'react';
import {AppCard} from '../../components/AppCard';
import {Divider, useTheme} from 'react-native-paper';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {images} from '../../utils/constants';
import {AppCompactButton} from '../../components/AppCompactButton';
import {Colors} from '../../theme/colors';
import {AppImage} from '../../components/AppImage';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: 56,
        height: 56,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    textItem: {
        paddingVertical: 6,
    },
});

type Props = {
    onEditPress?: Function;
    item: any;
    onPress: Function;
};

export const CommunityCard = (props: Props) => {
    const {item, onEditPress, onPress} = props;
    const theme = useTheme();

    const gotoLink = (link: string) => {
        if (link) {
            Linking.openURL(link).catch(e => console.log(e));
        }
    };

    return (
        <AppCard>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onPress()}
                style={[styles.row, {alignItems: 'flex-start', padding: 16}]}>
                <View style={styles.imageContainer}>
                    <AppImage
                        size={56}
                        isLocal={!item?.image}
                        uri={item?.image ? item?.image : images.LOGO_ORIGINAL}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={{flex: 1, marginLeft: 16}}>
                    <AppText fontWeight={'600'}>{item?.title}</AppText>
                    <AppSpacing gap={8} />
                    <AppText color={Colors.grey_3}>{item?.description}</AppText>
                </View>
            </TouchableOpacity>
            <Divider style={{backgroundColor: Colors.grey_bg, height: 1}} />
            <View style={[styles.row, {alignItems: 'center', padding: 16}]}>
                <View style={{flex: 1, marginRight: 8}}>
                    <AppCompactButton
                        color={Colors.grey_bg}
                        textColor={Colors.grey_3}
                        onPress={() => gotoLink(item?.insta_link)}
                        name={'Instagram'}
                        outlined={true}
                    />
                </View>
                <View style={{flex: 1, marginLeft: 8}}>
                    <AppCompactButton
                        onPress={() => gotoLink(item?.forum_link)}
                        name={'To Forum'}
                    />
                </View>
            </View>
        </AppCard>
    );
};
