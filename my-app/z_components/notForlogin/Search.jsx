import {
  View,
  Text,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Image,
} from "react-native";

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Card from "./Card";
import { useSelector } from "react-redux";
const Search = (props) => {
  const { courses } = useSelector((state) => state.user);
  const [searchCourses, setsearchCourses] = useState([]);

  const handleTextChange = (text) => {
    const time = setTimeout(() => {
      const crs = courses.filter((c) =>
        c.title.toLowerCase().includes(text.toLowerCase())
      );
      console.log(crs);
      if (!text) {
        setsearchCourses([]);
      } else {
        setsearchCourses(crs);
      }
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* search */}
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 1,
            padding: 7,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: responsiveWidth(3),
          }}
        >
          <TextInput
            onChangeText={(text) => handleTextChange(text)}
            style={{ fontSize: responsiveFontSize(2), width: "90%" }}
            placeholder="Search..."
          ></TextInput>
          <Fontisto name="search" size={24} color={"gray"} />
        </View>

        {searchCourses.length > 0 && (
          <View
            style={{
              width: "90%",
              marginTop: responsiveHeight(2),
              maxHeight: responsiveHeight(23),
            }}
          >
            <Text
              style={{ marginBottom: 6, fontSize: responsiveFontSize(2.3) }}
            >
              Search Result
            </Text>
            {/* search options */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    marginBottom: 4,
                    backgroundColor: "#CFD7D0",
                    borderRadius: responsiveFontSize(1),
                  }}
                >
                  <Image
                    style={{
                      width: responsiveHeight(5),
                      height: responsiveHeight(5),
                      borderRadius: responsiveFontSize(1),
                    }}
                    source={{
                      uri: "https://i.ytimg.com/vi/d4THvyWSuCM/hqdefault.jpg",
                    }}
                  ></Image>
                  <View>
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: responsiveFontSize(1.5),
                      }}
                    >
                      MERN STACK full LMS Project
                    </Text>
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: responsiveFontSize(1.2),
                      }}
                    >
                      MERN STACK full LMS Project
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* categories */}
        <View style={{ width: "100%", height: 60, marginBottom: 8 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
            horizontal
          >
            <View
              style={{
                gap: responsiveWidth(2),
                flexDirection: "row",
                marginTop: responsiveHeight(2),
              }}
            >
              {categories.map((i) => (
                <Text
                  key={i}
                  style={{
                    color: "white",
                    padding: responsiveFontSize(1.1),
                    paddingLeft: responsiveFontSize(2.1),
                    borderRadius: responsiveFontSize(5),
                    paddingRight: responsiveFontSize(2.3),
                    backgroundColor: "#26EF5A",
                  }}
                >
                  {i}
                </Text>
              ))}
            </View>
          </ScrollView>
        </View>
        {/* card items */}
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              marginTop: responsiveHeight(3),
              zIndex: 10,
            }}
          >
            {courses &&
              courses?.map((course, i) => (
                <Card key={i} course={course}></Card>
              ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const categories = [
  "WEB DEVELOPMENT",
  "DATA SCIENCE",
  "MACHINE LEARNING",
  "APP DEVELOPMENT",
  "DATA MANAGEMENT",
  "BLOCK CHAIN DEVELOPMENT",
];
