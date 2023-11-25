'use client'

import { twMerge } from "tw-merge";
import { useRouter } from "next/navigation";
import { useLoaderFlag } from "@/hooks/useLoaderFlag";
 
interface SidebarNavProps {
    icon : any;
    text : string;
    size? : number;
    active? : boolean;
    href : string;
};

const SidebarNav : React.FC<SidebarNavProps> = ({
    icon : Icon,
    text,
    size,
    active,
    href
}) => {
    const { updateLoaderFlag } = useLoaderFlag();

    const router = useRouter();
    const handleNavClick = (path : string) => {
        if (!active) {
            updateLoaderFlag(true)
            console.log("clicked")
            router.push(path)
        };

        return false;
    }

    return (
        <div
            className={twMerge(`flex flex-col gap-1 items-center py-2 px-5 hover:cursor-pointer
            hover:bg-neutral-200${active ? ' border-l-4 border-solid border-blue-500' : ''}`)}
            onClick={() => handleNavClick(href)}
        >
            <Icon 
                size={size || 27}
            />
            <h3
                className="text-xs"
            >
                {text}
            </h3>
        </div>
    )
};

export default SidebarNav;