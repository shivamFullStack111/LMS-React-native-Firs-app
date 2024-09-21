import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  ScrollView,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";

const EnrolledCourses = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ width: "90%" }}>
            {/* heading */}
            <View style={{ padding: 30, flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(4),
                  fontWeight: 600,
                }}
              >
                Enrolled
              </Text>
              <MaskedView
                maskElement={
                  <Text
                    style={{
                      fontSize: responsiveFontSize(4),
                      fontWeight: "600",
                      paddingLeft: 4,
                      backgroundColor: "transparent",
                    }}
                  >
                    Courses
                  </Text>
                }
              >
                <LinearGradient
                  colors={["pink", "blue", "red"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text
                    style={{
                      fontSize: responsiveFontSize(4),
                      fontWeight: "600",
                      paddingLeft: 4,
                      backgroundColor: "transparent",
                      opacity: 0,
                    }}
                  >
                    Courses
                  </Text>
                </LinearGradient>
              </MaskedView>
            </View>

            {/* enrolled courses */}
            <View
              style={{
                width: responsiveWidth(90),
                backgroundColor: "#fff",
                borderWidth: 1,
                borderRadius: responsiveWidth(4),
                flexDirection: "row",
              }}
            >
              <Image
                width={responsiveWidth(30)}
                height={responsiveWidth(30)}
                style={{
                  borderRadius: responsiveWidth(4),
                }}
                source={{
                  uri: "https://i.ytimg.com/vi/d4THvyWSuCM/hqdefault.jpg",
                }}
              ></Image>
              <View
                style={{
                  flexShrink: 1,
                  gap: responsiveWidth(0.3),
                  flex: 1,
                  padding: responsiveWidth(1.8),
                }}
              >
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: "500",
                    marginBottom: responsiveWidth(1),
                  }}
                >
                  Lorem, ipsum dolor sit amet...
                </Text>
                <Text
                  style={{ fontSize: responsiveFontSize(1.8), color: "gray" }}
                >
                  Ratings (4/5)
                </Text>
                <Text
                  style={{ fontSize: responsiveFontSize(1.8), color: "gray" }}
                >
                  Buy on 12/03/2024
                </Text>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: responsiveWidth(8),
                    backgroundColor: "#C41F41",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: responsiveWidth(1),
                    borderRadius: responsiveWidth(2),
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: responsiveFontSize(1.5) }}
                  >
                    GO TO COURSE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EnrolledCourses;
