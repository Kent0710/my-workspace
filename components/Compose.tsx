import Image from "next/image"
import ayano from "@/public/images/ayano.jpg"

import { IoCreateOutline } from "react-icons/io5"
import { LiaEditSolid } from "react-icons/lia"

import { ViewHeader } from "./SingleTeamSidebar"

import { composePost } from "@/actions/composePost"
import { editPost } from "@/actions/editPost"

import { useRef } from "react"
import { usePathname } from "next/navigation"

interface ComposeProps {
    setIsComposing : any;
    isEditing : boolean;
    editedPostId : string;
}

const Compose : React.FC<ComposeProps> = ({
    setIsComposing,
    isEditing,
    editedPostId
}) => {
    const pathname = usePathname();

    const postData = {
        postContentRef : useRef<HTMLTextAreaElement>(null),
        postTagRef : useRef<HTMLSelectElement>(null)
    }
    const handleComposeSubmission = async (e : React.SyntheticEvent) => {
        e.preventDefault();

        try {
            // check whether the data needed exists.
            if (postData.postContentRef.current && postData.postTagRef.current) {
                // extracted post datas from the form
                const post = {
                    content : postData.postContentRef.current.value,
                    tag : postData.postTagRef.current.value
                };

                if (!isEditing) {
                    await composePost(post.content, post.tag, pathname);
                } else {
                    await editPost(editedPostId, post.content, post.tag)
                }

                if (composePost !== null || editPost !== null) {
                    setIsComposing(false)
                }

                console.log("Post created successfully.")
            }

        } catch (err) {
            console.error(err)
        }
    }   

    return (
        <div
            className="w-[82%] flex flex-col h-full"
        >

            <ViewHeader title="Composing" />

            <div
                className="flex flex-col gap-3 py-3 px-5 w-full bg-slate-100 shadow-md hover:bg-slate-200"
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
                            Namikaze Nakiri
                        </h3>
                        <small>
                            Augsut 14, 2023 | 9:00 PM
                        </small>
                    </div>
                </div>

                <form
                    className="w-full flex flex-col gap-3"
                    onSubmit={handleComposeSubmission}
                >
                    <textarea 
                        className="ml-[3rem] w-[90%] h-[20rem] mx-10 rounded-md px-2 py-1 tracking-wide text-sm resize-none outline-blue-700"
                        placeholder="Enter your message here..."
                        ref={postData.postContentRef}
                    />

                    <div
                        className="flex place-self-end items-center"
                    >
                        <IoCreateOutline
                            size={20}
                            color='blue'
                        />
                        <select 
                            name="postTag" 
                            id="postTag" 
                            ref={postData.postTagRef}
                            defaultValue="Add a tag"
                            className="ml-1 text-sm px-2  rounded-md border-solid border-2 border-blue-700 bg-slate-100 outline-none w-[10rem] h-full">
                            <option value="" disabled hidden>Add a tag</option>
                            <option value="kulbit">#KULBIT 2023</option>
                            <option value="intramurals">#Intramurals</option>
                            <option value="sports fest">#Sports fest</option>
                            <option value="midterms examination">#Midterms examination</option>
                            <option value="finals examination">#Finals examination</option>
                        </select>
                        <button
                            className="ml-3 flex items-center gap-2 bg-blue-600 rounded-md px-9 py-2 mr-[6rem] font-semibold text-white text-xs tracking-wide w-[10rem] justify-center place-self-end"
                        >
                            <LiaEditSolid 
                                size={18}
                            />
                            <h1>
                                Compose
                            </h1>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Compose;