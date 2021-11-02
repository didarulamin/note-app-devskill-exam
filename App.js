import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Home from "./src/screens/Home";
import Employees from "./src/screens/Employees";
import create from "./src/screens/create";
import useFirebase from "./firebase/useFirebase";
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

function App() {
  const { firebase, user, setUser } = useFirebase();

  console.log(user.email);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.email ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Create" component={create} />
            <Stack.Screen name="Employees" component={Employees} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
