'use client'

import { TiGroupOutline } from "react-icons/ti";
import { GrProjects } from "react-icons/gr";
import { BsChatSquareText } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { LiaBookSolid } from "react-icons/lia";

import SidebarNav from "./SidebarNav";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    const sidebarNavs = useMemo(() => [
        {
            icon : TiGroupOutline,
            text : "Teams",
            href : "/teams",
            active : pathname.replace(/\/\d+$/, '') === "/teams" || pathname === "/discoverTeams" 
        },
        {
            icon : GrProjects,
            text : "Projects",
            size : 20,
            href : "/projects",
            active : pathname === "/projects"
        },
        {
            icon : GoTasklist,
            text : "Tasks",
            href : "/tasks",
            active : pathname === "/tasks"
        },
        {
            icon : LiaBookSolid ,
            text : "Materials",
            href : "/materials",
            active : pathname === "/materials"
        },
        {
            icon : BsChatSquareText ,
            text : "Chats",
            size : 20,
            href : "/chats",
            active : pathname === "/chats"
        }
    ], [pathname])

    return (
        <div
            className="h-full flex flex-col gap-5 border-2 border-slate-200 "
        >
            
            {sidebarNavs.map((nav) => (
                <SidebarNav 
                    key={nav.text}
                    icon={nav.icon}
                    text={nav.text}
                    size={nav.size}
                    active={nav.active}
                    href={nav.href}
                />
            ))}

        </div>
    )
};

export default Sidebar;