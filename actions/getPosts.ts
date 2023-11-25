'use server'

import prisma from "@/lib/prisma"

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            include : {
                author : true,
            }
        });

        if (!posts) return null;

        return posts;
    } catch (err) {
        console.log(err, "SERVER_ERROR (get posts)")
        return null;
    }
}