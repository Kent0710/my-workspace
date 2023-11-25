'use server'

import prisma from "@/lib/prisma"

export async function getTeam(teamId : string) {
    try {
        const team = await prisma.team.findUnique({
            where : {
                id : teamId
            },
            include : {
                posts : {
                    include : {
                        author : true
                    }
                },
                members : true,
            }
        });

        if (!team) return null;

        console.log("team successfully found")
        return team;
    } catch (err) {
        console.log(err, "SERVER_ERROR (get team)");
        return null;
    }
}