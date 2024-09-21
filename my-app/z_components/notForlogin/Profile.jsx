import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { BlurView } from "expo-blur";

const Profile = () => {
  const [image, setimage] = useState("");

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
    }
  };
  return (
    // <LinearGradient style={{ flex: 1 }} colors={["blue", "#fff"]}>
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri: "https://img.freepik.com/premium-photo/abstract-geometric-background-with-pink-blue-gradient-futuristic-background-with-figures-technological-fashion-concept_494516-2021.jpg",
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              marginTop: responsiveHeight(10),
            }}
          >
            <View style={{ alignItems: "center", position: "relative" }}>
              <Image
                style={{
                  // objectFit: "contain",
                  width: responsiveWidth(25),
                  height: responsiveWidth(25),
                  borderRadius: responsiveWidth(100),
                }}
                source={{
                  uri: "https://i.ytimg.com/vi/d4THvyWSuCM/hqdefault.jpg",
                }}
              />

              <TouchableOpacity
                onPress={handlesetimage}
                style={{
                  backgroundColor: "#26A3EF",
                  padding: responsiveWidth(0.5),
                  borderRadius: responsiveHeight(8),
                  position: "absolute",
                  bottom: responsiveWidth(7),
                  right: responsiveWidth(2),
                }}
              >
                <EvilIcons
                  name="camera"
                  size={responsiveHeight(3.2)}
                  color="white"
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.4),
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Shivam
              </Text>
            </View>
            <View style={{ width: "80%", marginTop: responsiveHeight(4),alignItems:'flex-end' }}>
              <FontAwesome name="pencil" size={24} color="white" />
            </View>
            <BlurView
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: responsiveWidth(3),
                marginBottom: responsiveHeight(3),
                marginTop: responsiveHeight(1),
                borderRadius: responsiveWidth(2),
                backgroundColor: "white",
              }}
              intensity={100}
            >
              <Text
                style={{
                  fontWeight: 700,
                }}
              >
                Name
              </Text>
              <Text style={{ fontWeight: 600, color: "gray" }}>Shivam</Text>
              {/* </View> */}
            </BlurView>
            <BlurView
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: responsiveWidth(3),
                marginBottom: responsiveHeight(3),
                // marginTop: responsiveHeight(3),
                borderRadius: responsiveWidth(2),
                backgroundColor: "white",
              }}
              intensity={100}
            >
              <Text
                style={{
                  fontWeight: 700,
                }}
              >
                Email
              </Text>
              <Text style={{ fontWeight: 600, color: "gray" }}>
                shvam12340987@gmail.com
              </Text>
              {/* </View> */}
            </BlurView>
            <BlurView
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: responsiveWidth(2),
                marginBottom: responsiveHeight(3),
                // marginTop: responsiveHeight(3),
                borderRadius: responsiveWidth(2),
                backgroundColor: "white",
              }}
              intensity={100}
            >
              <Text
                style={{
                  fontWeight: 700,
                }}
              >
                Password
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  color: "gray",
                  fontSize: responsiveFontSize(2.5),
                }}
              >
                ********
              </Text>
            </BlurView>
            {/* <Text
              style={{
                marginTop: responsiveHeight(6),
                width: "90%",
                fontSize: responsiveFontSize(3),
                fontWeight: 700,
                color: "white",
                textDecorationLine: "underline",
              }}
            >
              Enrolled Courses
            </Text>
            <View
              style={{
                width: "90%",
                backgroundColor: "white",
                marginTop: responsiveHeight(2),
              }}
            >
              <View></View>
            </View> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
    // </LinearGradient>
  );
};

export default Profile;
