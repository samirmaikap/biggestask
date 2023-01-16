import React from 'react';
import {AppCard} from '../../components/AppCard';
import {Divider, useTheme} from 'react-native-paper';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {PencilIcon} from '../../components/icons/PencilIcon';
import {images} from '../../utils/constants';
import {AppCompactButton} from '../../components/AppCompactButton';
import {Colors} from '../../theme/colors';
import {formatPhoneNumber} from '../../utils/utils';
import {AppImage} from '../../components/AppImage';
import {useToast} from 'react-native-toast-notifications';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: 56,
        height: 56,
        overflow: 'hidden',
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
    onEditPress: Function;
    item: any;
};

export const ContactCard = (props: Props) => {
    const {item, onEditPress} = props;
    const theme = useTheme();
    const toast = useToast();

    const makeCall = () => {
        if (item?.phone) {
            Linking.openURL(`tel:${item?.phone}`);
        } else {
            toast.show('Phone number is invalid');
            return;
        }
    };

    return (
        <AppCard>
            <View style={[styles.row, {alignItems: 'flex-start', padding: 16}]}>
                <View style={styles.imageContainer}>
                    <AppImage
                        size={56}
                        uri={item?.image ? item?.image : images.LOGO_ORIGINAL}
                        isLocal={!item?.image}
                    />
                </View>
                <View style={{flex: 1, marginLeft: 16}}>
                    <View
                        style={[styles.row, {justifyContent: 'space-between'}]}>
                        <AppText fontWeight={'600'}>{item?.title}</AppText>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => onEditPress()}>
                            <PencilIcon />
                        </TouchableOpacity>
                    </View>
                    <AppSpacing gap={8} />
                    <View style={styles.textItem}>
                        <AppText variant={'caption'} color={Colors.grey_3}>
                            Contact Rep Name
                        </AppText>
                        <AppSpacing />
                        <AppText>{item?.name}</AppText>
                    </View>
                    <View style={styles.textItem}>
                        <AppText variant={'caption'} color={Colors.grey_3}>
                            {item?.title} Email
                        </AppText>
                        <AppSpacing />
                        <AppText>{item?.email}</AppText>
                    </View>
                    <View style={styles.textItem}>
                        <AppText variant={'caption'} color={Colors.grey_3}>
                            {item?.title} phone number
                        </AppText>
                        <AppSpacing />
                        <AppText>
                            {item?.phone
                                ? formatPhoneNumber(item?.phone)
                                : null}
                        </AppText>
                    </View>
                </View>
            </View>
            <Divider style={{backgroundColor: Colors.grey_bg, height: 1}} />
            <View style={[styles.row, {alignItems: 'center', padding: 16}]}>
                <View style={{flex: 1, marginRight: 8}}>
                    <AppCompactButton
                        color={Colors.grey_bg}
                        textColor={Colors.grey_3}
                        onPress={() => {}}
                        name={'Share'}
                        outlined={true}
                    />
                </View>
                <View style={{flex: 1, marginLeft: 8}}>
                    <AppCompactButton
                        onPress={() => makeCall()}
                        name={'Call'}
                    />
                </View>
            </View>
        </AppCard>
    );
};
