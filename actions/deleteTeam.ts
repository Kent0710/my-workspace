'use server'

import prisma from "@/lib/prisma"

export async function deleteTeam(pathname : string) {
    try {
        const teamId = pathname.split("/").pop();

        const deleteTeam = await prisma.team.delete({
            where : {
                id : teamId
            }
        });

        if (!deleteTeam) return null;

        console.log("Team deleted successfully");
        return true
    } catch (err) {
        console.log(err, "SERVER_ERROR (delete team)")
        return null;
    }
}