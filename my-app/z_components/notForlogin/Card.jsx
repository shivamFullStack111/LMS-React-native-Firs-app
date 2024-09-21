import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Card = (props) => {
  const { course } = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate("search");
        navigation.navigate("courseDetail");
      }}
      style={styles.cardContainer}
    >
      <Image
        style={{
          objectFit: "cover",
          width: "100%",
          height: "60%",
          borderRadius: responsiveWidth(7),
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        source={{
          uri: course?.thumbnail,
        }}
      />
      <View style={{ padding: 3, width: "100%" }}>
        <Text style={{ fontSize: responsiveFontSize(2), color: "#53534F" }}>
          {course?.title}
        </Text>
        <View
          style={{
            width: "100%",
            padding: responsiveWidth(1),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: responsiveFontSize(2), color: "#53534F" }}>
            Price {course?.price}${" "}
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                textDecorationLine: "line-through",
              }}
            >
              {course?.estimateprice}$
            </Text>
          </Text>
          <Text
            style={{
              padding: responsiveWidth(1.4),
              paddingLeft: responsiveHeight(2),
              paddingRight: responsiveHeight(2),
              backgroundColor: "#17B80D",
              color: "white",
              borderRadius: responsiveWidth(7),
            }}
          >
            {course?.discount || 0}% off
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: responsiveHeight(2),
            }}
          >
            <View
              style={{ flexDirection: "row", padding: responsiveWidth(0.3) }}
            >
              <AntDesign
                name="star"
                style={{ fontSize: responsiveFontSize(2.7) }}
                color="gold"
              />
              <AntDesign
                name="star"
                style={{ fontSize: responsiveFontSize(2.7) }}
                color="gold"
              />
              <AntDesign
                name="star"
                style={{ fontSize: responsiveFontSize(2.7) }}
                color="gold"
              />
              <AntDesign
                name="star"
                style={{ fontSize: responsiveFontSize(2.7) }}
                color="gold"
              />
            </View>
            <Text style={{ color: "gray" }}>(4/5) Ratings</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: responsiveHeight(2),
    paddingTop: responsiveHeight(5),
    paddingBottom: responsiveHeight(5),
  },
  cardContainer: {
    flex: 1,
    width: responsiveWidth(93),
    height: responsiveHeight(40),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: responsiveWidth(7),
    borderLeftWidth: 7,
    borderLeftColor: "#59E3C1",
    borderRightWidth: 7,
    borderRightColor: "#59E3C1",
    marginBottom: responsiveHeight(4),
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
