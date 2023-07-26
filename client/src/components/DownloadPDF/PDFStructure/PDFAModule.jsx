import React from "react";
import { Text, Document, StyleSheet, View } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 8,
  },
  section: {
    marginHorizontal: 52,
  },
  sectionPreClass: {
    marginHorizontal: 54,
  },

  subtitle: {
    fontSize: 12,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    textAlign: "right",
  },
  textActivities: {
    fontSize: 12,
    textAlign: "justify",
    marginHorizontal: 20,
  },
  textClo: {
    fontSize: 12,
    textAlign: "justify",
    marginHorizontal: 28,
    marginBottom: 4,
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 12,
  },
  leftColumn: {
    flexDirection: "column",
    flexGrow: 6,
    alignItems: "left",
  },
  // centerColumn: {
  //   flexDirection: "column",
  //   flexGrow: 4,
  //   alignItems: "center",
  // },
  rightColumn: {
    flexDirection: "column",
    flexGrow: 6,
    alignItems: "left",
  },
  activityType: {
    paddingTop: 6,
  },
  activityText: {
    padding: 2,
    fontSize: 10,
  },
  sectionClass: {
    marginBottom: 24,
  },
});
const PDFAModule = () => {
  return (
    <Document>
      <Text style={styles.title}>Module 1</Text>
      <View style={styles.sectionClass}>
        <Text style={styles.subtitle}>LOs:(Learning Objectives)</Text>
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
          Demonstrate an understanding of standard coding conventions and
          ethical considerations in programming.
        </Text>
      </View>
      <View style={styles.sectionClass}>
        <Text style={styles.subtitle}>
          Pre-class:
          <Text> </Text>
          <Text style={styles.subtitle}>
            Grouping:
            <Text style={styles.subtitle}>17 Group</Text>
          </Text>
        </Text>
        <View style={styles.sectionPreClass}>
          <Text style={styles.subtitle}>
            F2F/Obline/hybrid:
            <Text style={styles.subtitle}>Face Two Face</Text>
          </Text>
          <Text style={styles.subtitle}>
            Async/Sync:
            <Text style={styles.subtitle}>Async</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            Activities:
            <Text> </Text>
            <Text style={styles.subtitle}>
              Read, watch, listen:
              <Text style={styles.subtitle}>10 mins</Text>
            </Text>
          </Text>
          <View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Collaboration:
                  <Text>{"          "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Collaboration type:{" "}
                  <Text style={styles.textActivities}>Collaboration type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Reflection:
                  <Text>{"               "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Reflection type:{" "}
                  <Text style={styles.textActivities}>Reflection type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Assess:
                  <Text>{"                   "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Assess type:{" "}
                  <Text style={styles.textActivities}>Assess type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Discussion:
                  <Text>{"              "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.subtitle}>
                  Discussion type:{" "}
                  <Text style={styles.textActivities}>Discussion type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Break:
                  <Text>{"                      "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Warm up:
                  <Text>{"                 "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Warm up option:{" "}
                  <Text style={styles.textActivities}>Warm up</Text>
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.text}>
          <Text>
            Total Time:
            <Text> 60 mins</Text>
          </Text>
        </View>
      </View>

      <View style={styles.sectionClass}>
        <Text style={styles.subtitle}>
          In-class:
          <Text> </Text>
          <Text style={styles.subtitle}>
            Grouping:
            <Text style={styles.subtitle}>17 Group</Text>
          </Text>
        </Text>
        <View style={styles.sectionPreClass}>
          <Text style={styles.subtitle}>
            F2F/Obline/hybrid:
            <Text style={styles.subtitle}>Face Two Face</Text>
          </Text>
          <Text style={styles.subtitle}>
            Async/Sync:
            <Text style={styles.subtitle}>Async</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            Activities:
            <Text> </Text>
            <Text style={styles.subtitle}>
              Read, watch, listen:
              <Text style={styles.subtitle}>10 mins</Text>
            </Text>
          </Text>
          <View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Collaboration:
                  <Text>{"          "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Collaboration type:{" "}
                  <Text style={styles.textActivities}>Collaboration type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Reflection:
                  <Text>{"               "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Reflection type:{" "}
                  <Text style={styles.textActivities}>Reflection type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Assess:
                  <Text>{"                   "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Assess type:{" "}
                  <Text style={styles.textActivities}>Assess type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Discussion:
                  <Text>{"              "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.subtitle}>
                  Discussion type:{" "}
                  <Text style={styles.textActivities}>Discussion type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Break:
                  <Text>{"                      "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Warm up:
                  <Text>{"                 "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Warm up option:{" "}
                  <Text style={styles.textActivities}>Warm up</Text>
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.text}>
          <Text>
            Total Time:
            <Text> 60 mins</Text>
          </Text>
        </View>
      </View>
      <View style={styles.sectionClass}>
        <Text style={styles.subtitle}>
          Post-class:
          <Text> </Text>
          <Text style={styles.subtitle}>
            Grouping:
            <Text style={styles.subtitle}>17 Group</Text>
          </Text>
        </Text>
        <View style={styles.sectionPreClass}>
          <Text style={styles.subtitle}>
            F2F/Obline/hybrid:
            <Text style={styles.subtitle}>Face Two Face</Text>
          </Text>
          <Text style={styles.subtitle}>
            Async/Sync:
            <Text style={styles.subtitle}>Async</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            Activities:
            <Text> </Text>
            <Text style={styles.subtitle}>
              Read, watch, listen:
              <Text style={styles.subtitle}>10 mins</Text>
            </Text>
          </Text>
          <View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Collaboration:
                  <Text>{"          "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Collaboration type:{" "}
                  <Text style={styles.textActivities}>Collaboration type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Reflection:
                  <Text>{"               "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Reflection type:{" "}
                  <Text style={styles.textActivities}>Reflection type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Assess:
                  <Text>{"                   "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Assess type:{" "}
                  <Text style={styles.textActivities}>Assess type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Discussion:
                  <Text>{"              "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.subtitle}>
                  Discussion type:{" "}
                  <Text style={styles.textActivities}>Discussion type</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Break:
                  <Text>{"                      "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                <Text style={styles.subtitle}>
                  Warm up:
                  <Text>{"                 "}</Text>
                  <Text style={styles.textActivities}>10 mins</Text>
                </Text>
                <Text>{"      "}</Text>
                <Text style={styles.text}>
                  Warm up option:{" "}
                  <Text style={styles.textActivities}>Warm up</Text>
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.text}>
          <Text>
            Total Time:
            <Text> 60 mins</Text>
          </Text>
        </View>
      </View>

      {/* <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.subtitle}>Pre-Class</Text>
          <Text style={styles.text}>
            <Text>Grouping: </Text>
            <Text>F2F/online:</Text>
            <Text>Async/Sync:</Text>
          </Text>
          <View style={styles.activityType}>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
          </View>
          <Text style={styles.text}> Total: {"75mins"}</Text>
        </View>
        <View style={styles.centerColumn}>
          <Text style={styles.subtitle}>In-Class</Text>
          <Text style={styles.text}>
            <Text>Grouping: </Text>
            <Text>F2F/online:</Text>
            <Text>Async/Sync:</Text>
          </Text>
          <View style={styles.activityType}>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
          </View>
          <Text style={styles.text}> Total: {"75mins"}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.subtitle}>Post-Class</Text>
          <Text style={styles.text}>
            <Text>Grouping: </Text>
            <Text>F2F/online:</Text>
            <Text>Async/Sync:</Text>
          </Text>
          <View style={styles.activityType}>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
            <Text style={styles.activityText}>
              Read,Watch, Listen: <Text>15mins</Text>
            </Text>
          </View>
          <Text style={styles.text}> Total: {"75mins"}</Text>
        </View>
      </View> */}
    </Document>
  );
};

export default PDFAModule;
