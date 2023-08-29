import React from "react";
import { Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import PDFAModule from "./PDFAModule";
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
    marginBottom: 8,
  },
  text: {
    fontSize: 10,
    textAlign: "justify",
  },
  line: {
    width: 495,
    height: 10,
  },
});
const PDFModule = ({moduleData}) => {
  return (
    <Document>
      <Text style={styles.title}>Modules</Text>

      <PDFAModule moduleData={moduleData}/>

      <View style={styles.line}></View>
      {/* <PDFAModule />
      <PDFAModule /> */}
    </Document>
  );
};

export default PDFModule;
