import React, {useState} from 'react';
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {WebView} from 'react-native-webview';
import {ActivityIndicator} from 'react-native-paper';

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

export const PrivacyPolicyScreen = () => {
    const {width, height} = useWindowDimensions();
    const [loading, setLoading] = useState(true);

    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader title={'Privacy Policy'} />
            <ScrollView
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                {loading && (
                    <View
                        style={{
                            minHeight: height - 100,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <ActivityIndicator />
                    </View>
                )}
                <View style={styles.innerContainer}>
                    {/*<View style={styles.centeredContainer}>*/}
                    {/*    <LogoCircle size={100} />*/}
                    {/*    <AppSpacing gap={32} />*/}
                    {/*    <AppText>Last updated on August 23, 2022</AppText>*/}
                    {/*</View>*/}
                    {/*<AppSpacing gap={32} />*/}
                    <View style={{height: height - 100, width: width}}>
                        <WebView
                            bounces={false}
                            scalesPageToFit={Platform.OS === 'android'}
                            onError={e => console.log('e', e)}
                            onLoadStart={() => setLoading(true)}
                            onLoadEnd={() => setLoading(false)}
                            originWhitelist={['*']}
                            source={{
                                uri: 'https://www.termsfeed.com/live/edab016b-a267-40b7-8891-36738897da1e',
                            }}
                        />
                    </View>
                    {/*<View>*/}
                    {/*    <AppText variant={'h3'}>Privacy Policy</AppText>*/}
                    {/*    <AppSpacing gap={8} />*/}
                    {/*    <AppText color={Colors.grey_2}>*/}
                    {/*        A Privacy Policy is a legal statement that specifies*/}
                    {/*        what the business owner does with the personal data*/}
                    {/*        collected from users, along with how the data is*/}
                    {/*        processed. This marks the start of what we know now*/}
                    {/*        as a "Privacy Policy." While the name "Privacy*/}
                    {/*        Policy" refers to the legal agreement.*/}
                    {/*    </AppText>*/}
                    {/*    <AppSpacing gap={8} />*/}
                    {/*    <AppText color={Colors.grey_2}>*/}
                    {/*        A Privacy Policy is a legal statement that specifies*/}
                    {/*        what the business owner does with the personal data*/}
                    {/*        collected from users, along with how the data is*/}
                    {/*        processed. This marks the start of what we know now*/}
                    {/*        as a "Privacy Policy." While the name "Privacy*/}
                    {/*        Policy" refers to the legal agreement.*/}
                    {/*    </AppText>*/}
                    {/*</View>*/}
                </View>
            </ScrollView>
        </View>
    );
};
