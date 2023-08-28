import React, { useEffect, useState } from "react";
import PDFFile from "./PDFStructure/PDFFile";
import RightSide from "./RightSide/RightSide";

import { HiDownload } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { BsWindowStack } from "react-icons/bs";
import {IconSetting} from '../../utils/IconSetting'

import { useSelector} from "react-redux";

import { PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";


const Download = () => {
  const {sharingData} = useSelector(state => state.sharing)

  const initialState = {
    // Course
    courseName: "",
    courseCode: "",
    courseSemester: "",
    courseCLOs: "",
    courseAsg: [],

    // Module
    moduleName: "",
    moduleLOs: "",
    sessionList: []
  }

  const [pdfData, setPDFData] = useState(initialState)

  useEffect(() => {
    setPDFData(prevData => ({
      ...prevData,
      // Course Data
      courseName: sharingData.courseName ? sharingData.courseName : "",
      courseCode: sharingData.courseCode ? sharingData.courseCode : "",
      courseSemester: sharingData.courseSemester ? sharingData.courseSemester : "",
      courseCLOs: sharingData.clos ? sharingData.clos : "<p></p>",
      courseAsg: sharingData.assignmentList ? sharingData.assignmentList : [],

      // Module Data
      moduleName: sharingData.name ? sharingData.name : "",
      moduleLOs: sharingData.los ? sharingData.los : "",
      sessionList: sharingData.sessionList ? sharingData.sessionList : []
    }))
  }, [sharingData.assignmentList, sharingData.clos, sharingData.courseCode, sharingData.courseName, sharingData.courseSemester, sharingData.los, sharingData.name, sharingData.sessionList])

  return (
    <div className="planner_pdf_container">
      <div className="pdf_top_bar">
        <div className="pdf_download_side">
          <PDFDownloadLink document={<PDFFile data={pdfData}/>} filename={"FORM"} className="download_btn">
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
            <PDFFile data={pdfData}/>
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
