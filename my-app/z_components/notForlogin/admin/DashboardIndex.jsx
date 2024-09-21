import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { BarChart } from "react-native-gifted-charts";

const data = [
  { value: 50, label: "Jan", frontColor: "rgb(0, 0, 270)" },
  { value: 80, label: "Feb", frontColor: "rgb(0, 0, 270)" },
  { value: 90, label: "Mar", frontColor: "rgb(0, 0, 270)" },
  { value: 70, label: "Apr", frontColor: "rgb(0, 0, 270)" },
  { value: 85, label: "May", frontColor: "rgb(0, 0, 270)" },
  { value: 85, label: "May", frontColor: "rgb(0, 0, 270)" },
];

const pieData = [
  { value: 54, color: "#177AD5", text: "54%" },
  { value: 40, color: "#79D2DE", text: "30%" },
  { value: 20, color: "#ED6665", text: "26%" },
];

const DashboardIndex = (props) => {
  return (
    <LinearGradient
      colors={["#CDCFD9", "#CDCFD9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView scrollEnabled={false} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "#0625AF",
            borderBottomRightRadius: responsiveWidth(4),
            borderBottomLeftRadius: responsiveWidth(4),
          }}
        >
          {/* header */}
          <View
            style={{
              width: "100%",
              marginTop: responsiveHeight(4),
              alignItems: "center",
            }}
          >
            {/* back button */}
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() => props.navigation.goBack()}
            >
              <AntDesign
                name="leftcircle"
                size={responsiveFontSize(3.4)}
                color="white"
                style={{ padding: 5, marginLeft: responsiveWidth(2) }}
              />
            </TouchableOpacity>

            <View
              style={{
                padding: responsiveWidth(3),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",

                width: "100%",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: "600",
                    color: "#96979F",
                  }}
                >
                  Data Analytics
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.7),
                    fontWeight: "700",
                    color: "#fff",
                  }}
                >
                  Charted Data
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
                <MaterialIcons
                  onPress={() => props.navigation.navigate("createcourse")}
                  name="add-circle"
                  style={{
                    backgroundColor: "#263CE5",
                    padding: responsiveHeight(1.3),
                    borderRadius: 100,
                  }}
                  size={responsiveFontSize(3)}
                  color="white"
                />
                <Entypo
                  name="users"
                  size={responsiveFontSize(3)}
                  color="white"
                  style={{
                    backgroundColor: "#263CE5",
                    padding: responsiveHeight(1.3),
                    borderRadius: 100,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                width: "90%",
                backgroundColor: "#fff",
                padding: responsiveHeight(0.5),
                borderTopRightRadius: responsiveWidth(3),
                borderTopLeftRadius: responsiveWidth(3),
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: responsiveWidth(6),
                  height: responsiveWidth(6),
                  objectFit: "contain",
                }}
                source={{
                  uri: "https://t3.ftcdn.net/jpg/02/35/26/30/360_F_235263034_miJw2igmixo7ymCqhHZ7c8wp9kaujzfM.jpg",
                }}
              ></Image>
              <Text
                style={{
                  fontSize: responsiveHeight(1.6),
                  fontWeight: "600",
                  color: "gray",
                }}
              >
                Managed the all data
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <ScrollView
            style={{
              width: "90%",
              height: responsiveHeight(70),
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "100%",
                minHeight: responsiveHeight(70),
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: "700",
                    color: "#000",
                    padding: 2,
                    marginLeft: responsiveWidth(3),
                    marginTop: responsiveHeight(1),
                  }}
                >
                  Sales Analytics
                </Text>

                <BarChart
                  initialSpacing={responsiveWidth(3)}
                  spacing={responsiveWidth(5)}
                  width={responsiveWidth(90)}
                  data={data}
                  barWidth={responsiveWidth(6)}
                  barBorderRadius={4}
                  frontColor="#6a51ae"
                  yAxisThickness={0}
                  xAxisThickness={0}
                  showLine
                  barStyle={{ color: "black" }}
                  verticalLinesColor={"#000"}
                />
                {/* data in boxes */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    padding: responsiveWidth(3),
                    gap: responsiveWidth(3),
                    justifyContent: "center",
                  }}
                >
                  {/* total user */}
                  <View
                    style={{
                      height: responsiveWidth(36),
                      width: responsiveWidth(40),
                      // overflow: "hidden",
                      borderWidth: 1,
                      borderColor: "#CBCDD6",
                      borderRadius: responsiveWidth(2),
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: responsiveWidth(2),
                        marginTop: responsiveWidth(1),
                        color: "gray",
                        fontSize: responsiveFontSize(1.6),
                        width: "100%",
                      }}
                    >
                      Toatl Users
                    </Text>
                    <Text
                      style={{
                        width: "65%",
                        height: "72%",
                        color: "white",
                        fontSize: responsiveFontSize(2),
                        fontWeight: "700",
                        borderRadius: 1000,
                        backgroundColor: "blue",
                        marginTop: responsiveWidth(2),
                        textAlign: "center",
                        textAlignVertical: "center",
                      }}
                    >
                      73 Users
                    </Text>
                  </View>
                  {/* total courses */}
                  <View
                    style={{
                      height: responsiveWidth(36),
                      width: responsiveWidth(40),
                      // overflow: "hidden",
                      borderWidth: 1,
                      borderColor: "#CBCDD6",
                      borderRadius: responsiveWidth(2),
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: responsiveWidth(2),
                        marginTop: responsiveWidth(1),
                        color: "gray",
                        fontSize: responsiveFontSize(1.6),
                        width: "100%",
                      }}
                    >
                      Toatl Courses
                    </Text>
                    <Text
                      style={{
                        width: "65%",
                        height: "72%",
                        color: "white",
                        fontSize: responsiveFontSize(2),
                        fontWeight: "700",
                        borderRadius: 1000,
                        backgroundColor: "blue",
                        marginTop: responsiveWidth(2),
                        textAlign: "center",
                        textAlignVertical: "center",
                      }}
                    >
                      4 Courses
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default DashboardIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    width: "100%",
  },
});
