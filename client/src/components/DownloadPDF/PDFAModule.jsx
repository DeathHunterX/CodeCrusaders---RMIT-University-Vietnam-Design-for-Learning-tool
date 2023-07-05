import React from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "left",
    fontWeight: "bold",
    marginHorizontal: 14,
  },
  text: {
    fontSize: 10,
    textAlign: "justify",
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 12,
  },
  leftColumn: {
    flexDirection: "column",
    flexGrow: 4,
    alignItems: "center",
  },
  centerColumn: {
    flexDirection: "column",
    flexGrow: 4,
    alignItems: "center",
  },
  rightColumn: {
    flexDirection: "column",
    flexGrow: 4,
    alignItems: "center",
  },
  activityType: {
    paddingTop: 6,
  },
  activityText: {
    padding: 2,
    fontSize: 10,
  },
});
const PDFAModule = () => {
  return (
    <Document>
      <Text style={styles.subtitle}>Module 1</Text>
      <Text style={styles.subtitle}>
        CLOs:
        <Text style={styles.text}>
          {" "}
          Demonstrate knowledge of basic concepts, syntax and control structures
          in programming. Devise solutions to simple computing problems under
          specific requirements. Encode the devised solutions into computer
          programs and test the programs on a computer. Demonstrate an
          understanding of standard coding conventions and ethical
          considerations in programming.
        </Text>
      </Text>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.subtitle}>Pre-Class</Text>
          <Text style={styles.text}>
            <Text>Grouping: </Text>
            <Text>F2F/online:</Text>
            <Text>Async/Sync:</Text>
          </Text>
          <View style={styles.activityType}>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
          </View>
          <Text style={styles.text}> Total: {"75mins"}</Text>
        </View>
        <View style={styles.centerColumn}>
          <Text style={styles.subtitle}>In-Class</Text>
          <Text style={styles.text}>
            <Text>Grouping: </Text>
            <Text>F2F/online:</Text>
            <Text>Async/Sync:</Text>
          </Text>
          <View style={styles.activityType}>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
          </View>
          <Text style={styles.text}> Total: {"75mins"}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.subtitle}>Post-Class</Text>
          <Text style={styles.text}>
            <Text>Grouping: </Text>
            <Text>F2F/online:</Text>
            <Text>Async/Sync:</Text>
          </Text>
          <View style={styles.activityType}>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
          </View>
          <Text style={styles.text}> Total: {"75mins"}</Text>
        </View>
      </View>
    </Document>
  );
};

export default PDFAModule;
