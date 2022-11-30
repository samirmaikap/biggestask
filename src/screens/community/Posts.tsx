import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CommunityCard} from './CommunityCard';
import StackHeader from '../../components/StackHeader';
import {PlusCircleIcon} from '../../components/icons/PlusCircleIcon';
import {AppBottomSheet} from '../../components/AppBottomSheet';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {CommunityForm} from './CommunityForm';

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

export const PostsScreen = () => {
    const [openSheet, setOpenSheet] = useState(false);

    const renderBottomSheet = () => {
        return (
            <AppBottomSheet isOpen={openSheet} onClose={() => setOpenSheet(false)}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <AppText variant={'h2'}>Create Community</AppText>
                </View>
                <AppSpacing gap={16}/>
                <CommunityForm/>
            </AppBottomSheet>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar/>
            <StackHeader
                title={'Community'}
                actions={[
                    <TouchableOpacity onPress={() => setOpenSheet(true)}>
                        <PlusCircleIcon/>
                    </TouchableOpacity>,
                ]}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    <CommunityCard/>
                </View>
            </ScrollView>
            {renderBottomSheet()}
        </View>
    );
};
