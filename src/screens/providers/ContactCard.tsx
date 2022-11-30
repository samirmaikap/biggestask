import React from 'react';
import {AppCard} from '../../components/AppCard';
import {Divider, useTheme} from 'react-native-paper';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {PencilIcon} from '../../components/icons/PencilIcon';
import {images} from '../../utils/constants';
import {AppCompactButton} from '../../components/AppCompactButton';
import {Colors} from '../../theme/colors';

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
};

export const ContactCard = (props: Props) => {
    const {onEditPress} = props;
    const theme = useTheme();
    return (
        <AppCard>
            <View style={[styles.row, {alignItems: 'flex-start', padding: 16}]}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={images.AVOCADO} />
                </View>
                <View style={{flex: 1, marginLeft: 16}}>
                    <View
                        style={[styles.row, {justifyContent: 'space-between'}]}>
                        <AppText fontWeight={'600'}>Fertility Doctor</AppText>
                        <TouchableOpacity onPress={() => onEditPress()}>
                            <PencilIcon />
                        </TouchableOpacity>
                    </View>
                    <AppSpacing gap={8} />
                    <View style={styles.textItem}>
                        <AppText variant={'caption'} color={Colors.grey_3}>
                            Contact Rep Name
                        </AppText>
                        <AppSpacing />
                        <AppText>John Doe</AppText>
                    </View>
                    <View style={styles.textItem}>
                        <AppText variant={'caption'} color={Colors.grey_3}>
                            Agency Email
                        </AppText>
                        <AppSpacing />
                        <AppText>happyagency@mail.ua</AppText>
                    </View>
                    <View style={styles.textItem}>
                        <AppText variant={'caption'} color={Colors.grey_3}>
                            Agency phone number
                        </AppText>
                        <AppSpacing />
                        <AppText>(222)-333-4444</AppText>
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
                    <AppCompactButton onPress={() => {}} name={'Call'} />
                </View>
            </View>
        </AppCard>
    );
};
