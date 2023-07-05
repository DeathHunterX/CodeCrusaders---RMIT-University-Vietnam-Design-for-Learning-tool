import React from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
    paddingTop: 16,
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
    marginHorizontal: 22,
  },
});
const PDFAsg = () => {
  return (
    <Document>
      <Text style={styles.title} fixed>
        Assessment Detail
      </Text>
      <View>
        <Text style={styles.subtitle}>Assessment 1:</Text>

        <Text style={styles.text}>
          Name:
          <Text style={styles.text}> Turtle Graphics</Text>
        </Text>
        <Text style={styles.text}>
          Date:
          <Text style={styles.text}> 01/12</Text>
          {"-"}
          <Text style={styles.text}> 01/02</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Assessment 1:</Text>

        <Text style={styles.text}>
          Name:
          <Text style={styles.text}> Turtle Graphics</Text>
        </Text>
        <Text style={styles.text}>
          Date:
          <Text style={styles.text}> 01/12</Text>
          {"-"}
          <Text style={styles.text}> 01/02</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Assessment 1:</Text>

        <Text style={styles.text}>
          Name:
          <Text style={styles.text}> Turtle Graphics</Text>
        </Text>
        <Text style={styles.text}>
          Date:
          <Text style={styles.text}> 01/12</Text>
          {"-"}
          <Text style={styles.text}> 01/02</Text>
        </Text>
      </View>
    </Document>
  );
};

export default PDFAsg;
