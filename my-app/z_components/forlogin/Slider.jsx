import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppIntroSlider from "react-native-app-intro-slider";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

const slides = [
  {
    key: 1,
    title: "Title 1",
    text: "Welcome! \n To E-Larning World!",
    image: require("../images/download.jpeg"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Title 2",
    text: "Welcome! \n To E-Larning World!",
    image: require("../images/images.jpeg"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Rocket guy",
    text: "Welcome! \n To E-Larning World!",
    image: require("../images/images (1).png"),
    backgroundColor: "#22bcb5",
  },
];

const Slider = (props) => {
  let Render = ({ item }) => {
    return (
      <View style={{ flex: 1,justifyContent: "start",marginTop:responsiveHeight(23), }}>
        <Text style={{ color: "#000",fontWeight:'700',textAlign:'center',fontSize:responsiveFontSize(3) }}>{item.text}</Text>
        <Image
          style={{
            width: "100%",
            height: responsiveHeight(40),
            objectFit: "contain",
          }}
          source={item?.image}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <AppIntroSlider
        // renderNextButton={renderNextButton}
        style={{ flex: 1 }}
        data={slides}
        renderItem={Render}
        activeDotStyle={{ backgroundColor: "#53A2E8" }}
        bottomButton={true}
        showPrevButton={true}
        dotClickEnabled
        onDone={() => props.navigation.push("/login")}
        renderNextButton={()=><View style={{width:'100%',height:responsiveHeight(6),marginBottom:responsiveHeight(1),backgroundColor:'#0A83E7',borderRadius:responsiveHeight(2.2)}}><Text style={{textAlign:'center',flex:1,textAlignVertical:'center',fontSize:responsiveFontSize(2.6),color:'white',}}>Next</Text></View>}
        renderPrevButton={()=><View style={{width:'100%',height:responsiveHeight(6),backgroundColor:'#E91010',borderRadius:responsiveHeight(2.2)}}><Text style={{textAlign:'center',flex:1,textAlignVertical:'center',fontSize:responsiveFontSize(2.6),color:'white',}}>Prev</Text></View>}
        renderDoneButton={()=><View style={{width:'100%',height:responsiveHeight(6),backgroundColor:'#49C42A',marginBottom:responsiveHeight(1),borderRadius:responsiveHeight(2.2)}}><Text style={{textAlign:'center',flex:1,textAlignVertical:'center',fontSize:responsiveFontSize(2.6),color:'white',}}>Done</Text></View>}
      />
    </SafeAreaView>
  );
};

export default Slider;

// const styles = StyleSheet.create({

// })
