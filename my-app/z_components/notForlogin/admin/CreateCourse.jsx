import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const CreateCourse = (props) => {
  const [active, setactive] = useState(1);
  const [sectionactive, setsectionactive] = useState([]);
  const [data, setdata] = useState({
    title: "",
    price: "",
    estimateprice: "",
    thumbnail: "",
    coursedetail: "",
    section: "",
    demourl: "",
    coursesource: {
      prerequisites: [""],
      learn: [""],
    },
  });
  const [section, setsection] = useState([
    {
      title: "",
      videoData: [
        {
          title: "",
          url: "",
        },
      ],
    },
  ]);

  const handlePrerequitiesChange = (text, index) => {
    const updatedData = {
      ...data,
      coursesource: {
        ...data.coursesource,
        prerequisites: data.coursesource.prerequisites.map((item, i) => {
          if (i == index) {
            return text;
          } else {
            return item;
          }
        }),
      },
    };
    setdata(updatedData);
  };

  const handleLearnChange = (text, index) => {
    const updatedData = {
      ...data,
      coursesource: {
        ...data.coursesource,
        learn: data.coursesource.learn.map((item, i) => {
          if (i == index) {
            return text;
          } else {
            return item;
          }
        }),
      },
    };
    setdata(updatedData);
  };

  const handleSectionOpen = (i) => {
    if (sectionactive.includes(i)) {
      const updateactive = sectionactive.filter((active) => active !== i);

      setsectionactive(updateactive);
    } else {
      const updateactive = [...sectionactive, i];

      setsectionactive(updateactive);
    }
  };

  const addVideDataToSection = (index) => {
    if (
      !section[index].videoData[section[index].videoData.length - 1].title ||
      !section[index].videoData[section[index].videoData.length - 1].url
    ) {
      return alert("please fill all the video data in the section");
    } else {
      const updatedSection = section.map((sec, i) => {
        if (index == i) {
          return {
            ...sec,
            videoData: [
              ...sec.videoData,
              {
                title: "",
                url: "",
              },
            ],
          };
        } else {
          return sec;
        }
      });
      setsection(updatedSection);
    }
  };

  const handleSectionTitleChange = (text, index) => {
    const updatedSection = section.map((item, i) => {
      if (index !== i) {
        return item;
      } else {
        return {
          ...item,
          title: text,
        };
      }
    });
    setsection(updatedSection);
  };

  const handleVideourlChange = (text, sindex, vindex) => {
    const updatedsection = section.map((item, i) => {
      if (i !== sindex) return item;
      else {
        return {
          ...item,
          videoData: item.videoData.map((vd, vi) => {
            if (vi !== vindex) return vd;
            else
              return {
                ...vd,
                url: text,
              };
          }),
        };
      }
    });
    setsection(updatedsection);
  };
  const handleVideoTitleChange = (text, sindex, vindex) => {
    const updatedsection = section.map((item, i) => {
      if (i !== sindex) return item;
      else {
        return {
          ...item,
          videoData: item.videoData.map((vd, vi) => {
            if (vi !== vindex) return vd;
            else
              return {
                ...vd,
                title: text,
              };
          }),
        };
      }
    });
    setsection(updatedsection);
  };

  const handleNext = () => {
    const {
      title,
      thumbnail,
      price,
      estimateprice,
      coursedetail,
      section,
      demourl,
      coursesource,
    } = data;

    // Check for empty fields
    if (
      !title ||
      !price ||
      !estimateprice ||
      !thumbnail ||
      !coursedetail ||
      !demourl
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Check for empty values in prerequisites and learn arrays
    const { prerequisites, learn } = coursesource;

    if (!prerequisites[prerequisites.length - 1]) {
      alert("Please fill in all prerequisites.");
      return;
    }

    if (!learn[learn.length - 1]) {
      alert("Please fill in all learn fields.");
      return;
    }

    setactive(2);
  };

  const handleaddSection = () => {
    // Check the section array's last object for empty fields
    const lastSection = section[section.length - 1];
    if (!lastSection.title) {
      alert("Please fill in the section title.");
      return;
    }

    // Check the videoData array's last object for empty fields
    const lastVideoData =
      lastSection.videoData[lastSection.videoData.length - 1];
    if (!lastVideoData.title || !lastVideoData.url) {
      alert("Please fill in all video data fields.");
      return;
    }

    const updatedSection = [
      ...section,
      {
        title: "",
        videoData: [
          {
            title: "",
            url: "",
          },
        ],
      },
    ];
    setsection(updatedSection);
  };

  const handleCreateCourse = async () => {
    // Destructure data fields
    const {
      title,
      thumbnail,
      price,
      estimateprice,
      coursedetail,
      demourl,
      coursesource,
    } = data;

    // Check for empty fields in the data object
    if (
      !title ||
      !price ||
      !thumbnail ||
      !estimateprice ||
      !coursedetail ||
      !demourl
    ) {
      alert("Please fill in all course fields.");
      return;
    }

    // Check for empty values in prerequisites and learn arrays
    const { prerequisites, learn } = coursesource;
    for (let i = 0; i < prerequisites.length; i++) {
      if (!prerequisites[i]) {
        alert("Please fill in all prerequisites.");
        return;
      }
    }
    for (let i = 0; i < learn.length; i++) {
      if (!learn[i]) {
        alert("Please fill in all learn fields.");
        return;
      }
    }

    // Check for empty fields in each section object and their videoData arrays
    for (let i = 0; i < section.length; i++) {
      if (!section[i].title) {
        alert("Please fill in all section titles.");
        return;
      }

      for (let j = 0; j < section[i].videoData.length; j++) {
        if (!section[i].videoData[j].title || !section[i].videoData[j].url) {
          alert("Please fill in all video data fields.");
          return;
        }
      }
    }

    try {
      const token = await AsyncStorage.getItem("Token");

      const res = await axios.post(
        "http://192.168.169.216:8000/create-course",
        {
          ...data,
          section,
          coursesources: data.coursesource,
        },
        { headers: { Authorization: token } }
      );
      alert(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <LinearGradient
          colors={["#CDCFD9", "#CDCFD9", "#CDCFD9"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            flex: 1,
            minHeight: responsiveHeight(100),
          }}
        >
          <View style={{ alignItems: "center", flex: 1 }}>
            {/* header */}
            <View
              style={{
                backgroundColor: "#1C1CCE",
                width: "100%",
                borderBottomRightRadius: responsiveWidth(5),
                borderBottomLeftRadius: responsiveWidth(5),
                alignItems: "center",
              }}
            >
              <View style={{ width: "100%" }}>
                <AntDesign
                  onPress={() => props.navigation.goBack()}
                  name="leftcircle"
                  size={responsiveFontSize(3.4)}
                  style={{
                    marginLeft: responsiveWidth(4),
                    marginTop: responsiveHeight(3.4),
                  }}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    paddingLeft: responsiveWidth(4),
                    paddingTop: responsiveHeight(1.5),
                    fontWeight: "700",
                    fontSize: responsiveFontSize(2.3),
                  }}
                >
                  Create Course
                </Text>
              </View>

              <View
                style={{
                  width: "90%",
                  marginTop: responsiveHeight(1),
                  height: responsiveHeight(3.5),
                  borderTopLeftRadius: responsiveHeight(1.4),
                  borderTopRightRadius: responsiveHeight(1.4),
                  backgroundColor: "#fff",
                }}
              ></View>
            </View>
            <View
              style={{
                width: "90%",
                // minHeight: responsiveHeight(80),
              }}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  // minHeight: responsiveHeight(80),
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "95%",
                    backgroundColor: "white",
                    paddingBottom: responsiveHeight(4),
                    // 1C1CCE
                    borderRadius: responsiveWidth(2),
                  }}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  {active == 1 && (
                    <>
                      {/* sections container  */}

                      <View style={{ backgroundColor: "#1C1CCE", flex: 1 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            height: responsiveWidth(10),
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                            padding: 5,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                marginLeft: responsiveWidth(3),
                                fontSize: responsiveFontSize(2),
                                fontWeight: "700",
                                marginTop: responsiveHeight(0.3),
                              }}
                            >
                              DETAIL PAGE
                            </Text>
                          </View>
                          <Feather
                            name="chevron-right"
                            size={responsiveFontSize(3)}
                            color="white"
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: "center",
                            marginBottom: responsiveHeight(3),
                            padding: 12,
                          }}
                        >
                          {/* title */}
                          <View
                            style={{
                              width: "100%",
                              height: responsiveWidth(13),
                              borderWidth: 1,
                              backgroundColor: "white",
                              position: "relative",
                              justifyContent: "center",
                              padding: responsiveWidth(3),
                              borderRadius: responsiveWidth(3),
                            }}
                          >
                            <Text style={{ fontWeight: "600" }}>Title</Text>
                            <TextInput
                              onChangeText={(text) => {
                                const updateddata = {
                                  ...data,
                                  title: text,
                                };
                                setdata(updateddata);
                              }}
                              placeholder="Enter Course Title..."
                            />
                          </View>
                          {/* thumb nail */}
                          <View
                            style={{
                              width: "100%",
                              marginTop: responsiveHeight(1),
                              height: responsiveWidth(13),
                              borderWidth: 1,
                              backgroundColor: "white",
                              position: "relative",
                              justifyContent: "center",
                              padding: responsiveWidth(3),
                              borderRadius: responsiveWidth(3),
                            }}
                          >
                            <Text style={{ fontWeight: "600" }}>Thumbnail</Text>
                            <TextInput
                              onChangeText={(text) => {
                                const updateddata = {
                                  ...data,
                                  thumbnail: text,
                                };
                                setdata(updateddata);
                              }}
                              placeholder="Enter Thumbnail url..."
                            />
                          </View>
                          {/* estimated price */}
                          <View
                            style={{
                              width: "100%",
                              height: responsiveWidth(13),
                              borderWidth: 1,
                              backgroundColor: "white",
                              position: "relative",
                              justifyContent: "center",
                              padding: responsiveWidth(3),
                              borderRadius: responsiveWidth(3),
                              marginTop: responsiveHeight(1),
                            }}
                          >
                            <Text style={{ fontWeight: "600" }}>
                              Estimate price
                            </Text>
                            <TextInput
                              onChangeText={(text) => {
                                const updateddata = {
                                  ...data,
                                  estimateprice: text,
                                };
                                setdata(updateddata);
                              }}
                              keyboardType="numeric"
                              placeholder="Enter estimate price..."
                            />
                          </View>
                          {/*  price */}
                          <View
                            style={{
                              width: "100%",
                              height: responsiveWidth(13),
                              borderWidth: 1,
                              backgroundColor: "white",
                              position: "relative",
                              justifyContent: "center",
                              padding: responsiveWidth(3),
                              borderRadius: responsiveWidth(3),
                              marginTop: responsiveHeight(1),
                            }}
                          >
                            <Text style={{ fontWeight: "600" }}> Price</Text>
                            <TextInput
                              onChangeText={(text) => {
                                const updateddata = {
                                  ...data,
                                  price: text,
                                };
                                setdata(updateddata);
                              }}
                              keyboardType="numeric"
                              placeholder="Enter price..."
                            />
                          </View>
                          {/*  course detail */}
                          <View
                            style={{
                              width: "100%",
                              // height: responsiveWidth(13),
                              borderWidth: 1,
                              backgroundColor: "white",
                              position: "relative",
                              justifyContent: "center",
                              padding: responsiveWidth(3),
                              borderRadius: responsiveWidth(3),
                              marginTop: responsiveHeight(1),
                            }}
                          >
                            <Text style={{ fontWeight: "600" }}>
                              {" "}
                              Course details
                            </Text>
                            <TextInput
                              onChangeText={(text) => {
                                const updateddata = {
                                  ...data,
                                  coursedetail: text,
                                };
                                setdata(updateddata);
                              }}
                              style={{
                                textAlign: "left",
                                textAlignVertical: "top",
                              }}
                              multiline
                              numberOfLines={5}
                              placeholder="Enter course details.."
                            />
                          </View>
                          {/*  demo url */}
                          <View
                            style={{
                              width: "100%",
                              height: responsiveWidth(13),
                              borderWidth: 1,
                              backgroundColor: "white",
                              position: "relative",
                              justifyContent: "center",
                              padding: responsiveWidth(3),
                              borderRadius: responsiveWidth(3),
                              marginTop: responsiveHeight(1),
                            }}
                          >
                            <Text style={{ fontWeight: "600" }}> Demo url</Text>
                            <TextInput
                              onChangeText={(text) => {
                                const updateddata = {
                                  ...data,
                                  demourl: text,
                                };
                                setdata(updateddata);
                              }}
                              placeholder="Enter demo url..."
                            />
                          </View>
                          {/* PREQUISITES */}
                          <View
                            style={{
                              marginTop: responsiveHeight(1),
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: responsiveFontSize(2.1),
                                fontWeight: "600",
                              }}
                            >
                              Prerequisites
                            </Text>
                            <Ionicons
                              onPress={() => {
                                if (
                                  !data.coursesource.prerequisites[
                                    data.coursesource.prerequisites.length - 1
                                  ]
                                ) {
                                  alert(
                                    "please fill all fields of prerequisites"
                                  );
                                } else {
                                  const updatedata = {
                                    ...data,
                                    coursesource: {
                                      ...data.coursesource,
                                      prerequisites: [
                                        ...data.coursesource.prerequisites,
                                        "",
                                      ],
                                    },
                                  };
                                  setdata(updatedata);
                                }
                              }}
                              name="add"
                              size={responsiveFontSize(3)}
                              color="white"
                            />
                          </View>
                          {data.coursesource.prerequisites.map((item, i) => (
                            <View
                              key={i}
                              style={{
                                width: "100%",
                                height: responsiveWidth(13),
                                borderWidth: 1,
                                backgroundColor: "white",
                                position: "relative",
                                justifyContent: "center",
                                padding: responsiveWidth(3),
                                borderRadius: responsiveWidth(3),
                                marginTop: responsiveHeight(1),
                              }}
                            >
                              <Text style={{ fontWeight: "600" }}>
                                Prerequisites
                              </Text>
                              <TextInput
                                onChangeText={(text) =>
                                  handlePrerequitiesChange(text, i)
                                }
                                placeholder="Enter prerequisites..."
                              />
                            </View>
                          ))}
                          {/* Learn */}
                          <View
                            style={{
                              marginTop: responsiveHeight(1),
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: responsiveFontSize(2.1),
                                fontWeight: "600",
                              }}
                            >
                              What you learn from this course
                            </Text>
                            <Ionicons
                              onPress={() => {
                                if (
                                  !data.coursesource.learn[
                                    data.coursesource.learn.length - 1
                                  ]
                                ) {
                                  alert("please fill all fields of learnings");
                                } else {
                                  const updatedata = {
                                    ...data,
                                    coursesource: {
                                      ...data.coursesource,
                                      learn: [...data.coursesource.learn, ""],
                                    },
                                  };
                                  setdata(updatedata);
                                }
                              }}
                              name="add"
                              size={responsiveFontSize(3)}
                              color="white"
                            />
                          </View>
                          {data.coursesource.learn.map((item, i) => (
                            <View
                              key={i}
                              style={{
                                width: "100%",
                                height: responsiveWidth(13),
                                borderWidth: 1,
                                backgroundColor: "white",
                                position: "relative",
                                justifyContent: "center",
                                padding: responsiveWidth(3),
                                borderRadius: responsiveWidth(3),
                                marginTop: responsiveHeight(1),
                              }}
                            >
                              <Text style={{ fontWeight: "600" }}>
                                What you learn from this course
                              </Text>
                              <TextInput
                                onChangeText={(text) =>
                                  handleLearnChange(text, i)
                                }
                                placeholder="Enter what you learn..."
                              />
                            </View>
                          ))}
                        </View>
                        <View
                          style={{
                            paddingBottom: responsiveHeight(5),
                          }}
                        >
                          <Button
                            onPress={handleNext}
                            title="Next"
                            color={"purple"}
                          ></Button>
                        </View>
                      </View>
                    </>
                  )}
                  {active == 2 && (
                    <>
                      <View
                        style={{
                          backgroundColor: "#1C1CCE",
                          flex: 1,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            height: responsiveWidth(10),
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                            padding: 5,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                marginLeft: responsiveWidth(3),
                                fontSize: responsiveFontSize(2),
                                fontWeight: "700",
                                marginTop: responsiveHeight(0.3),
                              }}
                            >
                              COURSE PAGE
                            </Text>
                          </View>
                          <Feather
                            name="chevron-right"
                            size={responsiveFontSize(3)}
                            color="white"
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          width: "100%",
                          marginTop: responsiveHeight(2),
                        }}
                      >
                        <TouchableOpacity
                          onPress={handleaddSection}
                          style={{
                            marginLeft: "auto",
                            marginRight: responsiveWidth(2),
                            backgroundColor: "#E71B77",
                            padding: responsiveFontSize(1.5),
                            paddingLeft: responsiveFontSize(2),
                            paddingRight: responsiveFontSize(2),
                            borderRadius: responsiveWidth(4),
                          }}
                        >
                          <Text
                            style={{
                              fontSize: responsiveFontSize(2),
                              fontWeight: "600",
                              color: "#fff",
                            }}
                          >
                            + Add Section
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {section.map((sec, i) => (
                        <View
                          key={i}
                          style={{
                            backgroundColor: "#1C1CCE",
                            flex: 1,
                            marginTop: responsiveHeight(2),
                            height: sectionactive.includes(i + 1)
                              ? null
                              : responsiveHeight(5.5),
                            marginBottom: responsiveHeight(3),
                            paddingBottom: responsiveHeight(3),
                            alignItems: "center",
                            overflow: "hidden",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => handleSectionOpen(i + 1)}
                            style={{
                              flexDirection: "row",
                              height: responsiveWidth(10),
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 8,
                              padding: 5,
                              width: "100%",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  marginLeft: responsiveWidth(3),
                                  fontSize: responsiveFontSize(2),
                                  fontWeight: "700",
                                  marginTop: responsiveHeight(0.3),
                                }}
                              >
                                SECTION {i + 1}
                              </Text>
                            </View>
                            <Feather
                              name="chevron-right"
                              size={responsiveFontSize(3)}
                              color="white"
                            />
                          </TouchableOpacity>
                          {/*section title */}
                          <View
                            style={{
                              width: "90%",
                              height: responsiveWidth(13),
                              borderWidth: 1,
                              backgroundColor: "white",
                              position: "relative",
                              justifyContent: "center",
                              padding: responsiveWidth(3),
                              borderRadius: responsiveWidth(3),
                              marginTop: responsiveHeight(2),
                            }}
                          >
                            <Text style={{ fontWeight: "600" }}>
                              Section Title
                            </Text>
                            <TextInput
                              onChangeText={(text) =>
                                handleSectionTitleChange(text, i)
                              }
                              placeholder="Enter Section Title..."
                            />
                          </View>
                          {/* heading of videoData and + icon */}
                          <TouchableOpacity
                            onPress={() => addVideDataToSection(i)}
                            style={{
                              marginTop: responsiveHeight(2),
                              marginBottom: responsiveHeight(1),
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: responsiveFontSize(2.1),
                                fontWeight: "600",
                                justifyContent: "space-between",
                                width: "82%",
                              }}
                            >
                              Video Data
                            </Text>
                            <Ionicons
                              name="add"
                              size={responsiveFontSize(3.5)}
                              color="white"
                            />
                          </TouchableOpacity>
                          {/* videData */}
                          {sec.videoData.map((item, j) => (
                            <>
                              <Text
                                key={j}
                                style={{
                                  width: "90%",
                                  color: "#F3519A",
                                  fontSize: responsiveFontSize(2),
                                  fontWeight: "600",
                                }}
                              >
                                Video {j + 1}
                              </Text>
                              {/* video title input */}
                              <View
                                style={{
                                  width: "90%",
                                  height: responsiveWidth(13),
                                  borderWidth: 1,
                                  backgroundColor: "white",
                                  position: "relative",
                                  justifyContent: "center",
                                  padding: responsiveWidth(3),
                                  borderRadius: responsiveWidth(3),
                                  marginTop: responsiveHeight(1),
                                }}
                              >
                                <Text style={{ fontWeight: "600" }}>
                                  Video Title
                                </Text>
                                <TextInput
                                  onChangeText={(text) =>
                                    handleVideoTitleChange(text, i, j)
                                  }
                                  placeholder="Enter Video Title..."
                                />
                              </View>
                              {/* video url input */}
                              <View
                                style={{
                                  width: "90%",
                                  height: responsiveWidth(13),
                                  borderWidth: 1,
                                  backgroundColor: "white",
                                  position: "relative",
                                  justifyContent: "center",
                                  padding: responsiveWidth(3),
                                  borderRadius: responsiveWidth(3),
                                  marginTop: responsiveHeight(1),
                                }}
                              >
                                <Text style={{ fontWeight: "600" }}>
                                  Video url
                                </Text>
                                <TextInput
                                  onChangeText={(text) =>
                                    handleVideourlChange(text, i, j)
                                  }
                                  placeholder="Enter Video url..."
                                />
                              </View>
                            </>
                          ))}
                        </View>
                      ))}
                      <Button
                        onPress={handleCreateCourse}
                        title="Create"
                      ></Button>
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CreateCourse;
