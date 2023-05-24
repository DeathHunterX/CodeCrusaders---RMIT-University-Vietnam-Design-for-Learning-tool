import React from 'react'

const Avatar = ({src, size}) => {

    return (
        <div className={size} >
            <img src={src} alt="avatar" className="w-100"/>
        </div>
    )
}

export default Avatar