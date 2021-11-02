import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
/* import Button from "../components/Button";
import Input from "../components/Input"; */
import useFirebase from "../../firebase/useFirebase";
import Button from "../components/Button";
import Input from "../components/Input";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const OPTIONS = ["Male", "Female"];

const signup = () => {
  //   const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_con, setPassword_con] = useState("");
  const { firebase } = useFirebase();

  console.log(password, password_con);
  const handleSignup = () => {
    if (password_con !== password) {
      showMessage({
        message: "Confirm password not match",
        type: "danger",
      });
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        showMessage({
          message: "Success",
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        showMessage({
          message: "failed",
          type: "danger",
        });
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Input onChangeText={(text) => setEmail(text)} label="Email" />
        <Input
          onChangeText={(text) => setPassword(text)}
          label="Password"
          secureTextEntry={true}
        />

        <Input
          onChangeText={(text) => setPassword_con(text)}
          label="Confirm Password"
          secureTextEntry={true}
        />

        <Button
          onPress={handleSignup}
          title="Submit"
          customStyles={{ alignSelf: "center", marginTop: 30 }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
  },
});

export default signup;
