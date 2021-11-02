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
import Button from "../components/Button";

const Home = ({ navigation }) => {
  // const [checking, setChecking] = useState(true);
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
    <View style={{ marginBottom: 5, flexDirection: "row", padding: 10 }}>
      <Image
        source={{ uri: item.img }}
        style={{
          height: 100,
          width: 100,
          alignSelf: "flex-start",
          borderRadius: 50,
        }}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
          marginVertical: 5,
          borderBottomWidth: 1,
          padding: 5,
        }}
      >
        <Text style={{ fontSize: 18, color: "black" }}>{item.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 14, color: "black", margin: 5 }}>
            {item.gender}
          </Text>
          <View
            style={{
              height: 5,
              width: 5,
              borderRadius: 10,
              backgroundColor: "black",
            }}
          ></View>
          <Text style={{ fontSize: 14, color: "black", margin: 5 }}>
            {item.age}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          {item.dayState.map((day) => (
            <View
              key={day}
              style={{
                height: 30,
                width: 30,
                borderRadius: 30,
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center",
                margin: 2,
              }}
            >
              <Text style={{ fontSize: 11, color: "white" }}>{day}</Text>
            </View>
          ))}
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
        {employees.length === 1 && (
          <Pressable style={{ marginTop: 5 }}>
            <AntDesign
              onPress={() => navigation.navigate("Create")}
              name="pluscircle"
              size={24}
              color="#188180"
            />
          </Pressable>
        )}
      </View>

      {employees.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={require("../../assets/home_empty.png")} />
          <Text>You don't have any employees</Text>
          <Button
            onPress={() => navigation.navigate("Create")}
            title="Add an employees"
            customStyles={{ margin: 10 }}
          />
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
