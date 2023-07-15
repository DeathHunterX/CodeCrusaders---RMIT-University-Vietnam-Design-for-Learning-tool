import React, { useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'

import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import { getCourse } from '../../redux/slices/courseSlice'

const DetailCourse = () => {
    const {type, token} = useSelector(state => state.auth.user)

    const dispatch = useDispatch()
    
    const {id} = useParams()

    const combinedToken = `${type} ${token}`

    useEffect(() => {
        dispatch(getCourse({id, token: combinedToken}))
    }, [id, combinedToken, dispatch])


    return (
        <div className="detail_course">
            <div className="detail_course_header ps-4 pt-3 pb-3"> 
                <h5>
                    <div aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="">BP306</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Home</li>
                        </ol>
                    </div>
                </h5>
            </div>
            <div className="detail_course_body d-flex flex-wrap">
                <div className="left_side course_sidebar col-1">
                    <LeftSide />
                </div>

                <div className="right_side col-11">
                    <RightSide />
                </div>
            </div>
            
        </div>
    )
}

export default DetailCourse