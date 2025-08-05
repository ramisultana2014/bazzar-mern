import { CgProfile } from "react-icons/cg";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegChartBar } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import type { NavLinksType } from "./types";

export const navLinks: NavLinksType[] = [
  { text: "shopping", path: "/homepage", icon: MdOutlineHomeWork },
  { text: "profile", path: "/profile", icon: CgProfile },
  { text: "add product", path: "/addProduct", icon: IoCloudUploadOutline },
  { text: "chart", path: "/chart", icon: FaRegChartBar },
];
// use it <item.icon className="w-8 h-8 " />
//  icon: HiMiniCalendarDays,
