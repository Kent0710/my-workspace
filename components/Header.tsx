import Image from "next/image";
import ayano from "@/public/images/ayano.jpg"

import { LuNetwork } from "react-icons/lu";

const Header = () => {
    return (
        <header
            className="bg-violet-600 flex justify-between px-10 items-center py-2 w-full text-white shadow-md"
        >
            <div
                className="flex gap-3 items-center"
            >
                <LuNetwork 
                    size={22}
                />
                <h1
                    className="text-base font-semibold tracking-wide"
                >
                    Bullpups Workspace
                </h1>
            </div>

            <div
                className="flex gap-3 items-center"
            >
                <Image
                    src={ayano}
                    alt="ayano"
                    className="w-8 rounded-full"
                />
                <h2
                    className="text-sm hover:cursor-pointer underline"
                >
                    Namikazii Nakiri
                </h2>
            </div>

        </header>
    )
};

export default Header;