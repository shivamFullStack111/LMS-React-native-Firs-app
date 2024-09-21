import { View, Text, TextInput, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const OtpVerify = (props) => {
  const [otp, setotp] = useState(["", "", "", ""]);
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();

  useEffect(() => {
    console.log(props.route.params?.token);
  }, [props.token]);

  const handleChangeText = (text, index) => {
    if (text) {
      if (index == 1) {
        setotp([...otp, (setotp[0] = text)]);
        input2.current.focus();
      }
      if (index == 2) {
        setotp([...otp, (setotp[1] = text)]);
        input3.current.focus();
      }
      if (index == 3) {
        setotp([...otp, (setotp[2] = text)]);
        input4.current.focus();
      }
      if (index == 4) {
        setotp([...otp, (setotp[3] = text)]);
      }
    } else {
      if (index == 1) {
        setotp([...otp, (setotp[0] = text)]);
        input1.current.focus();
      }
      if (index == 2) {
        setotp([...otp, (setotp[1] = text)]);
        input1.current.focus();
      }
      if (index == 3) {
        setotp([...otp, (setotp[2] = text)]);
        input2.current.focus();
      }
      if (index == 4) {
        setotp([...otp, (setotp[3] = text)]);
        input3.current.focus();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const newotp = otp.join("");
      console.log(newotp);
      const res = await axios.post("http://192.168.169.216:8000/verify-otp", {
        otp: newotp,
        dataToken: props.route.params?.token,
      });
      alert(res.data.message);
      if (res.data.success) {
        props.navigation.navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: responsiveWidth(90), alignItems: "center" }}>
        <Text style={{ fontSize: responsiveFontSize(3.4), fontWeight: "600" }}>
          Enter Otp To Verify{" "}
        </Text>
        <Text style={{ fontSize: responsiveFontSize(3.4), fontWeight: "500" }}>
          Your Account!
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            gap: responsiveWidth(3),
            justifyContent: "center",
          }}
        >
          <TextInput
            ref={input1}
            onChangeText={(text) => handleChangeText(text, 1)}
            id="input1"
            keyboardType="numeric"
            maxLength={1}
            style={{
              width: responsiveWidth(13),
              height: responsiveWidth(13),
              borderWidth: 1,
              fontSize: responsiveFontSize(3.5),
              textAlign: "center",
            }}
          ></TextInput>
          <TextInput
            ref={input2}
            onChangeText={(text) => handleChangeText(text, 2)}
            id="input2"
            keyboardType="numeric"
            maxLength={1}
            style={{
              width: responsiveWidth(13),
              height: responsiveWidth(13),
              borderWidth: 1,
              fontSize: responsiveFontSize(3.5),
              textAlign: "center",
            }}
          ></TextInput>
          <TextInput
            ref={input3}
            onChangeText={(text) => handleChangeText(text, 3)}
            id="input3"
            keyboardType="numeric"
            maxLength={1}
            style={{
              width: responsiveWidth(13),
              height: responsiveWidth(13),
              borderWidth: 1,
              fontSize: responsiveFontSize(3.5),
              textAlign: "center",
            }}
          ></TextInput>
          <TextInput
            ref={input4}
            onChangeText={(text) => handleChangeText(text, 4)}
            id="input4"
            keyboardType="numeric"
            maxLength={1}
            style={{
              width: responsiveWidth(13),
              height: responsiveWidth(13),
              borderWidth: 1,
              fontSize: responsiveFontSize(3.5),
              textAlign: "center",
            }}
          ></TextInput>
        </View>

        <Button onPress={handleSubmit} title="Submit"></Button>
      </View>
    </View>
  );
};

export default OtpVerify;
