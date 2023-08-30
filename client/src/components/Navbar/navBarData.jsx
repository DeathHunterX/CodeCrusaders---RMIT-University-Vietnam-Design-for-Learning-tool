// import {BiSupport} from 'react-icons/bi'
// import {BsFillPeopleFill} from 'react-icons/bs'
// import {MdReport} from 'react-icons/md'
import {GiBookCover} from 'react-icons/gi'
import {AiFillHome} from 'react-icons/ai'

import { IconSetting } from '../../utils/IconSetting'

export const NavBarData = [
    {
        title: 'Overview',
        path: '/',
        icon: IconSetting(<AiFillHome />, 'black')
    },
    {
        title: 'Courses',
        path: '/courses',
        icon: <GiBookCover />
    },
    // {
    //     title: 'About Us',
    //     path: '/about',
    //     icon: <BsFillPeopleFill />
    // },
    // {
    //     title: 'Support',
    //     path: '/support',
    //     icon: <BiSupport />
    // },
    // {
    //     title: 'Report',
    //     path: '/report',
    //     icon: <MdReport />
    // },
]