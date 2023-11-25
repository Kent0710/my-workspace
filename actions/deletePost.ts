'use server'

import prisma from "@/lib/prisma"

export async function deletePost(postId : string) {
    try {
        const deletePost = await prisma.post.delete({
            where : {
                id : postId
            }
        });

        if (!deletePost) return null;

        console.log("Post successfully deleted")
    } catch (err) {
        console.log(err, "SERVER_ERROR (delete post)")
        return null;
    }
}