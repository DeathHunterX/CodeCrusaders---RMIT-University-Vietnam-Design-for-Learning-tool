import React, { Fragment, useEffect, useState } from "react";
import PDFFile from "./PDFStructure/PDFFile";
import RightSide from "./RightSide/RightSide";

import { HiDownload } from "react-icons/hi";
import { AiOutlineLeft } from "react-icons/ai";
import { BsWindowStack } from "react-icons/bs";
import {IconSetting} from '../../utils/IconSetting'

import { useSelector} from "react-redux";

import { PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import HTMLGenerator from "./HTMLGenerator/HTMLGenerator";


const PlanningContentComponent = () => {
  const {idData, sharingData} = useSelector(state => state.sharing)

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

  const navigate = useNavigate();
  const returnToModulePage = () => {
    if (idData?.courseId && idData?.moduleId) {
      navigate(`/courses/${idData?.courseId}/modules/${idData?.moduleId}`)
    }
  }

  const {id} = useParams();
  const { pathname, search } = useLocation();

  const pathNamePart = pathname.split('/')
  const isPlanningContentPage = pathNamePart[1] === 'planning_content'

  const openNewWindow = () => {
    // URL of the page you want to open in the new window
    const url = `http://localhost:3000/planning_content/${id}?viewPDF=true`;

    // Options for the new window
    const windowOptions = 'width=800,height=600';

    // Open the new window
    const newWindow = window.open(url , '_blank', windowOptions);
    newWindow.focus();
  };

  return (
    <Fragment>
      {
      (isPlanningContentPage && search === "?viewPDF=true")
      ? 
      (
        <div className="pdf_show_only">
          <PDFViewer showToolbar={false}>
            <PDFFile data={pdfData}/>
          </PDFViewer>
        </div>
      )
      :
      (
        <div className="planner_pdf_container">
          <div className="pdf_top_bar">
            <div className="pdf_left_side">
              <button onClick={returnToModulePage}> <AiOutlineLeft /></button>
            </div>
            <div className="pdf_right_side d-flex align-items-center">
              <HTMLGenerator data={pdfData}/>
              <div className="pdf_download_side me-2">
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
              <button className="mx-4" onClick={openNewWindow}> <BsWindowStack /> </button>
              
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
      )
      }
    </Fragment>
  );
};

export default PlanningContentComponent;
