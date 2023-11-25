'use server'

import prisma from "@/lib/prisma"
import { getCurrentUser } from "./getSessionUser"

import { generateCode } from "@/utils/generateCode";

export async function createTeam(teamName : string) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return null;
        const currentUserId = [currentUser.id]
        const code = generateCode();

        const newTeam = await prisma.team.create({
            data : {
                name : teamName,
                owner : currentUser.email || "",
                description : "",
                membersId : currentUserId,
                code : code
            }
        });

        if (!newTeam) return null;

        console.log("New team created");
        return newTeam.id;
    } catch (err) {
        throw new Error (`Error on composing a post ; ${err}`)
    }
}