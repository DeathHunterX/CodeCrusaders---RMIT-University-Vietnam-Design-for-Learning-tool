import React from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
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
  },
  textClo: {
    fontSize: 12,
    textAlign: "justify",
    marginHorizontal: 28,
    marginBottom: 4,
  },
});
const PDFCourse = () => {
  return (
    <Document>
      <Text style={styles.title} fixed>
        Course:
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
      <Text style={styles.subtitle}>CLOs(Course Learning Objecttives):</Text>
      <Text style={styles.textClo}>
        Demonstrate knowledge of basic concepts, syntax and control structures
        in programming.
      </Text>
      <Text style={styles.textClo}>
        Devise solutions to simple computing problems under specific
        requirements.
      </Text>
      <Text style={styles.textClo}>
        Encode the devised solutions into computer programs and test the
        programs on a computer.
      </Text>
      <Text style={styles.textClo}>
        Demonstrate an understanding of standard coding conventions and ethical
        considerations in programming.
      </Text>
    </Document>
  );
};

export default PDFCourse;
