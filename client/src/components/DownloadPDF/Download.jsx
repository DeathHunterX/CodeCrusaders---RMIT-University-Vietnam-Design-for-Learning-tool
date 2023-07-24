import React from "react";
import PDFFile from "./PDFStructure/PDFFile";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";


const Download = () => {
  return (
    <div className="planner_pdf_container">
      <div className="d-flex">
        <div className="col-md-8 pdf_viewer">
          <div className="pdf_viewer_header">
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

          <div className="pdf_viewer_body w-100">
            <PDFViewer showToolbar={false} >
              <PDFFile />
            </PDFViewer>
          </div>
        </div>
        <div className="col-md-4">
          
        </div>
      </div>
    </div>
  );
};

export default Download;
