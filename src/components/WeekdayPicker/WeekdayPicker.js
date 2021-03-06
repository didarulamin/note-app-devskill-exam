import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import Day from "./Day";


/* WeekdayPicker.defaultProps = {
  onChange: null,
  style: null,
  dayStyle: null,
  days: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 0, 0: 0 },
}; */

export default function WeekdayPicker(props) {
  let { onChange, style, dayStyle, days } = props;
 
  const toggleDay = (day) => {
    // If the day is 0 set it 1, if 1 set 0
    days[day] ? (days[day] = 0) : (days[day] = 1);
    // Call the parent function to set the new reminder in the state
    onChange(days);
  };

  // Populate days of the week
  //
  let daysContainer = [];

  Object.keys(days).forEach((day, i) => {
    daysContainer.push(
      <Day
        key={i}
        toggleDay={toggleDay}
        day={day}
        style={[styles.day, dayStyle]}
       
        isActive={1 === days[day]} // Pass boolean
      />
    );
  });
  return <View style={[styles.container, style]}>{daysContainer}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    display: "flex",
    height: 50,
    alignItems: "center",
  },
  day: {
    margin: 3,
  },
});
