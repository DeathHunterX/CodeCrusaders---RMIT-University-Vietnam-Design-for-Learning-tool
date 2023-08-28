import React from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";

import PDFModule from "./PDFModule";
import parse from "html-react-parser"
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

  const courseCLOs = (
    parse(data.courseCLOs).type === "ul" 
    ? 
    parse(data.courseCLOs).props.children.map((child) => {  
      return child.props.children;
    })
    :
    []
  )
  
  const courseAsg = data?.courseAsg;
  const sortAsg = (courseAsg?.length > 0 ? [...courseAsg].sort((a, b) => a.assignmentNo - b.assignmentNo) : [])

  const moduleLOs = (
    parse(data.courseCLOs).type === "ul" 
    ? 
    parse(data.courseCLOs).props.children.map((child) => {  
      return child.props.children;
    })
    :
    []
  )

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
