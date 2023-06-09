import React from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import PDFAModule from "./PDFAModule";
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
  },
  line: {
    width: 495,
    height: 10,
  },
});
const PDFModule = () => {
  return (
    <Document>
      <Text style={styles.title}>Modules</Text>
      <Text style={styles.text}>Class size</Text>

      <PDFAModule />
      <View style={styles.line}></View>
      <PDFAModule />
      <PDFAModule />
    </Document>
  );
};

export default PDFModule;
