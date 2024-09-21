import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "@rneui/base";
import Card from "./Card";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import Sweper from "./Sweper";
import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

const Home = (props) => {
  const { user, courses } = useSelector((state) => state.user);

  return (
    <SafeAreaView style={{ flex: 1, width: responsiveWidth(100) }}>
      <ScrollView style={{ flex: 1, width: responsiveWidth(100) }}>
        {/* header */}
        <View style={styles.headerContainer}>
          {user && user?.isadmin && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("dashboard")}
            >
              <Ionicons
                style={{ marginLeft: responsiveWidth(3) }}
                name="reorder-three-sharp"
                size={40}
                color="white"
              />
            </TouchableOpacity>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <View style={{ position: "relative" }}>
              <Text
                style={{
                  position: "absolute",
                  backgroundColor: "#1D9FF9",
                  width: responsiveWidth(5),
                  height: responsiveWidth(5),
                  borderRadius: 100,
                  zIndex: 10,
                  textAlign: "center",
                  verticalAlign: "center",
                  color: "#FFFFFF",
                  right: -1,
                  top: -1,
                }}
              >
                1
              </Text>
              <Ionicons name="notifications-sharp" size={30} color="white" />
            </View>
            <Image
              style={[
                styles.image,
                {
                  objectFit: "contain",
                  borderWidth: 1,
                },
              ]}
              source={{
                uri: user?.image,
              }}
            />
          </View>
        </View>
        <Sweper />
        <View
          style={{
            width: responsiveWidth(100),
            alignItems: "center",
            marginBottom: responsiveHeight(4),
          }}
        >
          <Text
            style={[
              styles.heading,
              { fontSize: responsiveFontSize(3.8), color: "black" },
            ]}
          >
            Latest{" "}
            <MaskedView
              maskElement={
                <Text
                  style={{
                    backgroundColor: "transparent",
                    width: responsiveWidth(40),
                    // height: responsiveHeight(4.4),
                    fontSize: responsiveFontSize(4),
                  }}
                >
                  {" "}
                  Courses{" "}
                </Text>
              }
            >
              <LinearGradient
                colors={["#0AF1F1", "#F10AEA", "#77F10A"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 2, y: 1 }}
              >
                <Text
                  style={{
                    backgroundColor: "transparent",
                    width: responsiveWidth(32),
                    height: 35,
                    opacity: 0,
                  }}
                >
                  Courses
                </Text>
              </LinearGradient>
            </MaskedView>
          </Text>
          <Text
            style={[
              styles.heading,
              { marginTop: 0, marginBottom: responsiveHeight(2.4) },
            ]}
          >
            Enroll Now And Get Discount
          </Text>
          {courses &&
            courses.map((course, i) => <Card course={course} key={i} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  headerContainer: {
    width: responsiveWidth(95),
    borderRadius: responsiveWidth(7),
    backgroundColor: "#59E3C1",
    height: responsiveHeight(8),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: responsiveWidth(2.2),
  },
  image: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(20),
    margin: responsiveWidth(2.5),
  },

  heading: {
    // width: "100%",
    marginLeft: responsiveWidth(4),
    color: "gray",
    fontSize: responsiveFontSize(2.3),
    marginTop: responsiveHeight(3),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  maskedView: {
    flexDirection: "row",
    height: 50,
  },
  maskContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
  },
  linearGradient: {
    flex: 1,
  },
});
