'use client'

import ViewBox from "./ViewBox";

import { GrGroup } from "react-icons/gr";
import { FaRegObjectUngroup } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { createTeam } from "@/actions/createTeam";
import Loading from "./Loading";
import { joinTeam } from "@/actions/joinTeam";

const DiscoverTeams = () => {
    const router = useRouter();

    const [teamId, setTeamId] = useState("");
    // hooks for creating team flag
    const [isTeamCreated, setIsTeamCreated] = useState(false)
    // function for creating a team
    const inputRef = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null)
    // state for updating the view 
    const [isTeamedJoin, setIsTeamedJoin] = useState(false)
    const [isEventTriggeredJoin, setIsEventTriggeredJoin] = useState(false);
    const [isEventTriggered, setIsEventTriggered] = useState(false);
    const handleCreateTeam = async (e : React.SyntheticEvent) => {
        e.preventDefault();

        try {   
            setIsEventTriggered(true)
            if (inputRef.current) {
                const teamName = inputRef.current.value;

                const newTeam = await createTeam(teamName);
                if (newTeam !== null) {

                    setTeamId(newTeam)

                    setIsEventTriggered(false)
                    setIsTeamCreated(true)

                }

                console.log("Team created successfully")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleJoinTeam = async (e : React.SyntheticEvent) => {
        e.preventDefault();

        try { 
            setIsEventTriggeredJoin(true)

            if(codeRef.current) {
                const teamCode = codeRef.current.value;
                console.log(teamCode)

                const joinedTeam = await joinTeam(teamCode);
                console.log("team joined")

                if (joinedTeam !== null) {
                    
                    setTeamId(joinedTeam);

                    setIsEventTriggeredJoin(false);
                    setIsTeamedJoin(true)
                }
            }

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <ViewBox
            title="Join or create team "
        >
            <div
                className="flex gap-5"
            >
                <OptionTeamBox
                    icon={GrGroup}
                    boxText="Join the fun with everyone."
                    buttonText="Join team"
                    placeholder="Enter team code"
                    onClick={handleJoinTeam}
                    refVar={codeRef}
                    isEventTriggered={isEventTriggeredJoin}
                    eventTriggeredText="You are joining the team."
                    isTeamCreated={isTeamedJoin}
                    eventFinishedText="You successfully joined the team!"
                    againButtonText="Join again"
                />
                <OptionTeamBox
                    icon={FaRegObjectUngroup}
                    boxText="Bring everyone together."
                    onClick={handleCreateTeam}
                    buttonText="Create team"
                    placeholder="Enter team name"
                    refVar={inputRef}
                    isEventTriggered={isEventTriggered}
                    isTeamCreated={isTeamCreated}
                    setIsTeamCreated={setIsTeamCreated}
                    teamId={teamId}
                    eventTriggeredText="Your team is being created."
                    eventFinishedText="Team successfully created!"
                    againButtonText="Create new"
                />
            </div>


        </ViewBox>
    )
};

interface OptionTeamBoxProps {
    icon : any;
    boxText : string;
    buttonText : string;
    placeholder : string;
    onClick? : any;
    refVar? : any;
    isEventTriggered? : boolean;
    isTeamCreated? : boolean;
    setIsTeamCreated? : any;
    teamId? : string;
    eventTriggeredText : string;
    eventFinishedText : string;
    againButtonText : string;
}
const OptionTeamBox : React.FC<OptionTeamBoxProps> = ({
    icon : Icon,
    boxText,
    buttonText,
    placeholder,
    onClick,
    refVar,
    isEventTriggered,
    isTeamCreated,
    setIsTeamCreated,
    teamId,
    eventTriggeredText,
    eventFinishedText,
    againButtonText
}) => {
    const router = useRouter();

    if (isEventTriggered){
        return (
            <div
                className=" bg-slate-100 w-[15rem] shadow-md h-[15rem] p-5 rounded-md flex flex-col justify-center items-center
                hover:bg-slate-200 hover:cursor-pointer mt-3 border-2 border-solid border-blue-700"
            >
                <Loading
                    className="pb-none"
                />
                <small
                    className="text-center"
                >
                    {eventTriggeredText}
                </small>
                
            </div>
        )
    }

    if (isTeamCreated) {
        return (
            <div
                className=" bg-slate-100 w-[15rem] shadow-md h-[15rem] p-5 rounded-md flex flex-col gap-3 justify-center items-center
                hover:bg-slate-200 hover:cursor-pointer mt-3 border-2 border-solid border-blue-700 text-xs"
            >
                <IoMdDoneAll
                    size={36}
                    color="blue"
                />
                <h1
                    className="text-sm font-semibold text-blue-700 text-center"
                >
                    {eventFinishedText}
                </h1>
                <div
                    className="flex gap-3"
                >
                    <button
                        className="bg-blue-700 rounded-md px-4 py-2 text-white font-semibold tracking-wide hover:bg-blue-500"
                        onClick={() => setIsTeamCreated(false)}
                    >
                        {againButtonText}
                    </button>
                    <button
                        className="bg-blue-700 rounded-md px-4 py-2 text-white font-semibold tracking-wide hover:bg-blue-500"
                        onClick={() => router.push(`/teams/${teamId}`)}
                    >
                        Visit team
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div
            className=" bg-slate-100 w-[15rem] shadow-md h-[15rem] p-5 rounded-md flex flex-col gap-3 justify-center items-center
            hover:bg-slate-200 hover:cursor-pointer mt-3"
        >
            <Icon
                size={40}
                color="blue"
            />
            <h1
                className="font-semibold text-blue-700 text-sm"
            >
                {boxText}
            </h1>

            <form
                className="flex flex-col gap-3 w-full items-center"
                onSubmit={onClick}
            >
                <input 
                    type="text" 
                    ref={refVar}
                    className="rounded-md w-[13rem] px-2 py-1 tracking-wide font-semibold text-neutral-600 text-sm"
                    placeholder={placeholder}
                />
                <button 
                    type="submit"
                    className=" bg-blue-600 rounded-md w-[7rem] py-2 font-semibold text-white text-xs tracking-wide
                        hover:bg-blue-500
                    "
                >
                    {buttonText}
                </button>
            </form>
        </div>
    )
}

export default DiscoverTeams;