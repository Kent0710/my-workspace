'use server'

import prisma from "@/lib/prisma"
import { getCurrentUser } from "./getSessionUser"

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
            }
        })

        if (!newPost) return null;
        
        console.log("new post created")
        return true;
    } catch (err) {
        throw new Error (`Error on composing a post ; ${err}`)
    }
}