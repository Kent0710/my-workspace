'use server'

import prisma from "@/lib/prisma"
import { getCurrentUser } from "./getSessionUser"

export async function joinTeam(teamCode : string) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return null;

        const joinTeam = await prisma.team.update({
            where : {
                code : teamCode
            },
            data : {
                membersId : {
                    push : currentUser.id
                }
            }
        });

        if (!joinTeam) return null;

        console.log("Joined team")
        return joinTeam.id;
    } catch (err) {
        console.log(err, "SERVER_ERROR (join team)")
        return null;
    }
}