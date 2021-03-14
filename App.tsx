import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from "./src/Components/Calendar";

export default function App() {
  const [selectedList] = useState<Array<Boolean>> ([
    true,
    true,
    false,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
  ])

  return (
    <View style={styles.container}>
      <Calendar selectedList={selectedList}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
