import { BsFillPeopleFill } from "react-icons/bs";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";

export const listNavBar = [
    {
        name: "Employees",
        path: "/employees",
        icon: <BsFillPeopleFill />
    },
    {
        name: "Assignment",
        path: "/nextcustomer",
        icon: <MdAssignmentTurnedIn/>
    },
    {
        name: "Dashboard",
        path:"/dashboard",
        icon: <BiSolidDashboard />
    },
]