import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import React, { useReducer, useState } from 'react';
import Tasks from './components/Tasks';

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
           return [...state, { key: (state.length + 1).toString(), description: action.payload }];
        case 'REMOVE_TASK':
            return state.filter((_, index) => index !== action.index);
        default:
            return state;
    }
};
export default function App() {
    const [tasks, dispatch] = useReducer(taskReducer, []);
    const [search, setSearch] = useState('');

    
    const add = (description) => {
        dispatch({ type: 'ADD_TASK', payload: description });
    };


    const remove = (index) => {
        dispatch({ type: 'REMOVE_TASK', index });
    };

    const filteredTasks = search.length > 0
        ? tasks.filter(task => task.description.startsWith(search))
        : tasks;

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Todo-list</Text>
          <TextInput
                value={search}
                onChangeText={text => setSearch(text)}
                placeholder='Search...'
            />
            <Tasks tasks={filteredTasks} add={add} remove={remove} />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      margin: 16
    },
    header: {
      fontSize: 24,
      margin: 16,
    },
});