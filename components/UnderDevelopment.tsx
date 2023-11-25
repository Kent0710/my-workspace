import { FaLaptopCode } from "react-icons/fa";

interface UnderDevelopmentProps {
    headerText : string;
}
const UnderDevelopment : React.FC<UnderDevelopmentProps> = ({
    headerText
}) => {
    return (
        <div
        className="w-full h-full flex flex-col gap-3 justify-center items-center pb-[10rem] text-sm"
    >
        <FaLaptopCode 
            size={70}
            color="blue"
        />

        <h1
            className="text-base font-semibold text-blue-700"
        >
            {headerText}
        </h1>
        <h2>
            This feature is still under development, stay tuned for more updates.
        </h2>
    </div>
    )
};

export default UnderDevelopment;