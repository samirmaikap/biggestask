import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {ContactCard} from './ContactCard';
import {PlusCircleIcon} from '../../components/icons/PlusCircleIcon';
import {AppBottomSheet} from '../../components/AppBottomSheet';
import {AppText} from '../../components/AppText';
import {ContactForm} from './ContactForm';
import {AppSpacing} from '../../components/AppSpacing';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        padding: 16,
    },
});

export const ProvidersScreen = () => {
    const [openSheet, setOpenSheet] = useState(false);

    const renderBottomSheet = () => {
        return (
            <AppBottomSheet
                isOpen={openSheet}
                onClose={() => setOpenSheet(false)}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <AppText variant={'h2'}>Create Contact</AppText>
                </View>
                <AppSpacing gap={16} />
                <ContactForm />
            </AppBottomSheet>
        );
    };

    const handleOnEditPress = () => {
        setOpenSheet(true);
    };

    return (
        <View style={styles.container}>
            <StackHeader
                title={'Your Contacts'}
                actions={[
                    <TouchableOpacity onPress={() => setOpenSheet(true)}>
                        <PlusCircleIcon />
                    </TouchableOpacity>,
                ]}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    {[1, 2, 3, 4, 5, 6].map((item, index) => {
                        return (
                            <View
                                style={{marginVertical: 8}}
                                key={`card-${index}`}>
                                <ContactCard
                                    onEditPress={() => handleOnEditPress()}
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            {renderBottomSheet()}
        </View>
    );
};
