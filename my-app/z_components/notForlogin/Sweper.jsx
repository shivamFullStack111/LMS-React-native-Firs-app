import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Image } from "@rneui/base";

const Sweper = () => {
  return (
    <Swiper autoplay showsButtons={false} style={styles.wrapper}>
      <View style={styles.slide1}>
        <ImageBackground
          style={{
            width: responsiveWidth(95),
            height: responsiveHeight(34),
            objectFit: "cover",
          }}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTaS2P9068_OhAOKwT13BULXW6NglAsjNxtrPc88VH20wHGfHJTVSRTcVYsugHGAOkBWw&usqp=CAU",
          }}
        >
          <Text>hii</Text>
        </ImageBackground>
      </View>
      <View style={styles.slide2}>
        <ImageBackground
          style={{
            width: responsiveWidth(95),
            height: responsiveHeight(34),
            objectFit: "cover",
          }}
          source={{
            uri: "https://ehwmisgwycz.exactdn.com/wp-content/uploads/2020/06/lms-features-1.jpg?strip=all&lossy=1&ssl=1",
          }}
        >
          {/* <Text style={{flex:1,textAlignVertical:'center',textAlign:'center',marginTop:responsiveHeight(8),fontWeight:'600',fontSize:responsiveFontSize(3.6),color:'#C108EE'}}>hii</Text> */}
        </ImageBackground>
      </View>
      <View style={styles.slide3}>
        <ImageBackground
          style={{
            width: responsiveWidth(95),
            height: responsiveHeight(34),
            objectFit: "cover",
          }}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzBUnGNr9N7DbdAdlh1dl_AgdMsOxHO3val5iC_8ArzDxeXEmWs-rKbHf9KNM24TtktME&usqp=CAU",
          }}
        >
          <Text>hii</Text>
        </ImageBackground>
      </View>
    </Swiper>
  );
};
export default Sweper;

const styles = StyleSheet.create({
  wrapper: {
    height: responsiveHeight(30),
    marginTop: responsiveHeight(3),
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
