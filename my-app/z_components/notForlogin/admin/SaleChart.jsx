// SaleChart.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const SaleChart = () => {
  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        barWidth={30}
        barBorderRadius={4}
        frontColor="#6a51ae"
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    width: "100%",
  },
});

export default SaleChart;
