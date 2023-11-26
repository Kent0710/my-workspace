'use server'

import prisma from "@/lib/prisma"
import { getCurrentUser } from "./getSessionUser"
import { getTeam } from "./getTeam";
import { pusherServer } from "@/lib/pusher";

export async function composePost(content : string, tag : string, pathname : string) {
    try {
        const teamId = pathname.split("/").pop();

        if (!teamId) return null;

        const sessionUser = await getCurrentUser();

        if (!sessionUser) return null;

        const newPost = await prisma.post.create({
            data : {
                teamId : teamId,
                postContent : content,
                tag : tag,
                authorId : sessionUser.id,
                datePosted : new Date()
            },
            include : {
                author : true
            }
        })

        if (!newPost) return null;

        const team = await getTeam(teamId);

        if (!team) return null;

        // pusher function
        // the team members names are the recievers and listeners in the web socket
        let teamMembersNames = team.members.map(member => member.name) || [];
        for (let i = 0; i < teamMembersNames.length; i++) {
            await pusherServer.trigger(`new-post-${teamMembersNames[i]}`, 'new-post', {
                newPost : newPost
            });

            console.log("new post created")
            console.log(newPost)
        };

        console.log("new post created")
        return true;
    } catch (err) {
        throw new Error (`Error on composing a post ; ${err}`)
    }
}