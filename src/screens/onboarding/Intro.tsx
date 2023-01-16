import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Image, StyleSheet, View} from 'react-native';
import AppStyles from '../../theme/AppStyles';
import {AppText} from '../../components/AppText';
import {Colors} from '../../theme/colors';
import {AppSpacing} from '../../components/AppSpacing';
import {AppStatusBar} from '../../components/AppStatusBar';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../navigations/Screens';
import {StackNavigationProp} from '@react-navigation/stack';
import AppButton from '../../components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    slide: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingBottom: 96, // Add padding to offset large buttons and pagination in bottom of page
    },
    image: {
        width: '100%',
        height: '70%',
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        margin: 4,
    },
});

const slides = [
    {
        key: 1,
        title: 'We help manage the surrogacy process',
        text: 'One place to hold the contact information of your fertility clinic, surrogacy agency, surrogacy lawyer and/or ObGyn. ',
        image: require('../../assets/images/7.webp'),
    },
    {
        key: 2,
        title: 'Get notified about upcoming appointments',
        text: 'Enter, share and receive dates and information related to important upcoming appointments related to your surrogacy journey',
        image: require('../../assets/images/2.webp'),
    },
    {
        key: 3,
        title: 'Get to know your surrogacy journey partner',
        text: 'As the journey unfolds, answer important and personal questions about yourself which will then be shared with your surrogacy partner to help establish a meaningful, special bond',
        image: require('../../assets/images/3.webp'),
    },
    {
        key: 4,
        title: 'Join a Community',
        text: "Either through The Biggest Ask community or through your agency's community, stay connected and ask our members any questions you have about the journey. ",
        image: require('../../assets/images/4.webp'),
    },
];

export const IntroScreen = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    // @ts-ignore
    const _renderItem = ({item}) => {
        return (
            <View style={styles.slide}>
                <Image style={styles.image} source={item.image} />
                <View
                    style={{
                        padding: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <AppText textAlign={'center'} variant={'h2'}>
                        {item.title}
                    </AppText>
                    <AppSpacing gap={16} />
                    <AppText textAlign={'center'} color={Colors.dark_grey}>
                        {item.text}
                    </AppText>
                </View>
            </View>
        );
    };
    const _renderNextButton = () => {
        return (
            <AppButton
                contentStyle={AppStyles.buttonContent}
                mode={'contained'}
                style={AppStyles.button}>
                Next
            </AppButton>
        );
    };
    const _renderDoneButton = () => {
        return (
            <AppButton
                contentStyle={AppStyles.buttonContent}
                mode={'contained'}
                style={AppStyles.button}>
                Get Started
            </AppButton>
        );
    };

    const _keyExtractor = (item: any) => item.key;

    const handleDonePress = async () => {
        await AsyncStorage.setItem('skip_intro', JSON.stringify(true));
        navigation.navigate(Screens.Login);
    };

    return (
        <View style={styles.container}>
            <AppStatusBar />
            <AppIntroSlider
                data={slides}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                bottomButton
                renderDoneButton={_renderDoneButton}
                renderNextButton={_renderNextButton}
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    backgroundColor: Colors.grey_bg,
                }}
                activeDotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    backgroundColor: Colors.secondary,
                }}
                onDone={() => handleDonePress()}
            />
        </View>
    );
};
