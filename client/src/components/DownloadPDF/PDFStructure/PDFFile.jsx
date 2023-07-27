import React from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";
import PDFCourse from "./PDFCourse";
import PDFAsg from "./PDFAsg";
import PDFModule from "./PDFModule";

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
const PDFFile = () => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text />
        <PDFCourse />
        <PDFAsg />
        <PDFModule />
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
