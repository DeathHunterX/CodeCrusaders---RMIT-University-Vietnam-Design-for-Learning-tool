import {toast} from "react-toastify"
import clipboardCopy from "clipboard-copy"
const HTMLGenerator = ({data}) => {
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

    const courseCLOs = HtmlToTextComponent(data?.courseCLOs)
    const moduleLOs = HtmlToTextComponent(data?.moduleLOs)

    const courseAsg = data?.courseAsg;

    const sortAsg = (courseAsg.length > 0 ? [...courseAsg].sort((a, b) => a.assignmentNo - b.assignmentNo) : [])

    let desiredOrder = ['Pre_class', 'In_class', 'Post_class'];

    // Reorder the sessions based on the desired order
    let reorderedSessions = desiredOrder.map(sessionName => {
        const session = data?.sessionList.find(session => session.sessionName === sessionName);
        return session !== undefined ? session : null; // Return null for undefined sessions
    });

    // Remove null values from the reorderedSessions array
    reorderedSessions = reorderedSessions.filter(session => session !== null);

    const HTMLCourse = `
        <h3>Course:</h3>
        <p>Course code: ${data?.courseCode}</p>
        <p>Course name: ${data?.courseName}</p>
        <p>Semester: ${data?.courseSemester}</p>
      
        <p>CLOs (Course Learning Objectives)</p>
        ${
            courseCLOs.length > 0 
            &&
            `
            <ul>
            ${courseCLOs.map((content) => (    
                `<li>${content}</li>`
            ))}
            </ul>
            `
        }
        <br>
        <h3>Assessments Details</h3>
        <ul>
            ${
                sortAsg.length > 0 && sortAsg.map((content) => (
                    `
                    <li>
                        <p>Assessment ${content.assignmentNo}: ${content.assignmentName}</p>
                        <p>Date: ${content.startDate} - ${content.endDate}</p>
                    </li> 
                    `
                ))
            }
        </ul>
        
        <h3>Modules</h3>
        <h5>Module name: ${data?.moduleName}</h5>
        <h5>LOs:(Learning Objectives)</h5>
        ${
            moduleLOs.length > 0 
            ?
            `
            <ul>
            ${moduleLOs.map((content) => (    
                `<li>${content}</li>`
            ))}
            </ul>
            `
            :
            `<p></p>` 
        }

        ${
            reorderedSessions.length > 0 && reorderedSessions.map((sessionContent) => {
                const totalDuration = sessionContent?.activityList.reduce((total, activity) => total + activity.duration, 0);
                return (
                    `
                    <h5>${sessionContent.sessionName.replace(/_/g, ' ')}:</h5>
                    <ul>
                        <li>
                            <p>Info: </p>
                            <p>- Grouping Type: ${sessionContent.groupingType} </p>
                            <p>- F2F/Online/Hybrid: ${sessionContent.sessionOption} </p>
                            <p>- Lecture Availability: ${sessionContent.hasLecturer === true ? "Yes" : "No"} </p>
                            <p>- Interaction Type: ${sessionContent.interactionType} </p>
                        </li>

                        <li>
                            <p>Activities: </p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Activity name</th>
                                        <th>Duration</th>
                                        <th>Activity type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${
                                        sessionContent?.activityList.map((activityContent) => (
                                            `
                                            <tr>
                                                <td>${activityContent.activityName}</td>
                                                <td>${activityContent.duration} mins</td>
                                                <td>
                                                    ${
                                                        
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
                                                </td>
                                            </tr>
                                            `
                                        ))
                                    }
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>Total time: ${totalDuration} mins</td>
                                    </tr>
                                </tfoot>     
                            </table>
                        </li>
                    </ul>
                    `
                )
            })
        }
    `
    const generateAndCopyHTML = () => {
       
        const cleanedHTML = HTMLCourse
        .replace(/,\s*</g, '<') // Remove comma before opening tag
        .replace(/>\s*,/g, '>') // Remove comma after closing tag
        .replace(/,\s*/g, ',') // Remove spaces after commas
        .replace(/\s*,/g, ',') // Remove spaces before commas

        clipboardCopy(cleanedHTML)
            .then(() => {
                toast.success("Copy HTML code successfully");
            })
            .catch(() => {
                toast.error("There was an error while generating HTML code");
            });
        
    };
    

    
  return (
    <button className="btn me-4" style={{cursor: "pointer"}} onClick={generateAndCopyHTML}> Export into HTML code </button>
  )
}

export default HTMLGenerator