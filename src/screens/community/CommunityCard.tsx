import React from 'react';
import {AppCard} from '../../components/AppCard';
import {Divider, useTheme} from 'react-native-paper';
import {Linking, StyleSheet, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {images} from '../../utils/constants';
import {AppCompactButton} from '../../components/AppCompactButton';
import {Colors} from '../../theme/colors';
import {AppImage} from '../../components/AppImage';
import {Link} from '@react-navigation/native';

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
};

export const CommunityCard = (props: Props) => {
    const {item, onEditPress} = props;
    const theme = useTheme();

    const gotoLink = (link: string) => {
        Linking.canOpenURL(link)
            .then(supported => {
                if (supported) {
                    Linking.openURL(link);
                } else {
                    console.log("Don't know how to open URI: ");
                }
            })
            .catch(e => console.log(e));
    };

    return (
        <AppCard>
            <View style={[styles.row, {alignItems: 'flex-start', padding: 16}]}>
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
            </View>
            <Divider style={{backgroundColor: Colors.grey_bg, height: 1}} />
            <View style={[styles.row, {alignItems: 'center', padding: 16}]}>
                <View style={{flex: 1, marginRight: 8}}>
                    <AppCompactButton
                        color={Colors.grey_bg}
                        textColor={Colors.grey_3}
                        onPress={() => gotoLink(item?.forum_link)}
                        name={'Instagram'}
                        outlined={true}
                    />
                </View>
                <View style={{flex: 1, marginLeft: 8}}>
                    <AppCompactButton
                        onPress={() => gotoLink(item?.insta_link)}
                        name={'To Forum'}
                    />
                </View>
            </View>
        </AppCard>
    );
};
