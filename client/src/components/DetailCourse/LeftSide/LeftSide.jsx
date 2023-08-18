import React from 'react'
import {Link, useParams} from 'react-router-dom'

const LeftSide = () => {
    const {id, subPage} = useParams()

    const LeftSideMap = [
        {
            itemNo: '1',
            itemName: 'Home',
            itemLink: `/courses/${id}/home`
        },
        {
            itemNo: '2',
            itemName: 'Modules',
            itemLink: `/courses/${id}/modules`
        },
        {
            itemNo: '3',
            itemName: 'Setting',
            itemLink: `/courses/${id}/setting`
        },
    ]

  return (
    <div className="sticky_sidebar d-block">
        <ul className='section_tabs'>
            {
                LeftSideMap.map((item) => {
                    const itemLinkSplit = item.itemLink.split('/')

                    return(
                        <li className={`section_item ${subPage === itemLinkSplit[itemLinkSplit.length - 1] ? 'active': ''}`} key={item.itemNo}>
                            <Link to={item.itemLink}>{item.itemName}</Link>
                        </li>
                    )
                })
            }
            
            
        </ul>
    </div>
  )
}

export default LeftSide