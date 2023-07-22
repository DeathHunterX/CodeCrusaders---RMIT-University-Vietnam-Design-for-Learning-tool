import React from "react";
import PDFFile from "../DownloadPDF/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

// function changedata(parameter) {
//   if (parameter === 0) {
//     document.getElementById("myorders").style.display = "block";
//   }
// }
const Download = () => {
  return (
    <div>
      <div>
        <PDFDownloadLink document={<PDFFile />} filename={"FORM"}>
          {({ loading }) =>
            loading ? (
              <button className="btn-style">Loading Document...</button>
            ) : (
              <button className="btn-style">Download PDF</button>
            )
          }
        </PDFDownloadLink>
      </div>

      <div id="myorders">
        <PDFViewer>
          <PDFFile />
        </PDFViewer>
      </div>
    </div>
  );
};

export default Download;
