import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { LeftSideMap } from './LeftSideMap'

const LeftSide = () => {
  const {subPage} = useParams()

  return (
    <div className="sticky_sidebar d-block">
        <ul className='section_tabs'>
            {
                LeftSideMap.map((item) => {
                    const itemLinkSplit = item.itemLink.split('/')

                    return(
                        <li className={`section_item ${subPage === itemLinkSplit[itemLinkSplit.length - 1] ? 'active': ''}`} key={item.itemNo}>
                            {}
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