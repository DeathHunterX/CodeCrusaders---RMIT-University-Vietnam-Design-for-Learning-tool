import React from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";

import PDFModule from "./PDFModule";

import PDFAsg from "./PDFAsg";
import PDFCourse from "./PDFCourse";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 18,
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
    fontSize: 12,
    textAlign: "justify",
  },

  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
const PDFFile = ({data}) => {
  const {courseName, courseCode, courseSemester, moduleName, sessionList} = data

  const courseAsg = data?.courseAsg;
  const sortAsg = (courseAsg?.length > 0 ? [...courseAsg].sort((a, b) => a.assignmentNo - b.assignmentNo) : [])

  const HtmlToTextComponent = (item) => {
    const htmlString = item;
  
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
  
    const extractedTextArray = [];
  
    const extractTextFromNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const trimmedText = node.textContent.trim();
        if (trimmedText !== "") {
          extractedTextArray.push(trimmedText);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const childNode of node.childNodes) {
          extractTextFromNode(childNode);
        }
      }
    };
  
    extractTextFromNode(tempDiv);
  
    return extractedTextArray;
  };

  const courseCLOs = HtmlToTextComponent(data.courseCLOs)
  const moduleLOs = HtmlToTextComponent(data.moduleLOs)
  
  

  const courseData = {courseName, courseCode, courseSemester, courseCLOs}
  const moduleData = {moduleName, moduleLOs, sessionList}
  return (
    <Document>
      <Page style={styles.body}>
        <Text />
        <PDFCourse courseData={courseData} />
        <PDFAsg courseAsg={sortAsg}/>
        <PDFModule moduleData={moduleData}/>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PDFFile;
