import { View, Text } from "react-native";
import React, { useEffect } from "react";
// import { startVideoScreen } from "vdocipher-rn-bridge";
// import { VdoPlayerView } from "vdocipher-rn-bridge";
import axios from "axios";

const embedInfo = { otp: "some-otp", playbackInfo: "some-playbackInfo" };

// in JSX

const CourseDetail = () => {
  useEffect(() => {
    const getvideootp = async () => {
      const res = await axios.post(
        "https://dev.vdocipher.com/api/videos/c23bfa3da419affb824fd1672afa39dd/otp",
        { ttl: 300 },
        {
          headers: {
            Authorization:
              "Apisecret FEGdeJj8OX45qmMB26DYgPpwhebkbI37knVIlqFanLCNPSA550ZDzHtUGMgM4E8Z",
          },
        }
      );
      console.log(res.data);
    };
    getvideootp();
  }, []);

  return (
    <View>
      <Text>This page under process...</Text>
      <Text>404 not found!</Text>
    </View>
  );
};

export default CourseDetail;
