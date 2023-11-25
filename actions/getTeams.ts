'use server'

import { getCurrentUser } from "./getSessionUser"
import prisma from "@/lib/prisma"

export async function getTeams() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return null;

        const teams = await prisma.team.findMany({
            where : {
                membersId : {
                    has : currentUser.id
                }
            },
        });

        if (!teams) return null;

        return teams;

    } catch (err) {
        console.log(err, "SERVER_ERROR (get posts)")
        return null;
    }
}