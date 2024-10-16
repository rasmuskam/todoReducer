import { StyleSheet, FlatList, Text, TextInput, Button, View, TouchableOpacity } from 'react-native';
import React, { useState, memo } from 'react';

const Tasks = ({ tasks, add, remove }) => {
    const [description, setDescription] = useState('');

    const save = () => {
        add(description);
        setDescription('');
    };

    return (
        <>
            <View style={styles.form}>
                <TextInput
                    value={description}
                    onChangeText={text => setDescription(text)}
                    placeholder='Add new...'
                />
                <Button title="Save task" onPress={save} />
            </View>

        <FlatList
            data={tasks}
            renderItem={({ item, index }) => (
         <Text
            onPress={() => remove(index)} 
        >
        {item.description}
        </Text>
  )}
/>
        </>
    );
};

export default memo(Tasks);

const styles = StyleSheet.create({
    form: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});