import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {useWindowDimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {useHeaderHeight} from '@react-navigation/elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        paddingVertical: 16,
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

export const TermsScreen = () => {
    const {width, height} = useWindowDimensions();
    const [loading, setLoading] = useState(true);
    const headerHeight = useHeaderHeight();
    console.log('headerHeight', headerHeight);

    const runFirst = `
      document.getElementsByClassName('site-header')[0].style.display = 'none';
      document.getElementsByClassName('elementor-section-wrap')[0].style.display = 'none';
      true; // note: this is required, or you'll sometimes get silent failures
    `;

    // useEffect(() => {
    //     (async () => {
    //         const response = await getTerms();
    //         if (!response?.error) {
    //             setTerms(response);
    //             setLoading(false);
    //         }
    //     })();
    // }, []);

    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader title={'Terms of Service'} />
            <ScrollView
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                {loading && (
                    <View
                        style={{
                            minHeight: height - 80,
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
                    {/*<RenderHtml contentWidth={width} source={terms} />*/}
                    <View style={{height: height - 100, width: width}}>
                        <WebView
                            bounces={false}
                            scalesPageToFit={Platform.OS === 'android'}
                            onError={e => console.log('e', e)}
                            onLoadStart={() => setLoading(true)}
                            onLoadEnd={() => setLoading(false)}
                            originWhitelist={['*']}
                            injectedJavaScript={runFirst}
                            source={{
                                uri: 'https://thebiggestask.com/eula/',
                            }}
                        />
                    </View>
                    {/*<View>*/}
                    {/*    <AppText variant={'h3'}>Terms</AppText>*/}
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
                    {/*<AppSpacing gap={32} />*/}
                    {/*<View>*/}
                    {/*    <AppText variant={'h3'}>Service</AppText>*/}
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
