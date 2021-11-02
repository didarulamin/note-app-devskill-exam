import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
// import WeekdayPicker from "react-native-weekday-picker";
import addPic from "../../assets/add_pic.png";
import Button from "../components/Button";
import Input from "../components/Input";
import RadioInput from "../components/RadioInput";
import WeekdayPicker from "../components/WeekdayPicker/WeekdayPicker";
import * as ImagePicker from "expo-image-picker";
import useFirebase from "../../firebase/useFirebase";
import uuid from "react-native-uuid";
import { LogBox } from "react-native";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";

const OPTIONS = ["Male", "Female"];

const create = ({ navigation }) => {
  LogBox.ignoreLogs(["Setting a timer"]);

  const [gender, setGender] = useState(null);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { firebase, user } = useFirebase();

  const [dayState, setDayState] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  console.log(fullName, age, gender, dayState);
 
  let days = {
    0: dayState["0"],
    1: dayState["1"],
    2: dayState["2"],
    3: dayState["3"],
    4: dayState["4"],
    5: dayState["5"],
    6: dayState["6"],
  };

  const handleChange = (days) => {
    setDayState(days);
  };

 

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const employeeId = uuid.v4(); //

  const onSave = () => {
    // setIsLoading(true);
    const selectedDays = [];
    for (const day in dayState) {
      const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
      if (dayState[day]) {
        selectedDays.push(days[day]);
      }
    }

    const employee = {
      employeeId: employeeId,
      name: fullName,
      age: age,
      gender: gender,
      dayState: selectedDays,
      createdBy: user.uid,
      img: imageUrl,
      timestamp: new Date(),
    };

    const employeeRef = firebase.firestore().collection("Employees");
    // userRef.doc(uid).set(note);
    employeeRef
      .add(employee)
      .then((_doc) => {
        console.log(_doc);
        // setIsLoading(false);
        showMessage({
          message: "Save successfully",
          type: "success",
        });
      })
      .catch((err) => (err) => {
        console.log(err);

        showMessage({
          message: "failed",
          type: "danger",
        });
      });

    navigation.goBack();
  };

  const pickImage = async () => {
    const uriToBlob = (uri) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
          // return the blob
          resolve(xhr.response);
        };

        xhr.onerror = function () {
          // something went wrong
          reject(new Error("uriToBlob failed"));
        };

        // this helps us get a blob
        xhr.responseType = "blob";

        xhr.open("GET", uri, true);
        xhr.send(null);
      });
    };

    const uploadToFirebase = (blob) => {
      return new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref();

        storageRef
          .child(`uploads/${employeeId}.jpg`)
          .put(blob, {
            contentType: "image/jpeg",
          })
          .then((snapshot) => {
            blob.close();

            resolve(snapshot);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
    })
      .then((result) => {
        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri } = result;
          setImage(uri);
          return uriToBlob(uri);
        }
      })
      .then((blob) => {
        return uploadToFirebase(blob);
      })
      .then((snapshot) => {
        /*  console.log("File uploaded");
        const url = snapshot.ref().getDownloadUrl();
        console.log(url); */
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
        });
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <View style={{ padding: 15 }}>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            alignSelf: "flex-start",
            margin: 10,
          }}
        >
          Create Employees
        </Text>

        <View style={{ marginBottom: 15 }}>
          {image ? (
            <Pressable onPress={pickImage}>
              <Image
                source={{ uri: image }}
                style={{
                  height: 100,
                  width: 100,
                  alignSelf: "center",
                  borderRadius: 50,
                }}
              />
            </Pressable>
          ) : (
            <Pressable onPress={pickImage}>
              <Image source={addPic} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={{ margin: 10 }}>
        <Input label="Name" onChangeText={(text) => setFullName(text)} />
        <Input label="Age" onChangeText={(text) => setAge(text)} />
        {OPTIONS.map((option, index) => (
          <RadioInput
            label={option}
            key={index}
            value={gender}
            setValue={setGender}
          />
        ))}
      </View>

      <WeekdayPicker days={days} onChange={handleChange} />

      <Button
        onPress={onSave}
        title="create"
        customStyles={{ alignSelf: "center", marginTop: 20 }}
      />
    </View>
  );
};

export default create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
