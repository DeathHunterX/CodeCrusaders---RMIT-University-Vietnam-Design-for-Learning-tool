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
    margin: 12,
    fontSize: 10,
    textAlign: "justify",
  },
});
const PDFCourse = () => {
  return (
    <Document>
      <Text style={styles.title} fixed>
        Course
      </Text>

      <Text style={styles.subtitle}>
        Course code:
        <Text style={styles.text}> ITPD112</Text>
      </Text>
      <Text style={styles.subtitle}>
        Course name:
        <Text style={styles.text}>
          {" "}
          Introduction to Programming Development
        </Text>
      </Text>
      <Text style={styles.subtitle}>
        Semester:
        <Text style={styles.text}> 1</Text>
      </Text>
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
    </Document>
  );
};

export default PDFCourse;
