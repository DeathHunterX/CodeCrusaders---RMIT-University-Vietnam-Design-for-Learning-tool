import { AiOutlineSetting } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { BsFlag } from "react-icons/bs";
import { PiBookOpenText } from "react-icons/pi";
import { RiHome6Line } from "react-icons/ri";

import { IconSetting } from "../../utils/IconSetting";

export const NavBarData = [
  {
    title: "Overview",
    path: "/",
    icon: IconSetting(<RiHome6Line />),
  },
  {
    title: "Courses",
    path: "/courses",
    icon: <PiBookOpenText />,
  },
  {
    title: "About Us",
    path: "/about",
    icon: <BsPeople />,
  },
  {
    title: "Setting",
    path: "/support",
    icon: <AiOutlineSetting />,
  },
  {
    title: "Report",
    path: "/report",
    icon: <BsFlag />,
  },
];
