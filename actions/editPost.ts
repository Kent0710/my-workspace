'use server'

import prisma from "@/lib/prisma"

export async function editPost(editedPostId : string, content : string, tag : string) {
    try {
        const editedPost = await prisma.post.update({
            where : {
                id : editedPostId
            },
            data : {
                postContent : content,
                tag : tag
            }
        });

        if (!editedPost) return null;

        console.log("Post successfully edited")
        return true;
    } catch (err) {
        console.log(err, "SERVER_ERROR (edit post)")
        return null;
    }
}