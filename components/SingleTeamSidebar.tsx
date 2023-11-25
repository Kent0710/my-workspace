'use client'

import Image from "next/image";
import ayano from "@/public/images/ayano.jpg"

import { useRouter } from "next/navigation";
import { useLoaderFlag } from "@/hooks/useLoaderFlag";

import { useTeamSidebarView } from "@/hooks/useTeamSidebarView";

import { PiCaretRightBold } from "react-icons/pi";
import { TbGridDots } from "react-icons/tb";

import { useTeamName } from "@/hooks/useTeamName";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { getTeam } from "@/actions/getTeam";
import { getCurrentUser } from "@/actions/getSessionUser";

interface SingleTeamProps {
    teamName : string;
}
const SingleTeamSidebar : React.FC<SingleTeamProps> = ({
    teamName
}) => {
    const {updateTeamSidebarView} = useTeamSidebarView();

    const teamSidebarNavs = [
        "Announcements",
        "Classes",
        "Projects",
        "Tasks",
        "Settings"
    ]

    const handleSidebarClick = (navClicked : string) => {

        updateTeamSidebarView(navClicked);
    }

    const router = useRouter();
    const { updateLoaderFlag } = useLoaderFlag();
    const handleReturnClick = () => {
        updateLoaderFlag(true)
        router.push("/teams")
    }

    return (
        <div
                className="lg:flex flex-col items-center py-4 w-[18%] px-3 gap-2 border-slate-200 border-r-2 border-solid hidden"
            >
                <small
                    className="place-self-start text-blue-800 underline pb-5 hover:cursor-pointer"
                    onClick={handleReturnClick}
                >Return to teams</small>

                <Image 
                    src={ayano}
                    alt="ayano"
                    className="w-20"
                />
                <h1
                    className="font-semibold tracking-wide text-lg text-blue-700 w-[12rem] text-center"
                >
                    {teamName}
                </h1>

                <div
                    className="place-self-start gap-3 flex flex-col pt-3 w-full"
                >
                    <h1
                        className="font-semibold"
                    >
                        Navigations
                    </h1>

                    {teamSidebarNavs.map((nav) => (
                        <div
                            className="flex justify-between w-full hover:bg-slate-200 p-1 px-2 rounded-sm items-center text-sm hover:cursor-pointer"
                            key={nav}
                            onClick={() => handleSidebarClick(nav.toLowerCase())}
                        >   
                            <h2>
                                {nav}
                            </h2>
                            <PiCaretRightBold 
                                size={17}
                            />
                        </div>
                    ))}
                </div>
            </div>
    )
}

export default SingleTeamSidebar;

interface ViewHeaderProps {
    title : string;
}
export const ViewHeader : React.FC<ViewHeaderProps> = ({
    title
}) => {
    return (
        <div
            className="flex gap-3 items-center border-solid border-slate-200 border-b-2 w-full py-2 px-5"
        >
            <TbGridDots 
                size={20}
            />
            <h1
                className="font-semibold tracking-wide text-lg text-blue-700 "
            >
                {title}
            </h1>
        </div>
    )
}