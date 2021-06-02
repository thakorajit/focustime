import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/Sizes';
import {  FocusHistory } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage'

const STATUSES = {
  COMPLETE: 1,
  CANCELED: 2,
};

export default function App() {
  console.log("yolo")
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
  };

  const onClear =() =>{
    setFocusHistory([]);
  }

  const saveFocusHistory= async() => {
    try{
       await AsyncStorage.setItem("focusHistory",JSON.stringify(focusHistory))
    }catch(e){
      console.log(e);
    }
  }

  useEffect(()=> {
     saveFocusHistory();
  },[focusHistory])

  const loadFocusHistory = async ()=>{
    try{
        const history = await AsyncStorage.getItem("focusHistory");
        if(history && JSON.parse(history).length){
          setFocusHistory(JSON.parse(history))
        }
    }catch(e){
      console.log(e)
    }
  }

  useEffect (()=>{
    loadFocusHistory();
  },[])

  useEffect(() => {
    if (focusSubject) {
      setFocusHistory([...focusHistory, focusSubject]);
    }
  }, [focusSubject]);

  console.log(focusHistory);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{flex:1}}>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </View>
      )}
      <Text>{focusSubject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.os === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
