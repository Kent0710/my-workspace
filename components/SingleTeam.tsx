'use client'

import ayano from "@/public/images/ayano.jpg"
import Image from "next/image";

import MessageBox from "./MessageBox";

import { PiCaretRightBold } from "react-icons/pi";
import { TbGridDots } from "react-icons/tb";
import { LiaEditSolid } from "react-icons/lia";
import { BsThreeDots } from "react-icons/bs";

import { AuthorType, TeamsType } from "@/types";

import { useEffect, useState } from "react";

import { useTeamSidebarView } from "@/hooks/useTeamSidebarView";
import { useLoaderFlag } from "@/hooks/useLoaderFlag";

import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";

import SingleTeamSidebar, {ViewHeader} from "./SingleTeamSidebar";

const SingleTeam = () => {

        // retrieving team data
        const pathname = usePathname();
        const teamId = pathname.split("/").pop() || "";
    
        const [teamData, setTeamData] = useState<any>()
        const[isTeamOwned, setIsTeamOwned] = useState(false)
    
        const [dataLoaded, setDataLoaded] = useState(false)

        const [isRender, setIsRender] = useState(false)
    
        useEffect(() => {
            const fetchTeamData = async () => {
                try {
                    const team = await getTeam(teamId)
    
                    if (team) {
                        setTeamData(team)
                    };
    
                    const user = await getCurrentUser();
    
                    if (user) {
                        if (user.email === team?.owner) setIsTeamOwned(true)
                    }
    
                    setIsRender(true)
                    setDataLoaded(true)
    
                } catch (err) {
                    console.error("Error fetching team data", err)
                }
            };

            fetchTeamData();
        }, [teamId])

    const {teamSidebarView} = useTeamSidebarView();

    if (!isRender) return <Loading />

    if (teamSidebarView === "announcements") {
        return (
            <div
            className="flex w-full h-full"
            >
                <SingleTeamSidebar teamName={teamData.name}/>
                <Announcements />
            </div>
        )
    }

    if (teamSidebarView === "classes") {
        return (
            <div
            className="flex w-full h-full"
            >
                <SingleTeamSidebar teamName={teamData.name}/>
                <Classes />
            </div>
        )
    }

    if (teamSidebarView === "projects") {
        return (
            <div
            className="flex w-full h-full"
            >
                <SingleTeamSidebar teamName={teamData.name}/>
                <Projects />
            </div>
        )
    }

    if (teamSidebarView === "tasks") {
        return (
            <div
            className="flex w-full h-full"
            >
                <SingleTeamSidebar teamName={teamData.name}/>
                <Tasks />
            </div>
        )
    }

    
    if (teamSidebarView === "settings") {
        return (
            <div
            className="flex w-full h-full"
            >
                <SingleTeamSidebar teamName={teamData.name}/>
                <Settings 
                    teamData={teamData}
                    isTeamOwned={isTeamOwned}
                    dataLoaded={dataLoaded}
                />
            </div>
        )
    }

};

import { getPosts } from "@/actions/getPosts";
import { PostType } from "@/types";
const Announcements = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPostId, setEditedPostId] = useState("");
    const [isComposing, setIsComposing] = useState(false);
    const [postDeleted, setPostDeleted] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // reset the variables
                setPostDeleted(false)

                const fetchedPosts = await getPosts();
                if (fetchedPosts) {
                    console.log(fetchedPosts);
                    setPosts(fetchedPosts);
                }
            } catch (error) {
                console.error("Error fetching data posts:", error);
            }
        };
    
        fetchData();
    }, [isComposing, postDeleted])

    const handleComposeClick = () => {
        setIsComposing(true)
    }

    return (
        <>
            {!isComposing ? (
                <div
                    className="w-[82%] flex flex-col h-full"
                >
        
                    <ViewHeader title="Announcements" />
        
                    <div
                        className="flex flex-col gap-5 items-center  h-[80%] overflow-y-auto"
                    >
                        {posts.map((post : PostType) => (
                            <MessageBox
                                setEditedPostId={setEditedPostId}
                                id={post.id}
                                authorName={post.author.name}
                                dateTime={post.datePosted.toLocaleString()}
                                postContent={post.postContent}
                                postTag={post.tag}
                                setIsEditing={setIsEditing}
                                key={post.id}
                                setPostDeleted={setPostDeleted}
                                onClick={handleComposeClick}
                            />
                        ))}
                    </div>
        
                    <div
                        className="pl-[20rem] py-7"
                    >
                        <button
                            className="flex items-center gap-2 bg-blue-600 rounded-md px-9 py-2 font-semibold text-white text-xs tracking-wide"
                            onClick={handleComposeClick}
                        >
                            <LiaEditSolid 
                                size={18}
                            />
                            <h1>
                                Compose
                            </h1>
                        </button>
                    </div>
                </div>

            ) : (
                <Compose
                    setIsComposing={setIsComposing}
                    isEditing={isEditing}
                    editedPostId={editedPostId}
                />
            )}
        </>
    )
};

import UnderDevelopment from "./UnderDevelopment";

import TeamsBox from "./TeamsBox";
import CreateBox from "./JoinCreateTeamBox";
const Classes = () => {
    return (
        <div
            className="flex flex-col h-full w-[82%]"
        >

            <ViewHeader title="Classes" />

            <UnderDevelopment 
                headerText="Monitor classes activity."
            />
            
        </div>
    )
}

const Projects = () => {
    return (
        <div
            className="flex flex-col h-full w-[82%]"
        >

            <ViewHeader title="Projects" />

            <UnderDevelopment 
                headerText="Manage teams projects."
            />

        </div>
    )
}
interface ProjectsBoxProps {
    status : string;
}
const ProjectsBox : React.FC<ProjectsBoxProps> = ({
    status
}) => {
    const columnHeaders = [
        "Project name",
        "Project head",
        "Project date",
        "Update status"
    ]

    const dummyData = [
        {
            name : "STEM Society Website",
            head : "STEM Society",
            date : "August 14, 2023",
            status : "In progress"

        },
        {
            name : "STEM Society Website",
            head : "STEM Society",
            date : "August 14, 2023",
            status : "In progress"
        },
    ]

    interface ColumnTemplateProps {
        headerName : string;
        value : string;
    }
    const ColumnTemplate = (props : ColumnTemplateProps) => {
        return (
            <div
                className="flex flex-col gap-3"
            >
                <h2>
                    {props.headerName}
                </h2>
                <h2>
                    {props.value}
                </h2>

            </div>
        )
    }

    const tableData = [
        {
            headerName : "Project name",
            value : "STEM Society Website"
        },
        {
            headerName : "Project head",
            value : "STEM Society"
        },
        {
            headerName : "Project data",
            value : "August 14, 2023"
        },
    ]

    return (
        <div
            className="px-5 py-2 text-sm shadow-lg bg-slate-200"
        >
            <h1
                className="font-semibold tracking-wide text-base"
            >
                {status}
            </h1>

            <div
                className="flex justify-between"
            >

                {tableData.map((data) => (
                    <ColumnTemplate
                        key={data.headerName}
                        headerName={data.headerName}
                        value={data.value}
                    />
                ))}

                <div
                    className="flex flex-col gap-3"
                >
                    <h2>
                        Update status
                    </h2>
                    <select name="" id="">
                        <option value="Not started">Not started</option>
                        <option value="Planning">Planning</option>
                        <option value="In progress">In progress</option>
                        <option value="Complete">Complete</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>


            </div>
        </div>
    )
}

const Tasks = () => {
    return (
        <div
            className="flex flex-col h-full w-[82%]"
        >

            <ViewHeader title="Tasks" />

            <UnderDevelopment 
                headerText="Organize your tasks in teams."
            />

        </div>
    )
}

import { deleteTeam } from "@/actions/deleteTeam";
import Compose from "./Compose";
import { getTeam } from "@/actions/getTeam";
import Loading from "./Loading";
import { getCurrentUser } from "@/actions/getSessionUser";
import { useTeamName } from "@/hooks/useTeamName";

interface SettingsProps {
    teamData : any;
    isTeamOwned : boolean;
    dataLoaded : boolean;
}

const Settings : React.FC<SettingsProps> = ({
    teamData,
    isTeamOwned,
    dataLoaded
}) => {
    const pathname = usePathname();
    const router = useRouter();

    const handleDeleteTeamClick = async (e : React.SyntheticEvent) => {
        try {
            const deletedTeam = await deleteTeam(pathname);

            if (deletedTeam) {
                router.push(`/teams`)
            }
        } catch (err) {
            console.error("Error on deleting the team from the clinet side", err)
        }
    }

    if (dataLoaded) {
        return (
            <div
                className="flex flex-col h-full w-[82%] text-sm "
            >
    
                <ViewHeader title="Settings" />
    
                <div
                    className="flex flex-col p-5 gap-3 h-full"
                >
                    <div
                        className="flex gap-3"
                    >
                        <Image
                            src={ayano}
                            alt="ayano"
                            className="w-32"
                            onClick={() => console.log(teamData)}
                        />
                        <form
                            className="flex gap-3 flex-col"
                        >
                            <div
                                className="flex gap-5 w-full "
                            >
                                <SettingsInputLabel
                                    label="Team name"
                                    placeholder={teamData.name}
                                />
                                <SettingsInputLabel
                                    label="Team owner"
                                    placeholder={teamData.owner}
                                />
                                <SettingsInputLabel
                                    label="Team code"
                                    placeholder={teamData.code}
                                    isCode={true}
                                />
                            </div>
                                <SettingsInputLabel
                                    label="Team description"
                                    placeholder="NU Lipa Senior High School teams to gather everyone"
                                />
                        </form>
                    </div>
    
                    <h2
                        className="text-base"
                    >
                        Members
                    </h2>
    
                    <div
                        className="flex gap-5 flex-col h-[65%] overflow-y-auto"
                    >
                        {teamData.members.map((member : AuthorType) => (
                            <MemberBox
                                name={member.name}
                                section={member.email}
                                key={member.id}
                            />
                        ))}
                    </div>
    

    
                    {isTeamOwned && (
                        <>
                            <h2
                                className="text-red-600 font-semibold"
                            >
                                Danger zone
                            </h2>

                            <button
                                className=" w-[10rem] bg-red-600 rounded-md px-10 py-2 font-semibold text-white text-xs tracking-wide
                                hover:bg-red-400"
                                onClick={handleDeleteTeamClick}
                                >
                                Delete team
                            </button>
                        </>

                    )}
                </div>
    
            </div>
        )
    } 

    return (
        <div
            className="flex flex-col h-full w-[82%] text-sm "
        >
            <Loading
                className="pb-"
            />
        </div>
    )

}
interface SettingsInputLabelProps {
    label : string;
    placeholder : string;
    className? : string;
    isCode? : boolean;
}
const SettingsInputLabel : React.FC<SettingsInputLabelProps> = ({
    label,
    placeholder,
    className,
    isCode
}) => {
    return (
        <div
            className="w-full flex gap-1 flex-col"
        >
            <p
                className="font-semibold"
            >
                {label}
            </p>
            {isCode ? (
                <p
                    className="rounded-md w-[25rem] px-2 py-1 tracking-wide text-neutral-600 text-sm shadow-md"
                >
                    {placeholder}
                </p>
            ) : (
                <input 
                    type="text" 
                    placeholder={placeholder} 
                    className="rounded-md w-[25rem] px-2 py-1 tracking-wide text-neutral-600 text-sm shadow-md"
                    disabled
                />
            )}
        </div>
    )
}

interface MemberBoxProps {
    name : string;
    section : string;
}
const MemberBox : React.FC<MemberBoxProps> = ({
    name,
    section
}) => {
    return (
        <div
            className="flex items-center bg-slate-100 shadow-md px-2 py-1 pr-4 justify-between hover:bg-slate-200"
        >
            <div
                className="flex gap-3 items-center"
            >
                <Image
                    src={ayano}
                    alt="ayano"
                    className="w-9 rounded-full"
                />
                <div>
                    <h2
                        className="font-semibold tracking-wide"
                    >
                        {name}
                    </h2>
                    <h2>
                        {section}
                    </h2>
                </div>
            </div>
            <BsThreeDots
                size={20}
            />
        </div>
    )
}

export default SingleTeam;