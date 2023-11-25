'use client'

import Image from "next/image"
import ayano from "@/public/images/ayano.jpg"

import Button from "./Button";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { FiEdit } from "react-icons/fi";

import { CiHeart } from "react-icons/ci";

import { useState } from "react";

import { deletePost } from "@/actions/deletePost";

interface MessageBoxProps {
    authorName : string;
    dateTime : string;
    postContent : string;
    postTag : string;
    id : string;
    setPostDeleted? : any;
    onClick? : any;
    setIsEditing : any;
    setEditedPostId : any;

}
const MessageBox : React.FC<MessageBoxProps> = ({
    authorName,
    dateTime,
    postContent,
    postTag,
    id,
    setPostDeleted,
    onClick,
    setIsEditing,
    setEditedPostId
}) => {
    const [isSettingsView, setIsSettingsView] = useState(false);
    const handleSettingsClick = () => {
        if (!isSettingsView) {
            setIsSettingsView(true);
        } else {
            setIsSettingsView(false)
        }
    }

    const handlePostDeleteClick = async (e : React.SyntheticEvent) => {
        try {
            const deletedPost = deletePost(id);

            if (deletedPost !== null) {
                setPostDeleted(true)
            }
        } catch (err) {
            console.error("Error on deletin the post from the client side", err)
        }
    }

    const handleEditClick = () => {
        setEditedPostId(id)
        setIsEditing(true)
        onClick();
    }

    if (isSettingsView) {
        return (
            <div
                className="flex flex-col gap-3 bg-slate-200 w-[50rem] px-10 py-8 rounded-md shadow-md text-sm justify-center items-center"
            >
                
                <div
                    className="flex gap-3"
                >
                    <FiEdit
                        size={20}
                        color="blue"
                    />
                    <h1
                        className="font-semibold text-blue-700 tracking-wide text-base"
                    >
                        Post Control
                    </h1>
                </div>


                <div
                    className="flex gap-3 w-full justify-center"
                >
                    <Button
                        buttonText="Discard"
                        onClick={handleSettingsClick}
                    />  
                    <Button
                        buttonText="Edit Post"
                        onClick={handleEditClick}
                    />  
                   <Button
                        buttonText="Delete"
                        onClick={handlePostDeleteClick}
                    />  
                </div>
            </div>
        )
    }

    return (
        <div
                className="flex flex-col gap-2 bg-slate-100 w-[50rem] px-10 py-5 rounded-md shadow-md"
        >

            <div
                className="flex gap-3 items-center w-full justify-between"
            >
                <div
                    className="flex gap-3 items-center"
                >
                    <Image 
                        alt="ayano"
                        src={ayano}
                        className="w-10 rounded-full"
                    />
                    <div>
                        <h3
                            className="font-semibold text-sm"
                        >
                            {authorName}
                        </h3>
                        <small

                        >
                            {dateTime}
                        </small>
                    </div>
                </div>
                <BiDotsHorizontalRounded
                    size={26}
                    className="place-self-end mb-3"
                    onClick={handleSettingsClick}
                />
            </div>

            <p
                className="pl-[3.2rem] text-sm"
            >
                {postContent}
            </p>

            <div
                className="flex gap-2 items-cener pl-[3rem]"
            >
                <CiHeart 
                    size={20}
                />
                <small>
                    25
                </small>
            </div>

        </div>
    )
};

export default MessageBox;