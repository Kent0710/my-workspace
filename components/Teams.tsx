'use client'

import TeamsBox from "./TeamsBox";
import CreateBox from "./JoinCreateTeamBox";
import ViewBox from "./ViewBox";

import { TeamsType } from "@/types";

import { useEffect } from "react";
import { useState } from "react";
import { getTeams } from "@/actions/getTeams";

const Teams = () => {
    const [teams, setTeams] = useState<TeamsType[]>([]);

    useEffect(() =>{
        const fetchTeams = async () => {
            try {
                const fetchedTeams = await getTeams();
                if (fetchedTeams) {
                    setTeams(fetchedTeams)
                }
                
            } catch (error) {
                console.error("Error fethcing teams", error)
            }
        };

        fetchTeams();
    }, [])

    return (
        <ViewBox
            title="My Teams"
        >
            <div
                className="flex gap-5 pt-3"
            >
                {teams.map((team : TeamsType) => (
                    <TeamsBox
                        key={team.id}
                        teamName={team.name}
                        teamId={team.id}
                    />
                ))}
                
                <CreateBox 
                    text="Join or create team"
                />
            </div>
        </ViewBox>
    )
};

export default Teams;