import React from "react";
import { Text, Document, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
    paddingTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "left",
    fontWeight: "bold",
    marginHorizontal: 14,
    marginBottom: 6,
  },

  text: {
    fontSize: 12,
    textAlign: "justify",
    marginHorizontal: 22,
  },
});
const PDFAsg = () => {
  return (
    <Document>
      <Text style={styles.title} fixed>
        Assessment Detail:
      </Text>
      <View>
        <Text style={styles.subtitle}>
          Assessment 1:
          <Text style={styles.subtitle}> Turtle Graphics</Text>
        </Text>
        <Text style={styles.subtitle}>
          Date:
          <Text style={styles.subtitle}> 01/12</Text>
          {"-"}
          <Text style={styles.subtitle}> 01/02</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.subtitle}>
          Assessment 1:
          <Text style={styles.subtitle}> Turtle Graphics</Text>
        </Text>
        <Text style={styles.subtitle}>
          Date:
          <Text style={styles.subtitle}> 01/12</Text>
          {"-"}
          <Text style={styles.subtitle}> 01/02</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.subtitle}>
          Assessment 1:
          <Text style={styles.subtitle}> Turtle Graphics</Text>
        </Text>
        <Text style={styles.subtitle}>
          Date:
          <Text style={styles.subtitle}> 01/12</Text>
          {"-"}
          <Text style={styles.subtitle}> 01/02</Text>
        </Text>
      </View>
    </Document>
  );
};

export default PDFAsg;
