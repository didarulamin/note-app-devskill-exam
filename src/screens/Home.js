import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useFirebase from "../../firebase/useFirebase";

const Home = ({ navigation }) => {
  // const [checking, setChecking] = useState(true);
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const { firebase, user } = useFirebase();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const subscriber = firebase
      .firestore()
      .collection("Employees")
      .where("createdBy", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        const newEmployees = [];
        querySnapshot.forEach((doc) => {
          newEmployees.push({ id: doc.id, ...doc.data() });
        });
        setEmployees(newEmployees);
      });

    return subscriber;
  }, []);

  // console.log(employees[2].dayState);

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: item.noteColor,
        borderRadius: 12,
        padding: 15,
        margin: 5,
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={{ uri: item.img }}
          style={{
            height: 100,
            width: 100,
            alignSelf: "flex-start",
            borderRadius: 50,
          }}
        />
        <View style={{ marginHorizontal: 5 }}>
          <Text style={{ fontSize: 18, color: "black" }}>{item.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 14, color: "black", margin: 5 }}>
              {item.gender}
            </Text>
            <Text style={{ fontSize: 14, color: "black", margin: 5 }}>
              {item.age}
            </Text>
          </View>
          <View>
            {item.dayState.map((day, index) => (
             if (day ==="1") {
              
              {days[index]} 
    
             }
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 24, color: "#188180", fontWeight: "bold" }}>
          My Employees
        </Text>
        <Pressable style={{ marginTop: 5 }}>
          <AntDesign
            onPress={() => navigation.navigate("Create")}
            name="pluscircle"
            size={24}
            color="#188180"
          />
        </Pressable>
      </View>

      {employees.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={require("../../assets/home_empty.png")} />
          <Text>You don't have any notes</Text>
        </View>
      ) : (
        <FlatList
          data={employees}
          renderItem={renderItem}
          keyExtractor={(item) => item.employeeId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Home;
