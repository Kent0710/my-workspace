'use client'

import { IoAdd } from "react-icons/io5";

import { useRouter } from "next/navigation";
import { useLoaderFlag } from "@/hooks/useLoaderFlag";

interface JoinCreateTeamProps {
    text : string;
}
const JoinCreateTeam : React.FC<JoinCreateTeamProps> = ({
    text
}) => {
    const router = useRouter();
    const { updateLoaderFlag } = useLoaderFlag();
    const handleJoinCreateTeamClick = () => {
        updateLoaderFlag(true)
        router.push("/discoverTeams")
    }

    return (
        <div
            className="bg-slate-100  w-[15rem] h-[15rem] p-5 rounded-sm flex flex-col gap-3 justify-center items-center
            hover:bg-slate-200 hover:cursor-pointer"
            onClick={handleJoinCreateTeamClick}
        >
            <IoAdd 
                size={40}
            />

            <h1
                className="text-center"
            >
                {text}
            </h1>
        </div>
    )
};

export default JoinCreateTeam;