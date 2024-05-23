import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { markItemCompleted, deleteItem } from '../services/DbService';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }) => {
    const { item } = route.params;
    const [isCompleted, setIsCompleted] = useState(item.completed);
    const navigation = useNavigation();

    const handleMarkCompleted = async () => {
        const success = await markItemCompleted(item.id);
        if (success) {
            setIsCompleted(true);
        }
    }

    const handleDeleteItem = async () => {
        const success = await deleteItem(item.id);
        if (success) {
            Alert.alert("Item Deleted", "The item has been successfully deleted.", [
                {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                },
            ]);
        } else {
            Alert.alert("Error", "There was an error deleting the item.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24 }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Due date: {item.due}</Text>
            <Text>Priority: {item.priority ? "Yes" : "No"}</Text>

            <Button
                title={isCompleted ? 'Already done' : 'Mark completed'}
                color="red"
                disabled={isCompleted}
                onPress={handleMarkCompleted}
            />
            <Button
                title="Delete"
                color="red"
                onPress={handleDeleteItem}
            />
        </View>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
        marginTop: 20,
    }
})
