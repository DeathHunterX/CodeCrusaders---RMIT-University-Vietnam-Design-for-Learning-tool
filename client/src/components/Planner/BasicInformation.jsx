import React from 'react'
import {AiOutlineQuestionCircle} from 'react-icons/ai'

const BasicInformation = () => {
  return (
    <div>
        <div className="">
            <form>
                <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <label htmlFor="exampleInputEmail1" className="form-label">Course Title</label>
                        <small>Edit</small>
                    </div>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>

                <div className="d-flex justify-content-between align-top mb-3">
                    <div className="">
                        <label htmlFor="exampleInputEmail1" className="form-label">Course Title</label>
                        <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div className="">
                        <label htmlFor="exampleInputEmail1" className="form-label">Class Size</label>
                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div className="">
                        <label htmlFor="exampleInputEmail1" className="form-label">Modality</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Face-to-face
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Online
                            </label>
                        </div>
                    </div>

                </div>

                <div className="mb-3">
                    <div className="d-flex">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label me-4">Objective Summary</label>
                        <AiOutlineQuestionCircle />
                    </div>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <div className="mb-3">
                    <div className="d-flex">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label me-4">Preparation</label>
                        <AiOutlineQuestionCircle />
                    </div>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <div className="mb-3">
                    <div className="">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label me-4">Learning Object</label>

                    </div>
                </div>

                
            </form>
        </div>
    </div>
  )
}

export default BasicInformation