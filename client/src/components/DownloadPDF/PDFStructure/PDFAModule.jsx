import React from "react";
import { Text, Document, StyleSheet, View } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 8,
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

  table: {
    display: "table", 
    width: "100%", 
  },
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "33%", 
    borderStyle: "solid", 
    // borderWidth: 1, 
    // borderLeftWidth: 0, 
    // borderTopWidth: 0 
  },
  tableCell: { 
    // margin: "auto", 
    marginTop: 5, 
    fontSize: 12
  }
});
const PDFAModule = ({moduleData}) => {
  const {moduleName, moduleLOs, sessionList} = moduleData
  
  let desiredOrder = ['Pre_class', 'In_class', 'Post_class'];

  // Reorder the sessions based on the desired order
  let reorderedSessions = desiredOrder.map(sessionName => {
      const session = sessionList.find(session => session.sessionName === sessionName);
      return session !== undefined ? session : null; // Return null for undefined sessions
  });

  // Remove null values from the reorderedSessions array
  reorderedSessions = reorderedSessions.filter(session => session !== null);


  return (
    <Document>
      <Text style={styles.title}>Module name: {moduleName}</Text>
      <View style={styles.sectionClass}>
        <Text style={styles.subtitle}>LOs:(Learning Objectives)</Text>
        {
          moduleLOs.length > 0 ? moduleLOs.map((content, idx) => (
            <Text style={styles.textClo} key={idx}>
              {content}
            </Text>
          ))
          :
          <Text style={styles.textClo}>
            {moduleLOs}
          </Text>
        }
      </View>
      {
        reorderedSessions.map((sessionContent) => {
          const totalDuration = sessionContent?.activityList.reduce((total, activity) => total + activity.duration, 0);

          return(
          
          <View style={styles.sectionClass} key={sessionContent.id}>
            <Text style={styles.subtitle}>
              {sessionContent.sessionName}:
            </Text>

            <View style={styles.sectionPreClass}>
              <View>
                {/* Info */}
                <Text style={styles.subtitle}>Info: </Text>

                {/* Grouping Type */}
                <Text style={styles.subtitle}>
                  - Grouping Type: {" "}
                  <Text style={styles.subtitle}>{sessionContent.groupingType}</Text>
                </Text>

                {/* F2F/Online/Hybrid */}
                <Text style={styles.subtitle}>
                  - F2F/Online/Hybrid: {" "}
                  <Text style={styles.subtitle}>{sessionContent.sessionOption}</Text>
                </Text>

                {/* Lecture Availability */}
                <Text style={styles.subtitle}>
                  - Lecture Availability: {" "}
                  <Text style={styles.subtitle}>{sessionContent.hasLecturer === true ? "Yes" : "No"}</Text>
                </Text>

                {/* Interaction Type */}
                <Text style={styles.subtitle}>
                  - Interaction Type: {" "}
                  <Text style={styles.subtitle}>{sessionContent.interactionType}</Text>
                </Text>
              </View>
              

              {/* Activities */}
              <View>
                <Text style={styles.subtitle}>
                  Activities:
                  <Text> </Text>
                </Text>

                {/* Activity Card */}
                <View style={styles.table}>
                  {
                    sessionContent.activityList.map(activityContent => ( 
                      <View style={styles.tableRow} key={activityContent.id}>

                        <View style={styles.tableCol}> 
                          <Text style={styles.tableCell}>
                            - {activityContent.activityName}: 
                          </Text>
                        </View>

                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{activityContent.duration} mins</Text>
                        </View>
                        
                        <View style={styles.tableCol}> 
                          <Text style={styles.tableCell}>
                            Type: {" "}
                              {
                                activityContent.activityID === "warm_up"
                                ?
                                activityContent.warmUpOption
                                :
                                activityContent.activityID === "read_watch_listen"
                                ?
                                activityContent.readWatchListenType
                                :
                                activityContent.activityID === "reflect"
                                ?
                                activityContent.reflectionType
                                :
                                activityContent.activityID === "discuss"
                                ?
                                activityContent.groupType
                                :
                                activityContent.activityID === "collaborate"
                                ?
                                activityContent.collaborateType
                                :
                                activityContent.activityID === "access"
                                ?
                                activityContent.accessType
                                :
                                activityContent.breakType   
                              }
                            </Text>
                        </View>
                      </View>
                    
                    ))
                  }
                </View>   
              </View>
            </View>

            
            <View style={styles.text}>
              <Text>
                Total Time:
                <Text> {totalDuration} mins</Text>
              </Text>
            </View>
          </View>
        )})
      }
      
    </Document>
  );
};

export default PDFAModule;
