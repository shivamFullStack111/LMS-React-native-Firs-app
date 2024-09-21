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
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setisauthenticated } from "../../store/Slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const { isauthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    console.log(isauthenticated);
  }, [isauthenticated]);

  const handleLogin = async () => {
    setloading(true);
    console.log(email, password);
    try {
      await axios
        .post("http://192.168.169.216:8000/login", {
          email,
          password,
        })
        .then(async (res) => {
          Alert.alert(JSON.stringify(res.data));
          if (res.data.success) {
            dispatch(setisauthenticated(true));
            await AsyncStorage.setItem("Token", res.data.token);
          }
        });

      setloading(false);
    } catch (error) {
      setloading(false);
      Alert.alert(error.message);
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
          <View stle={styles.buttonContiner}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>
                {loading ? (
                  <ActivityIndicator
                    style={{ marginLeft: "40%" }}
                    color={"white"}
                  />
                ) : (
                  "Login"
                )}
              </Text>
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
                Not have an account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("/register")}
              >
                <Text
                  style={{
                    fontSize: responsiveScreenFontSize(1.9),
                    color: "#4F8BD1",
                    fontWeight: "600",
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
  },
});
