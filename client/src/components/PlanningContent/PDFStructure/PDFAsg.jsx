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
const PDFAsg = ({courseAsg}) => {

  return (
    <Document>
      
      <Text style={styles.title} fixed>
        Assessment Detail:
      </Text>
      {
        courseAsg.length > 0 && courseAsg.map((content) => (
          <View key={content.assignmentNo}>
            <Text style={styles.subtitle}>
              Assessment {content.assignmentNo}:
              <Text style={styles.subtitle}> {content.assignmentName}</Text>
            </Text>
            <Text style={styles.subtitle}>
              Date:
              <Text style={styles.subtitle}> {content.startDate}</Text>
              {"-"}
              <Text style={styles.subtitle}> {content.endDate}</Text>
            </Text>
          </View>
        ))
      }
      
    </Document>
  );
};

export default PDFAsg;
