'use client'

import ayano from "@/public/images/ayano.jpg"
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useLoaderFlag } from "@/hooks/useLoaderFlag";

interface TeamsBoxProps {
    teamName : string;
    teamId : string;
}
const TeamsBox : React.FC<TeamsBoxProps> = ({
    teamName,
    teamId
}) => {
    const router = useRouter();

    const { updateLoaderFlag } = useLoaderFlag();
    const handleNavClick = (path : string) => {
        updateLoaderFlag(true)
        router.push(path)

        return false;
    }

    return (
        <div
            className=" bg-slate-100 w-[15rem] shadow-md h-[15rem] p-5 rounded-md flex flex-col gap-3 justify-center items-center
                hover:bg-slate-200 hover:cursor-pointer
            "
            onClick={() => handleNavClick(`teams/${teamId}`)}
        >
            <Image 
                src={ayano}
                alt="ayano"
                className="w-20"
            />

            <h1
                className="text-center"
            >
                {teamName}
            </h1>
        </div>
    )
};

export default TeamsBox;