import React from "react";
import PDFFile from "./PDFStructure/PDFFile";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import RightSide from "./RightSide/RightSide";
import { HiDownload } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { BsWindowStack } from "react-icons/bs";

import {IconSetting} from '../../utils/IconSetting'

const Download = () => {
  return (
    <div className="planner_pdf_container">
      <div className="pdf_top_bar">
        <div className="pdf_download_side">
          <PDFDownloadLink document={<PDFFile />} filename={"FORM"} className="download_btn">
            {({ loading }) =>
              loading ? (
                <span>Loading Document...</span>
              ) : (
                <span className="text-center">
                  {IconSetting(<HiDownload />, '#fff', '19px')} Download
                </span>
              )
            }
          </PDFDownloadLink>
        </div>
        <div className="pdf_right_side">
          <button className="me-4"> <BsWindowStack /> </button>
          <button> <AiOutlineClose /></button>
        </div>
      </div>

      <div className="pdf_body_container d-flex">
        <div className="col-md-8 pdf_content_view">
          <PDFViewer showToolbar={false}>
            <PDFFile />
          </PDFViewer>
        </div>

        <div className="col-md-4 pdf_page_info">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Download;
