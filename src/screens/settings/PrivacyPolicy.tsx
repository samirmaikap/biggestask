import React from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import StackHeader from '../../components/StackHeader';
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

export const PrivacyPolicyScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader title={'Privacy Policy'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    <View style={styles.centeredContainer}>
                        <LogoCircle size={100} />
                        <AppSpacing gap={32} />
                        <AppText>Last updated on August 23, 2022</AppText>
                    </View>
                    <AppSpacing gap={32} />
                    <View>
                        <AppText variant={'h3'}>Privacy Policy</AppText>
                        <AppSpacing gap={8} />
                        <AppText color={Colors.grey_2}>
                            A Privacy Policy is a legal statement that specifies
                            what the business owner does with the personal data
                            collected from users, along with how the data is
                            processed. This marks the start of what we know now
                            as a "Privacy Policy." While the name "Privacy
                            Policy" refers to the legal agreement.
                        </AppText>
                        <AppSpacing gap={8} />
                        <AppText color={Colors.grey_2}>
                            A Privacy Policy is a legal statement that specifies
                            what the business owner does with the personal data
                            collected from users, along with how the data is
                            processed. This marks the start of what we know now
                            as a "Privacy Policy." While the name "Privacy
                            Policy" refers to the legal agreement.
                        </AppText>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
