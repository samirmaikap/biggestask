import React from 'react';
import {
    Image,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {images} from '../../utils/constants';
import {AppSpacing} from '../../components/AppSpacing';
import {AppText} from '../../components/AppText';
import {LogoCircle} from '../../components/icons/LogoCircle';
import {Colors} from '../../theme/colors';

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
});

const socialLinks = [
    // {
    //     link: 'https://facebook.com',
    //     icon: images.FACEBOOK,
    // },
    // {
    //     link: 'https://twitter.com',
    //     icon: images.TWITTER,
    // },
    {
        link: 'https://instagram.com/thebiggestask ',
        icon: images.INSTAGRAM,
    },
    {
        link: 'https://thebiggestask.com',
        icon: images.WEB,
    },
];

export const AboutScreen = () => {
    const gotoUrl = (link: string) => {
        Linking.openURL(link).catch(e => console.log(e));
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader title={'About App'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    <View style={styles.centeredContainer}>
                        <LogoCircle size={100} />
                        <AppSpacing gap={32} />
                        <AppText>Last updated on January 18, 2023</AppText>
                    </View>
                    <AppSpacing gap={32} />
                    <View>
                        <AppText variant={'h3'}>About BiggestAsk App</AppText>
                        <AppSpacing gap={8} />
                        <AppText color={Colors.grey_2}>
                            This app is meant to be used in conjunction with our
                            Surrogacy Program. The Biggest Ask App helps
                            coordinate surrogacy journey appointments between
                            surrogates and intended parents and The Biggest Ask.
                            Users may send photos and messages to each other
                            and/or to The Biggest Ask. Finally, The Biggest Ask
                            feeds bonding questions to both intended parents and
                            surrogates and exchanges the answers. The Biggest
                            Ask App is your pocket surrogacy journey organizer.
                        </AppText>
                    </View>
                    <AppSpacing gap={32} />
                    <View>
                        <AppText variant={'h3'}>More Information</AppText>
                        <AppSpacing gap={8} />
                        <AppText color={Colors.grey_2}>
                            You can find more information about us
                        </AppText>
                        <AppSpacing gap={32} />
                        <View style={[styles.row, styles.centeredContainer]}>
                            {socialLinks.map((item, index) => {
                                return (
                                    <View
                                        key={`social-${index}`}
                                        style={[
                                            styles.centeredContainer,
                                            {marginHorizontal: 8},
                                        ]}>
                                        <TouchableOpacity
                                            onPress={() => gotoUrl(item?.link)}
                                            activeOpacity={0.8}>
                                            <View>
                                                <Image
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                    }}
                                                    source={item?.icon}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
