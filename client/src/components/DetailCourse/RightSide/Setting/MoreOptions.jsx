import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const MoreOptions = () => {
    const [popUpStat, setPopUpStat] = useState(false)
    const [confirmCourse, setConfirmCourse] = useState('')

    const togglePopUp = () => {
        setPopUpStat(!popUpStat)
    }

    const handleDeleteCourse = (e) => {
        e.preventDefault()
        // Split into courseId and course name and compare
        const regexPattern = /^(.*?)\s-\s(.*)$/;
        const splitArray = confirmCourse.match(regexPattern);
        
        if (splitArray[1] === 'BP306' && splitArray[2] === 'Engineering for Capstone Project 2023') {
            console.log('Delete Successfully')
        }
    }


    return (
        <div className='more_options_container'>
            <div className="">
                <h6>Delete Course</h6>

            </div>
            <button className='btn btn-danger' onClick={togglePopUp}>Delete Course</button>

            
            <div className={`popup_form ${popUpStat === true ? 'active' : ''}`}>
                <div className="overlay"></div>
                
                <form className="form_content" onSubmit={handleDeleteCourse}>
                    
                    <div className="form_header mb-4">
                    <div className=" d-flex justify-content-between">
                        <p>Delete course</p>
                        <span style={{cursor: 'pointer'}}><IoClose onClick={togglePopUp}/></span>
                    </div>
                    
                    </div>
                    
                    <div className="mb-4">
                        <div className="">
                            <div className="fw-bold mb-2">Delete this course ?</div>
                            There will <span className="fw-bold">be nothing left for this course anywhere</span>. This action is
                            irrevocable and cannot be undone, not even with fairy dust. <br />
                            Are you absolutely sure you want to delete course "BP306 - Engineering for Capstone Project 2023" ?
                        </div>
                      
                    </div>

                    <div>
                        <label htmlFor="">Type "<span className="fw-bold">BP306 - Engineering for Capstone Project 2023</span>"  to confirm</label>
                        <input type="text" className="form-control" id="inputModuleText" aria-describedby="inputModuleText" onChange={e => setConfirmCourse(e.target.value)}/>
                    </div>

                    <div className="form_bottom d-flex mt-4">
                        <button className='btn btn-danger me-2'>Delete Course</button>
                        <button className='btn btn-outline-secondary' onClick={() => setPopUpStat(false)}>Cancel</button>
                    </div>
                </form>
                
                
            </div>                
            
        </div>
    )
}

export default MoreOptions