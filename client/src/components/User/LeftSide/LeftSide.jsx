import React from 'react'
import { Link, useParams } from 'react-router-dom'

const LeftSide = () => {
    const {id, subPage} = useParams()

    const UserLeftMap = [
        {
            itemNo: '1',
            itemName: 'Profile',
            itemLink: `/user/${id}/profile`
        },
        {
            itemNo: '2',
            itemName: 'Setting',
            itemLink: `/user/${id}/setting`
        },
    ]
    return (
      <div className="sticky_sidebar d-block">
          <ul className='section_tabs'>
              {
                  UserLeftMap.map((item) => {
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