import React from "react";
import PDFFile from "./PDFStructure/PDFFile";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import LeftSide from "./LeftSide/LeftSide";
import { HiDownload } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { BsWindowStack } from "react-icons/bs";
const Download = () => {
  return (
    <div className="planner_pdf_container">
      <div className="d-flex pdf_viewer">
        <div className="pdf_viewer_header">
          <PDFDownloadLink document={<PDFFile />} filename={"FORM"}>
            {({ loading }) =>
              loading ? (
                <button className="btn-style">Loading Document...</button>
              ) : (
                <button className="btn-style">
                  <HiDownload /> Download
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
        <div>
          <button className="closeButton">
            <BsWindowStack />
            <span>{"    "}</span>
            <AiOutlineClose />
          </button>
        </div>
      </div>

      <div className="d-flex">
        <div className="col-md-8 pdf_viewer">
          <div className="pdf_viewer_body ">
            <PDFViewer showToolbar={false}>
              <PDFFile />
            </PDFViewer>
          </div>
        </div>

        <div className="col-md-4">
          <LeftSide />
        </div>
      </div>
    </div>
  );
};

export default Download;
