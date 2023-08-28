import React from "react";
import { Text, Document, StyleSheet } from "@react-pdf/renderer";
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
const PDFCourse = ({courseData}) => {
  const {courseName, courseCode, courseSemester, courseCLOs} = courseData


  return (
    <Document>
      <Text style={styles.title} fixed>
        Course:
      </Text>

      <Text style={styles.subtitle}>
        Course code:
        <Text style={styles.text}> {courseCode}</Text>
      </Text>
      <Text style={styles.subtitle}>
        Course name:
        <Text style={styles.text}>
          {" "}
          {courseName}
        </Text>
      </Text>
      <Text style={styles.subtitle}>
        Semester:
        <Text style={styles.text}> {courseSemester}</Text>
      </Text>
      <Text style={styles.subtitle}>CLOs(Course Learning Objectives):</Text>
      {
        courseCLOs.length > 0 && courseCLOs.map((content, idx) => (
          <Text style={styles.textClo} key={idx}>
            {content}
          </Text>
        ))
      }
    </Document>
  );
};

export default PDFCourse;
