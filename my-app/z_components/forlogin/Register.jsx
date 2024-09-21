import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@rneui/base";

import * as FileSystem from "expo-file-system";

const Register = (props) => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [image, setimage] = useState(null);
  const [otpOpen, setotpOpen] = useState(true);

  useEffect(() => {
    const access = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
    access();
  }, []);

  const handlesetimage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setimage(result.assets[0].uri);
    }
  };

  const handleLogin = async () => {
    console.log(email, password, name);
    try {
      if (!image) return alert("please choose profile image");

      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);

      const fileInfo = await FileSystem.getInfoAsync(image);
      formdata.append("image", {
        uri: Platform.OS === "android" ? image : image.replace("file://", ""),
        name: fileInfo.uri.split("/").pop(),
        type: "image/jpeg", // Adjust type based on your image format
      });
      formdata.append("image", image);

      await axios
        .post("http://192.168.169.216:8000/register", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data.success) {
            props.navigation.navigate("/otp", { token: res.data.dataToken });
          }
          console.log(res.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../images/download.jpeg")}
            resizeMode="contain"
          />

          <View style={styles.inputContainer}>
            <AntDesign name="user" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Name"
              value={name}
              onChangeText={(text) => setname(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Entypo name="mail" size={24} color="gray" />
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Enter Your Email"
              value={email}
              onChangeText={(text) => setemail(text)}
            />
          </View>
          <View
            style={[
              styles.inputContainer,
              { marginBottom: responsiveHeight(2) },
            ]}
          >
            <MaterialIcons name="password" size={24} color="gray" />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter Your Password"
              onChangeText={(text) => setpassword(text)}
              value={password}
            />
          </View>

          <Button
            onPress={handlesetimage}
            title="select profile image"
          ></Button>
          <View stle={styles.buttonContiner}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: responsiveWidth(3),
                marginTop: responsiveHeight(1),
              }}
            >
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.9),
                  color: "gray",
                }}
              >
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("/login")}
              >
                <Text
                  style={{
                    fontSize: responsiveScreenFontSize(1.9),
                    color: "#4F8BD1",
                    fontWeight: "600",
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: responsiveWidth(80),
    height: responsiveHeight(30),
  },
  inputContainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    borderWidth: 1,
    borderRadius: responsiveWidth(3),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2),
    borderColor: "#7C7777",
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  buttonContiner: {
    width: "100%",
    alignItems: "center",
    height: responsiveHeight(5),
  },
  button: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    backgroundColor: "#498FDF",
    borderRadius: responsiveWidth(3),
  },
  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2.4),
    fontWeight: "600",
    textAlign: "center",
    textAlignVertical: `center`,
    flex: 1,
  },
});
